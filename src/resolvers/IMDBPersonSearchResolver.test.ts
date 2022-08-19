import { IMDBPersonSearchResolver } from "./IMDBPersonSearchResolver";

describe("imdb title search resolver", () => {
  it("return correct list for searching titles", async () => {
    const resolver = new IMDBPersonSearchResolver("emilia clarke", {
      exactMatch: false,
    });
    const result = await resolver.getResult();
    const first = result[0];
    expect(first.source.sourceId).toBe("nm3592338");
    expect(first.url).toBe("https://www.imdb.com/name/nm3592338/");
    expect(!!first.thumbnailImageUrl).toBe(true);
    expect(first.name.toLocaleLowerCase()).toBe("emilia clarke");
  }, 200000);
});
