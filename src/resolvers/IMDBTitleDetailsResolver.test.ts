import { IPersonDetails } from "../interfaces";
import { Genre, ImageType, Language, Source, TitleMainType } from "../enums";
import { IMDBTitleDetailsResolver } from "./IMDBTitleDetailsResolver";

export interface ITitleTestData {
  url: string;
  name: string;
  worldWideName: string;
  sourceId: string;
  titleYear: number;
  sourcesMinLength: number;
  otherNamesMinLength: number;
  genres: Genre[];
  directors: {
    length: number;
    firstOneName: string;
    firstOneId: string;
  };
  writers: {
    length: number;
    firstOneName: string;
    firstOneExtraInfo: string;
    firstONeSourceId: string;
  };
  mainType: TitleMainType;
  plotContains: string;
  casts: {
    minLength: number;
    tests: {
      index?: number | null;
      finderF?: (item: IPersonDetails) => boolean;
      name: string;
      sourceId?: string | null;
      rolesLength: number;
      firstRoleName: string;
    }[];
  };
  mainRate: {
    rate: number;
    minVotesCount: number;
    assortedByRateLength: number;
  };
  producersMinLength: number;
  allRatesMinLength: number;
  dates: {
    isEnded: boolean;
    startYear: number;
    startCountry: string;
    endYear: number;
  };
  allReleaseDatesMinLength: number;
  ageCategory: string;
  languages: string[];
  firstCountriesOfOrigin: string;
  posterImageUrl: string;
  posterImageThumbnailsMinLength: number;
  allImagesMinLength: number;
  boxofficeBudget: number;
  openingAmount: number;
  openingDateYear: number;
  worldWideSellMin: number;
  mainCountriesSellMin: number;
  firstProductionCompanyName: string;
  productionCompaniesLength: number;
  taglinesMinLength: number;
  firstTagline: string;
  runtimeTitle: string;
  runtimeHours: number;
  runtimeMinutes: number;
  keywordsMinLength: number;
  onOfKeywords: string;
  postersMinLength: number;
  stillFrameMinLength: number;
  awardsMinLength: number;
  oscars: number;
  emmys: number;
  minNominations: number;
}

const titlesToTest: ITitleTestData[] = [
  {
    url: "https://www.imdb.com/title/tt0499549/",
    name: "avatar",
    worldWideName: "avatar",
    sourceId: "tt0499549",
    titleYear: 2009,
    sourcesMinLength: 1,
    otherNamesMinLength: 10,
    genres: [Genre.Action, Genre.Adventure, Genre.Fantasy, Genre.SciFi],
    directors: {
      length: 1,
      firstOneName: "james cameron",
      firstOneId: "nm0000116",
    },
    writers: {
      length: 1,
      firstOneName: "james cameron",
      firstOneExtraInfo: "(written by)",
      firstONeSourceId: "nm0000116",
    },
    mainType: TitleMainType.Movie,
    plotContains: "a paraplegic marine dispatched to the moon",
    casts: {
      minLength: 20,
      tests: [
        {
          index: 0,
          name: "sam worthington",
          sourceId: "nm0941777",
          rolesLength: 1,
          firstRoleName: "jake sully",
        },
        {
          index: null,
          finderF: (item: IPersonDetails) => item.name === "kevin dorman",
          name: "kevin dorman",
          sourceId: null,
          rolesLength: 2,
          firstRoleName: "tractor operator",
        },
      ],
    },
    mainRate: {
      rate: 7.8,
      minVotesCount: 1100000,
      assortedByRateLength: 10,
    },
    producersMinLength: 8,
    allRatesMinLength: 1,
    dates: {
      isEnded: false,
      startYear: 2009,
      startCountry: "uk",
      endYear: 0,
    },
    allReleaseDatesMinLength: 1,
    ageCategory: "pg-13",
    languages: ["english", "spanish"],
    firstCountriesOfOrigin: "united states",
    posterImageUrl:
      "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@.jpg",
    posterImageThumbnailsMinLength: 3,
    allImagesMinLength: 48,
    boxofficeBudget: 237000000,
    openingAmount: 77025481,
    openingDateYear: 2009,
    worldWideSellMin: 2847379794,
    mainCountriesSellMin: 760507625,
    firstProductionCompanyName: "twentieth century fox",
    productionCompaniesLength: 3,
    taglinesMinLength: 1,
    firstTagline: "enter the world",
    runtimeTitle: "2 hours 42 minutes",
    runtimeHours: 2,
    runtimeMinutes: 42,
    keywordsMinLength: 5,
    onOfKeywords: "spiritualism",
    postersMinLength: 17,
    stillFrameMinLength: 48,
    awardsMinLength: 200,
    oscars: 3,
    emmys: 0,
    minNominations: 200,
  },
  {
    url: "https://www.imdb.com/title/tt0944947/",
    name: "game of thrones",
    worldWideName: "got",
    sourceId: "tt0944947",
    titleYear: 2011,
    sourcesMinLength: 1,
    otherNamesMinLength: 30,
    genres: [Genre.Action, Genre.Adventure, Genre.Fantasy, Genre.Drama],
    directors: {
      length: 19,
      firstOneName: "david nutter",
      firstOneId: "nm0638354",
    },
    writers: {
      length: 23,
      firstOneName: "david benioff",
      firstOneExtraInfo: "(created by) (73 episodes, 2011-2019)",
      firstONeSourceId: "nm1125275",
    },
    mainType: TitleMainType.Series,
    plotContains:
      "nine noble families fight for control over the lands of westeros,",
    casts: {
      minLength: 50,
      tests: [
        {
          index: 0,
          name: "peter dinklage",
          sourceId: "nm0227759",
          rolesLength: 1,
          firstRoleName: "tyrion lannister",
        },
        {
          index: 5,
          name: "maisie williams",
          sourceId: "nm3586035",
          rolesLength: 1,
          firstRoleName: "arya stark",
        },
      ],
    },
    mainRate: {
      rate: 9.2,
      minVotesCount: 1967333,
      assortedByRateLength: 10,
    },
    producersMinLength: 8,
    allRatesMinLength: 1,
    dates: {
      isEnded: true,
      startYear: 2011,
      startCountry: "south korea",
      endYear: 0,
    },
    allReleaseDatesMinLength: 20,
    ageCategory: "tv-ma",
    languages: ["english"],
    firstCountriesOfOrigin: "united states",
    // till here
    posterImageUrl:
      "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@.jpg",
    posterImageThumbnailsMinLength: 3,
    allImagesMinLength: 48,
    boxofficeBudget: 0,
    openingAmount: 0,
    openingDateYear: 0,
    worldWideSellMin: 0,
    mainCountriesSellMin: 0,
    firstProductionCompanyName: "home box office (hbo)",
    productionCompaniesLength: 5,
    taglinesMinLength: 5,
    firstTagline: "winter is coming.",
    runtimeTitle: "57 minutes",
    runtimeHours: 0,
    runtimeMinutes: 57,
    keywordsMinLength: 5,
    onOfKeywords: "based on novel",
    postersMinLength: 48,
    stillFrameMinLength: 48,
    awardsMinLength: 200,
    oscars: 0,
    emmys: 59,
    minNominations: 632,
  },
];

describe("imdb title details resolver", () => {
  titlesToTest.forEach((testData) => {
    test(
      `check ${testData.name} ${testData.titleYear} result`,
      async () => {
        const resolver = new IMDBTitleDetailsResolver(testData.url);
        const result = await resolver.getDetails();
        expect(result).not.toBe(undefined);
        if (!result) {
          return;
        }
        expect(result.detailsLang).toBe(Language.English);
        expect(result.mainSource.sourceId).toBe(testData.sourceId);
        expect(result.mainSource.sourceType).toBe(Source.IMDB);
        expect(result.mainSource.sourceUrl).toBe(testData.url);
        expect(result.allSources.length).toBeGreaterThanOrEqual(
          testData.sourcesMinLength
        );
        expect(result.name).toBe(testData.name);
        expect(result.worldWideName).toBe(testData.worldWideName);
        expect(result.otherNames.length).toBeGreaterThan(
          testData.otherNamesMinLength
        );
        expect(result.titleYear).toBe(testData.titleYear);
        expect(result.genres).toHaveLength(testData.genres.length);
        testData.genres.forEach((item) =>
          expect(result.genres).toContain(item)
        );
        expect(result.directors).toHaveLength(testData.directors.length);
        const director = result.directors[0];
        expect(director.name).toBe(testData.directors.firstOneName);
        expect(director.source?.sourceId).toBe(testData.directors.firstOneId);

        expect(result.writers).toHaveLength(testData.writers.length);
        const writer = result.writers[0];
        expect(writer.name).toBe(testData.writers.firstOneName);
        if (testData.writers.firstOneExtraInfo) {
          expect(writer.extraInfo).toBe(testData.writers.firstOneExtraInfo);
        }
        expect(writer.source?.sourceId).toBe(testData.writers.firstONeSourceId);
        expect(result.mainType).toBe(testData.mainType);
        expect(result.plot).toContain(testData.plotContains);
        expect(result.casts.length).toBeGreaterThan(testData.casts.minLength);
        for (const castData of testData.casts.tests) {
          const cast = castData.finderF
            ? result.casts.find(castData.finderF)
            : result.casts[castData.index || 0];
          expect(cast).not.toBe(undefined);
          if (!cast) {
            return;
          }
          expect(cast.name).toBe(castData.name);
          if (castData.sourceId) {
            expect(cast.source?.sourceId).toBe(castData.sourceId);
          }
          expect(cast.roles.length).toBe(castData.rolesLength);
          expect(cast.roles[0].name).toBe(castData.firstRoleName);
        }

        const mainRate = result.mainRate;
        expect(mainRate.rate).toBe(testData.mainRate.rate);
        expect(mainRate.votesCount).toBeGreaterThan(
          testData.mainRate.minVotesCount
        );
        expect(mainRate.rateSource).toBe(Source.IMDB);
        expect(mainRate.assortedByRate).toHaveLength(
          testData.mainRate.assortedByRateLength
        );
        expect(mainRate.assortedByGender?.allGenders?.allAges?.rate).toBe(
          testData.mainRate.rate
        );
        expect(result.producers.length).toBeGreaterThanOrEqual(
          testData.producersMinLength
        );
        expect(result.allRates.length).toBeGreaterThanOrEqual(
          testData.allRatesMinLength
        );
        expect(result.dates.isEnded).toBe(testData.dates.isEnded);
        expect(result.dates.startYear).toBe(testData.dates.startYear);
        expect(result.dates.startDate.getFullYear()).toBe(
          testData.dates.startYear
        );
        if (testData.dates.endYear) {
          expect(result.dates.endYear).toBe(testData.dates.endYear);
        }
        expect(result.dates.startCountry).toBe(testData.dates.startCountry);
        expect(result.allReleaseDates.length).toBeGreaterThanOrEqual(
          testData.allReleaseDatesMinLength
        );

        expect(result.ageCategoryTitle).toBe(testData.ageCategory);
        Array.from(Array(testData.languages?.length)).forEach((v, i) => {
          expect(result.languages[i]).toBe(testData.languages[i]);
        });
        expect(result.countriesOfOrigin[0]).toBe(
          testData.firstCountriesOfOrigin
        );
        expect(result.posterImage.url).toBe(testData.posterImageUrl);
        expect(result.posterImage.thumbnails?.length).toBeGreaterThanOrEqual(
          testData.posterImageThumbnailsMinLength
        );
        expect(result.allImages.length).toBeGreaterThanOrEqual(
          testData.allImagesMinLength
        );

        if (testData.boxofficeBudget) {
          expect(result.boxOffice?.budget).toBe(testData.boxofficeBudget);
          expect(result.boxOffice?.opening.amount).toBe(testData.openingAmount);
          expect(result.boxOffice?.opening.date.getFullYear()).toBe(
            testData.openingDateYear
          );
          expect(result.boxOffice?.worldwide).toBeGreaterThanOrEqual(
            testData.worldWideSellMin
          );
          expect(result.boxOffice?.mainCountries.amount).toBeGreaterThanOrEqual(
            testData.mainCountriesSellMin
          );
        }

        expect(result.productionCompanies[0].name).toBe(
          testData.firstProductionCompanyName
        );
        expect(result.productionCompanies.length).toBe(
          testData.productionCompaniesLength
        );

        expect(result.taglines.length).toBeGreaterThanOrEqual(
          testData.taglinesMinLength
        );
        expect(result.taglines[0]).toBe(testData.firstTagline);
        expect(result.runtime.title).toBe(testData.runtimeTitle);
        expect(result.runtime.hours).toBe(testData.runtimeHours);
        expect(result.runtime.minutes).toBe(testData.runtimeMinutes);
        expect(result.keywords.length).toBeGreaterThanOrEqual(
          testData.keywordsMinLength
        );
        expect(result.keywords.includes(testData.onOfKeywords)).toBe(true);

        // posters & still frame images length
        expect(
          result.allImages.filter((i) => i.type === ImageType.Poster && !!i.url)
            .length
        ).toBeGreaterThanOrEqual(testData.postersMinLength);

        expect(
          result.allImages.filter(
            (i) => i.type === ImageType.StillFrame && !!i.url
          ).length
        ).toBeGreaterThanOrEqual(testData.stillFrameMinLength);

        expect(result.awards.length).toBeGreaterThan(testData.awardsMinLength);
        expect(result.awardsSummary.oscarWins).toBe(testData.oscars);
        expect(result.awardsSummary.emmyWins).toBe(testData.emmys);
        expect(result.awardsSummary.totalNominations).toBeGreaterThan(
          testData.minNominations
        );
      },
      200 * 1000
    );
  });
});
