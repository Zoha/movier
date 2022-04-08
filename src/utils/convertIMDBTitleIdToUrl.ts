import { convertIMDBPathToIMDBUrl } from "./convertIMDBPathToIMDBUrl";

export function convertIMDBTitleIdToUrl(titleId: string) {
  const path = `/title/${titleId}`;
  return convertIMDBPathToIMDBUrl(path);
}
