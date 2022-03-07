import {
  IFoundedTitleDetails,
  ITitle,
  ITitleDetailsResolver,
} from "./interfaces";
import { IMDB_BASE_URL } from "./constants";
import { Source } from "./enums";
import { IMDBTitleDetailsResolver } from "./IMDBTitleDetailsResolver";

export async function findTitleDetails(
  urlOrDetails: string | IFoundedTitleDetails,
  sourceType?: Source
): Promise<ITitle> {
  const url =
    typeof urlOrDetails === "object" ? urlOrDetails.url : urlOrDetails;
  // if source type is not specified guess it using the url
  if (sourceType == null) {
    sourceType = guessSourceType(url);
  }

  //  select the resolver
  let resolver: ITitleDetailsResolver;
  switch (sourceType) {
    case Source.IMDB:
    default:
      resolver = new IMDBTitleDetailsResolver(url);
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

function guessSourceType(url: string) {
  if (url.startsWith(IMDB_BASE_URL)) {
    return Source.IMDB;
  }
}
