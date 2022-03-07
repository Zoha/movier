import { IMDB_BASE_URL } from "../constants";

export function convertIMDBPathToIMDBUrl(path?: string): string {
  if (!path) {
    return "";
  }
  return IMDB_BASE_URL + path ?? "";
}
