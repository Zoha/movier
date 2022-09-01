import { IMDBPathType } from "./../enums";
import { convertIMDBPathToIMDBUrl } from "./convertIMDBPathToIMDBUrl";

export function convertIMDBTitleIdToUrl(
  titleId: string,
  type: IMDBPathType = IMDBPathType.Title
) {
  const path = `/${type}/${titleId}`;
  return convertIMDBPathToIMDBUrl(path);
}
