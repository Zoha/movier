import {
  IFoundedTitleDetails,
  ITitle,
  ITitleDetailsResolver,
} from "./interfaces";
import { Source } from "./enums";
import { IMDBTitleDetailsResolver } from "./resolvers/IMDBTitleDetailsResolver";
import { guessSourceTypeByUrl } from "./utils/guessSourceTypeByUrl";
import { searchTitleByName, SearchTitleByNameOptions } from "./titleSearcher";
import { convertIMDBTitleIdToUrl } from "./utils/convertIMDBTitleIdToUrl";

export async function getTitleDetailsByUrl(titleUrl: string): Promise<ITitle> {
  const sourceType = guessSourceTypeByUrl(titleUrl);
  //  select the resolver
  let resolver: ITitleDetailsResolver;
  switch (sourceType) {
    case Source.IMDB:
    default:
      resolver = new IMDBTitleDetailsResolver(titleUrl);
  }

  // get details from resolver
  let result;
  try {
    result = await resolver.getDetails();
  } catch (e) {
    throw new Error(
      "failed to get the result from IMDB : " + (e as Error).message
    );
  }
  if (!result) {
    throw new Error(
      "there was a problem in getting title details, title resolver returned empty data"
    );
  }
  return result;
}

export async function getTitleDetailsByFoundedTitleDetails(
  foundedTitleDetails: IFoundedTitleDetails
): Promise<ITitle> {
  return getTitleDetailsByUrl(foundedTitleDetails.url);
}

export async function getTitleDetailsByName(
  titleName: string,
  { exactMatch = false, specificType }: SearchTitleByNameOptions = {}
): Promise<ITitle> {
  const allResults = await searchTitleByName(titleName, {
    exactMatch,
    specificType,
  });
  if (!allResults.length) {
    throw new Error(
      "there wasn't any matched title with the given name : `titleName`"
    );
  }
  return getTitleDetailsByFoundedTitleDetails(allResults[0]);
}

export async function getTitleDetailsByIMDBId(
  titleId: string
): Promise<ITitle> {
  return getTitleDetailsByUrl(convertIMDBTitleIdToUrl(titleId));
}
