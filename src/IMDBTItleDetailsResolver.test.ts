import { Genre, Language, Source, TitleMainType } from "./enums";
import { IMDBTitleDetailsResolver } from "./IMDBTitleDetailsResolver";

const avatar2009IMDBUrl = "https://www.imdb.com/title/tt0499549/";

describe("imdb resolver", () => {
  test(
    "check avatar 2009 result",
    async () => {
      const resolver = new IMDBTitleDetailsResolver(avatar2009IMDBUrl);
      const avatar2009Result = await resolver.getDetails();
      expect(avatar2009IMDBUrl).not.toBe(undefined);
      if (!avatar2009Result) {
        return;
      }
      expect(avatar2009Result.detailsLang).toBe(Language.English);
      expect(avatar2009Result.mainSource.sourceId).toBe("tt0499549");
      expect(avatar2009Result.mainSource.sourceType).toBe(Source.IMDB);
      expect(avatar2009Result.mainSource.sourceUrl).toBe(avatar2009IMDBUrl);
      expect(avatar2009Result.allSources.length).toBeGreaterThanOrEqual(1);
      expect(avatar2009Result.name).toBe("avatar");
      expect(avatar2009Result.worldWideName).toBe("avatar");
      expect(avatar2009Result.otherNames.length).toBeGreaterThan(10);
      expect(avatar2009Result.titleYear).toBe(2009);
      expect(avatar2009Result.genres).toHaveLength(4);
      [Genre.Action, Genre.Adventure, Genre.Fantasy, Genre.SciFi].forEach(
        (item) => expect(avatar2009Result.genres).toContain(item)
      );
      expect(avatar2009Result.directors).toHaveLength(1);
      const director = avatar2009Result.directors[0];
      expect(director.name).toBe("james cameron");
      expect(director.source?.sourceId).toBe("nm0000116");

      expect(avatar2009Result.writers).toHaveLength(1);
      const writer = avatar2009Result.writers[0];
      expect(writer.name).toBe("james cameron");
      expect(writer.extraInfo).toBe("(written by)");
      expect(writer.source?.sourceId).toBe("nm0000116");
      expect(avatar2009Result.mainType).toBe(TitleMainType.Movie);
      expect(avatar2009Result.plot).toContain(
        "a paraplegic marine dispatched to the moon"
      );
      expect(avatar2009Result.casts.length).toBeGreaterThan(20);
      const firstCast = avatar2009Result.casts[0];
      expect(firstCast.name).toBe("sam worthington");
      expect(firstCast.source?.sourceId).toBe("nm0941777");
      expect(firstCast.roles.length).toBe(1);
      expect(firstCast.roles[0].name).toBe("jake sully");
      const kevinDorman = avatar2009Result.casts.find(
        (c) => c.name === "kevin dorman"
      );
      expect(kevinDorman?.roles.length).toBe(2);
      expect(kevinDorman?.roles[0].name).toBe("tractor operator");

      const mainRate = avatar2009Result.mainRate;
      expect(mainRate.rate).toBe(7.9);
      expect(mainRate.votesCount).toBeGreaterThan(1100000);
      expect(mainRate.rateSource).toBe(Source.IMDB);
      expect(mainRate.assortedByRate).toHaveLength(10);
      expect(mainRate.assortedByGender?.allGenders?.allAges?.rate).toBe(7.9);
      expect(avatar2009Result.producers).toHaveLength(8);
      expect(avatar2009Result.allRates.length).toBeGreaterThanOrEqual(1);
      expect(avatar2009Result.dates.isEnded).toBe(false);
      expect(avatar2009Result.dates.startYear).toBe(2009);
      expect(avatar2009Result.dates.startDate.getFullYear()).toBe(2009);
      expect(avatar2009Result.dates.startCountry).toBe("uk");
      expect(avatar2009Result.allReleaseDates.length).toBeGreaterThanOrEqual(1);
      expect(avatar2009Result.ageCategoryTitle).toBe("pg-13");
      expect(avatar2009Result.languages[0]).toBe("english");
      expect(avatar2009Result.languages[1]).toBe("spanish");
      expect(avatar2009Result.countriesOfOrigin[0]).toBe("united states");
      expect(avatar2009Result.posterImage.url).toBe(
        "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@.jpg"
      );
      expect(
        avatar2009Result.posterImage.thumbnails?.length
      ).toBeGreaterThanOrEqual(3);
      expect(avatar2009Result.allImages.length).toBeGreaterThanOrEqual(1);

      expect(avatar2009Result.boxOffice?.budget).toBe(237000000);
      expect(avatar2009Result.boxOffice?.opening.amount).toBe(77025481);
      expect(avatar2009Result.boxOffice?.opening.date.getFullYear()).toBe(2009);
      expect(avatar2009Result.boxOffice?.worldwide).toBeGreaterThanOrEqual(
        2847379794
      );
      expect(avatar2009Result.boxOffice?.mainCountries.amount).toBe(760507625);

      expect(avatar2009Result.productionCompanies[0].name).toBe(
        "twentieth century fox"
      );
      expect(avatar2009Result.productionCompanies.length).toBe(3);
    },
    200 * 1000
  );
});
