import { Source, TitleMainType } from "./enums";
import { IFoundedTitleDetails, ITitleSearchResolver } from "./interfaces";
import { IMDBTitleSearchResolver } from "./resolvers/IMDBTitleSearchResolver";

export type SearchTitleByNameOptions = {
  exactMatch?: boolean;
  specificType?: TitleMainType;
  sourceType?: Source;
};

export async function searchTitleByName(
  queryName: string,
  {
    exactMatch = false,
    specificType,
    sourceType = Source.IMDB,
  }: SearchTitleByNameOptions = {}
): Promise<IFoundedTitleDetails[]> {
  //  select the resolver
  let resolver: ITitleSearchResolver;
  switch (sourceType) {
    case Source.IMDB:
    default:
      resolver = new IMDBTitleSearchResolver(queryName, {
        exactMatch,
        specificType,
      });
  }

  // get details from resolver
  return await resolver.getResult();
}
