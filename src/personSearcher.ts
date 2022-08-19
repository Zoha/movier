import { IMDBPersonSearchResolver } from "./resolvers/IMDBPersonSearchResolver";
import { Source } from "./enums";
import { IFoundedPersonDetails, IPersonSearchResolver } from "./interfaces";

export type SearchPersonByNameOptions = {
  exactMatch?: boolean;
  sourceType?: Source;
};

export async function searchPersonByName(
  queryName: string,
  {
    exactMatch = false,
    sourceType = Source.IMDB,
  }: SearchPersonByNameOptions = {}
): Promise<IFoundedPersonDetails[]> {
  //  select the resolver
  let resolver: IPersonSearchResolver;
  switch (sourceType) {
    case Source.IMDB:
    default:
      resolver = new IMDBPersonSearchResolver(queryName, {
        exactMatch,
      });
  }

  // get details from resolver
  return await resolver.getResult();
}
