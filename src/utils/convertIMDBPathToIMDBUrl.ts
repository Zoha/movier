import { IMDB_BASE_URL } from "../constants";

export function convertIMDBPathToIMDBUrl(path?: string): string {
  if (!path) {
    return "";
  }
  try {
    const url = new URL(IMDB_BASE_URL + path);
    url.searchParams.delete("ref_");
    url.searchParams.delete("ref");
    return url.href;
  } catch (e) {
    // handling invalid urls
    return "";
  }
}
