import { Source } from "./enums";
import {
  IFoundedPersonDetails,
  IPerson,
  IPersonDetailsResolver,
} from "./interfaces";
import {
  searchPersonByName,
  SearchPersonByNameOptions,
} from "./personSearcher";
import { IMDBPersonDetailsResolver } from "./resolvers/IMDBPersonDetailsResolver";
import { convertIMDBTitleIdToUrl } from "./utils/convertIMDBTitleIdToUrl";
import { guessSourceTypeByUrl } from "./utils/guessSourceTypeByUrl";

export async function getPersonDetailsByUrl(
  titleUrl: string
): Promise<IPerson> {
  const sourceType = guessSourceTypeByUrl(titleUrl);
  //  select the resolver
  let resolver: IPersonDetailsResolver;
  switch (sourceType) {
    case Source.IMDB:
    default:
      resolver = new IMDBPersonDetailsResolver(titleUrl);
  }

  // get details from resolver
  const result = await resolver.getDetails();
  if (!result) {
    throw new Error(
      "there was a problem in getting title details, title resolver returned empty data"
    );
  }
  return result;
}

export async function getPersonDetailsByFoundedPersonDetails(
  foundedTitleDetails: IFoundedPersonDetails
): Promise<IPerson> {
  return getPersonDetailsByUrl(foundedTitleDetails.url);
}

export async function getPersonDetailsByName(
  personName: string,
  { exactMatch = false }: SearchPersonByNameOptions = {}
): Promise<IPerson> {
  const allResults = await searchPersonByName(personName, {
    exactMatch,
  });
  if (!allResults.length) {
    throw new Error(
      "there wasn't any matched person with the given name : `personName`"
    );
  }
  return getPersonDetailsByFoundedPersonDetails(allResults[0]);
}

export async function getPersonDetailsByIMDBId(
  personId: string
): Promise<IPerson> {
  return getPersonDetailsByUrl(convertIMDBTitleIdToUrl(personId));
}