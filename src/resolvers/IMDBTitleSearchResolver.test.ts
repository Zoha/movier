import { IMDBTitleSearchResolver } from "./IMDBTitleSearchResolver";

describe("imdb title search resolver", () => {
  it("return correct list for searching titles", async () => {
    const resolver = new IMDBTitleSearchResolver("avatar 2009", {
      exactMatch: false,
    });
    const result = await resolver.getResult();
    const first = result[0];
    expect(first.source.sourceId).toBe("tt0499549");
    expect(!!first.aka).toBe(false);
    expect(first.titleYear).toBe(2009);
    expect(first.url).toBe("https://www.imdb.com/title/tt0499549/");
    expect(!!first.thumbnailImageUrl).toBe(true);
  });
});
