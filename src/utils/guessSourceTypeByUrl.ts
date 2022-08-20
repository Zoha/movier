import { IMDB_BASE_URL } from "../constants";
import { Source } from "../enums";

export function guessSourceTypeByUrl(url: string) {
  if (url.startsWith(IMDB_BASE_URL)) {
    return Source.IMDB;
  }
  return Source.Unknown;
}
