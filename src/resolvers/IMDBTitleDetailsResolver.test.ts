import { IPersonDetails, ITitleKey } from "../interfaces";
import { Genre, ImageType, Language, Source, TitleMainType } from "../enums";
import {
  IMDBTitleDetailsResolver,
  titleKeys,
} from "./IMDBTitleDetailsResolver";

export interface ITitleTestData {
  url: string;
  name: string;
  worldWideName?: string;
  sourceId: string;
  titleYear?: number;
  sourcesMinLength?: number;
  otherNamesMinLength?: number;
  genres?: Genre[];
  directors?: {
    length: number;
    firstOneName: string;
    firstOneId: string;
  };
  writers?: {
    length: number;
    firstOneName: string;
    firstOneExtraInfo: string;
    firstONeSourceId: string;
  };
  mainType?: TitleMainType;
  plotContains?: string;
  casts?: {
    minLength: number;
    tests: {
      index?: number | null;
      finderF?: (item: IPersonDetails) => boolean;
      name: string;
      sourceId?: string | null;
      rolesLength: number;
      firstRoleName: string;
      episodes?: number;
      startYear?: number;
      endYear?: number;
    }[];
  };
  mainRate?: {
    rate: number;
    minVotesCount: number;
    assortedByRateLength: number;
  };
  metaScore?: number;
  producersMinLength?: number;
  allRatesMinLength?: number;
  dates?: {
    isEnded: boolean;
    startYear: number;
    startCountry: string;
    endYear: number;
  };
  allReleaseDatesMinLength?: number;
  ageCategory?: string;
  languages?: string[];
  firstCountriesOfOrigin?: string;
  posterImageUrl?: string;
  posterImageThumbnailsMinLength?: number;
  allImagesMinLength?: number;
  boxofficeBudget?: number;
  openingAmount?: number;
  openingDateYear?: number;
  worldWideSellMin?: number;
  mainCountriesSellMin?: number;
  firstProductionCompanyName?: string;
  productionCompaniesLength?: number;
  taglinesMinLength?: number;
  firstTagline?: string;
  runtimeTitle?: string;
  runtimeHours?: number;
  runtimeMinutes?: number;
  keywordsMinLength?: number;
  onOfKeywords?: string;
  postersMinLength?: number;
  stillFrameMinLength?: number;
  awardsMinLength?: number;
  oscars?: number;
  emmys?: number;
  minNominations?: number;
  quotesLength?: number;
  spoilerQuotes?: number;
  goofsLength?: number;
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
          finderF: (item: IPersonDetails) =>
            item.name.toLowerCase() === "kevin dorman",
          name: "kevin dorman",
          sourceId: null,
          rolesLength: 2,
          firstRoleName: "tractor operator",
        },
      ],
    },
    mainRate: {
      rate: 7.9,
      minVotesCount: 1100000,
      assortedByRateLength: 10,
    },
    metaScore: 83,
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
      "https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0.jpg",
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
    quotesLength: 111,
    spoilerQuotes: 0,
    goofsLength: 60,
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
          episodes: 67,
          startYear: 2011,
          endYear: 2019,
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
    quotesLength: 36,
    spoilerQuotes: 1,
    goofsLength: 0,
  },
  {
    url: "https://www.imdb.com/title/tt14544192/",
    name: "bo burnham: inside",
    mainType: TitleMainType.TVSpecial,
    sourceId: "tt14544192",
  },
  {
    url: "https://www.imdb.com/title/tt0000041",
    sourceId: "tt0000041",
    name: "bataille de neige",
    genres: [Genre.Documentary, Genre.Comedy, Genre.Short],
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
        if (testData.sourcesMinLength !== undefined) {
          expect(result.allSources.length).toBeGreaterThanOrEqual(
            testData.sourcesMinLength
          );
        }
        expect(result.name.toLowerCase()).toBe(testData.name);

        if (testData.worldWideName !== undefined) {
          expect(result.worldWideName.toLowerCase()).toBe(
            testData.worldWideName
          );
        }
        if (testData.otherNamesMinLength !== undefined) {
          expect(result.otherNames.length).toBeGreaterThan(
            testData.otherNamesMinLength
          );
        }
        if (testData.titleYear !== undefined) {
          expect(result.titleYear).toBe(testData.titleYear);
        }
        if (testData.genres !== undefined) {
          expect(result.genres).toHaveLength(testData.genres.length);
          testData.genres.forEach((item) =>
            expect(result.genres).toContain(item)
          );
        }
        if (testData.directors !== undefined) {
          expect(result.directors).toHaveLength(testData.directors.length);
          const director = result.directors[0];
          expect(director.name.toLowerCase()).toBe(
            testData.directors.firstOneName
          );
          expect(director.source?.sourceId).toBe(testData.directors.firstOneId);
        }

        if (testData.writers !== undefined) {
          expect(result.writers).toHaveLength(testData.writers.length);
          const writer = result.writers[0];
          expect(writer.name.toLowerCase()).toBe(testData.writers.firstOneName);
          if (testData.writers.firstOneExtraInfo) {
            expect(writer.extraInfo).toBe(testData.writers.firstOneExtraInfo);
          }
          expect(writer.source?.sourceId).toBe(
            testData.writers.firstONeSourceId
          );
        }
        if (testData.mainType !== undefined) {
          expect(result.mainType).toBe(testData.mainType);
        }
        if (testData.plotContains !== undefined) {
          expect(result.plot.toLowerCase()).toContain(testData.plotContains);
        }
        if (testData.casts !== undefined) {
          expect(result.casts.length).toBeGreaterThan(testData.casts.minLength);
          for (const castData of testData.casts.tests) {
            const cast = castData.finderF
              ? result.casts.find(castData.finderF)
              : result.casts[castData.index || 0];
            expect(cast).not.toBe(undefined);
            if (!cast) {
              return;
            }
            expect(cast.name.toLowerCase()).toBe(castData.name);
            if (castData.sourceId) {
              expect(cast.source?.sourceId).toBe(castData.sourceId);
            }
            expect(cast.roles.length).toBe(castData.rolesLength);
            expect(cast.roles[0].name.toLowerCase()).toBe(
              castData.firstRoleName
            );
            if (castData.episodes) {
              expect(cast.episodeCredits?.totalEpisodes).toBe(
                castData.episodes
              );
              expect(cast.episodeCredits?.startYear).toBe(castData.startYear);
              expect(cast.episodeCredits?.endYear).toBe(castData.endYear);
            }
          }
        }

        if (testData.mainRate !== undefined) {
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
        }

        if (testData.metaScore !== undefined) {
          expect(
            result.allRates.find((i) => i.rateSource === Source.MetaCritics)
              ?.rate
          ).toBe(testData.metaScore);
        }
        if (testData.producersMinLength !== undefined) {
          expect(result.producers.length).toBeGreaterThanOrEqual(
            testData.producersMinLength
          );
        }
        if (testData.allRatesMinLength !== undefined) {
          expect(result.allRates.length).toBeGreaterThanOrEqual(
            testData.allRatesMinLength
          );
        }
        if (testData.dates !== undefined) {
          expect(result.dates.isEnded).toBe(testData.dates.isEnded);
          expect(result.dates.startYear).toBe(testData.dates.startYear);
          expect(result.dates.startDate.getFullYear()).toBe(
            testData.dates.startYear
          );
          if (testData.dates.endYear) {
            expect(result.dates.endYear).toBe(testData.dates.endYear);
          }
          expect(result.dates.startCountry.toLocaleLowerCase()).toBe(
            testData.dates.startCountry
          );
        }
        if (testData.allReleaseDatesMinLength !== undefined) {
          expect(result.allReleaseDates.length).toBeGreaterThanOrEqual(
            testData.allReleaseDatesMinLength
          );
        }

        if (testData.ageCategory !== undefined) {
          expect(result.ageCategoryTitle.toLowerCase()).toBe(
            testData.ageCategory
          );
        }
        if (testData.languages !== undefined) {
          Array.from(Array(testData.languages?.length)).forEach((v, i) => {
            expect(result.languages[i].toLocaleLowerCase()).toBe(
              testData.languages![i]
            );
          });
        }
        if (testData.firstCountriesOfOrigin !== undefined) {
          expect(result.countriesOfOrigin[0].toLocaleLowerCase()).toBe(
            testData.firstCountriesOfOrigin
          );
        }
        if (testData.posterImageUrl !== undefined) {
          expect(result.posterImage.url).toBe(testData.posterImageUrl);
        }
        if (testData.posterImageThumbnailsMinLength !== undefined) {
          expect(result.posterImage.thumbnails?.length).toBeGreaterThanOrEqual(
            testData.posterImageThumbnailsMinLength
          );
        }
        if (testData.allImagesMinLength !== undefined) {
          expect(result.allImages.length).toBeGreaterThanOrEqual(
            testData.allImagesMinLength
          );
        }

        if (testData.boxofficeBudget) {
          expect(result.boxOffice?.budget).toBe(testData.boxofficeBudget);
          expect(result.boxOffice?.opening.amount).toBe(testData.openingAmount);
          expect(result.boxOffice?.opening.date.getFullYear()).toBe(
            testData.openingDateYear
          );
          if (testData.worldWideSellMin !== undefined) {
            expect(result.boxOffice?.worldwide).toBeGreaterThanOrEqual(
              testData.worldWideSellMin
            );
          }
          if (testData.mainCountriesSellMin !== undefined) {
            expect(
              result.boxOffice?.mainCountries.amount
            ).toBeGreaterThanOrEqual(testData.mainCountriesSellMin);
          }
        }

        if (testData.firstProductionCompanyName !== undefined) {
          expect(result.productionCompanies[0].name.toLowerCase()).toBe(
            testData.firstProductionCompanyName
          );
        }
        if (testData.productionCompaniesLength !== undefined) {
          expect(result.productionCompanies.length).toBe(
            testData.productionCompaniesLength
          );
        }

        if (testData.taglinesMinLength !== undefined) {
          expect(result.taglines.length).toBeGreaterThanOrEqual(
            testData.taglinesMinLength
          );
        }
        if (testData.firstTagline !== undefined) {
          expect(result.taglines[0].toLocaleLowerCase()).toBe(
            testData.firstTagline
          );
        }
        if (testData.runtimeTitle !== undefined) {
          expect(result.runtime.title.toLowerCase()).toBe(
            testData.runtimeTitle
          );
        }
        if (testData.runtimeHours !== undefined) {
          expect(result.runtime.hours).toBe(testData.runtimeHours);
        }
        if (testData.runtimeMinutes !== undefined) {
          expect(result.runtime.minutes).toBe(testData.runtimeMinutes);
        }
        if (testData.keywordsMinLength !== undefined) {
          expect(result.keywords.length).toBeGreaterThanOrEqual(
            testData.keywordsMinLength
          );
        }
        if (testData.onOfKeywords !== undefined) {
          expect(
            result.keywords
              .map((i) => i.toLowerCase())
              .includes(testData.onOfKeywords)
          ).toBe(true);
        }

        // posters & still frame images length
        if (testData.postersMinLength !== undefined) {
          expect(
            result.allImages.filter(
              (i) => i.type === ImageType.Poster && !!i.url
            ).length
          ).toBeGreaterThanOrEqual(testData.postersMinLength);
        }

        if (testData.stillFrameMinLength !== undefined) {
          expect(
            result.allImages.filter(
              (i) => i.type === ImageType.StillFrame && !!i.url
            ).length
          ).toBeGreaterThanOrEqual(testData.stillFrameMinLength);
        }

        if (testData.awardsMinLength !== undefined) {
          expect(result.awards.length).toBeGreaterThan(
            testData.awardsMinLength
          );
        }
        if (testData.oscars !== undefined) {
          expect(result.awardsSummary.oscarWins).toBe(testData.oscars);
        }
        if (testData.emmys !== undefined) {
          expect(result.awardsSummary.emmyWins).toBe(testData.emmys);
        }
        if (testData.minNominations !== undefined) {
          expect(result.awardsSummary.totalNominations).toBeGreaterThan(
            testData.minNominations
          );
        }
        if (testData.quotesLength !== undefined) {
          expect(result.quotes.length).toBeGreaterThanOrEqual(
            testData.quotesLength
          );
        }
        if (testData.spoilerQuotes !== undefined) {
          expect(
            result.quotes.filter((i) => i.isSpoiler).length
          ).toBeGreaterThanOrEqual(testData.spoilerQuotes);

          result.quotes.forEach((i) => {
            expect(i.lines.length).toBeGreaterThan(0);
            i.lines.forEach((l) => {
              expect(l.line.length > 0);
            });
          });
        }
        if (testData.goofsLength !== undefined) {
          expect(result.goofs.length).toBeGreaterThanOrEqual(
            testData.goofsLength
          );

          result.goofs.forEach((i) => {
            expect(i.details.length).toBeGreaterThan(0);
            expect(i.groupName.length).toBeGreaterThan(0);
          });
        }

        // ensure that for the default options where we select all fields, all
        // 12 HTTP requests are made
        expect(resolver.httpRequests.size).toBe(12);
      },
      200 * 1000
    );
  });

  titlesToTest.forEach((testData) => {
    test(`check ${testData.name} ${testData.titleYear} empty selection`, async () => {
      const resolver = new IMDBTitleDetailsResolver(testData.url);
      const result = await resolver.getDetails({ select: {} });
      expect(result).not.toBe(undefined);

      // ensure that no HTTP requests were called for an empty selection
      expect(resolver.httpRequests.size).toBe(0);

      // ensure that all fields are undefined for an empty selection
      for (const titleKey of titleKeys) {
        expect(result[titleKey]).toBe(undefined);
      }
    });
  });

  titlesToTest.forEach((testData) => {
    test(`check ${testData.name} ${testData.titleYear} partial selection`, async () => {
      const select: Partial<Record<ITitleKey, boolean>> = {
        name: true,
        genres: true,
        plot: true,
        dates: true,
        mainRate: true,
      };

      const resolver = new IMDBTitleDetailsResolver(testData.url);
      const result = await resolver.getDetails({ select });
      expect(result).not.toBe(undefined);

      // ensure that only the correct HTTP requests have been made made
      expect(resolver.httpRequests.size).toBe(3);
      expect(resolver.httpRequests.has("mainPage")).toBe(true);
      expect(resolver.httpRequests.has("releaseInfo")).toBe(true);
      expect(resolver.httpRequests.has("ratings")).toBe(true);

      // ensure that all selected keys are valid
      for (const titleKey of Object.keys(select)) {
        expect((result as any)[titleKey]).not.toBe(undefined);
      }
    });
  });
});
