import dayjs from "dayjs";
import { IPerson } from "../interfaces";
import { IMDBPersonDetailsResolver } from "./IMDBPersonDetailsResolver";

export type TestDataType = {
  name: string;
  url: string;
  birthDate?: string;
  birthPlace?: string;
  filmographyData: object;
  knownFormFirstItemDetails: {
    name: string;
    role: string;
    startYear: number;
    endYear?: number;
  };
  personalDetails: object;
  allImagesCount?: number;
  deathDate?: string;
  deathPlace?: string;
};

const dataToTest: TestDataType[] = [
  {
    name: "Marlon Brando",
    url: "https://www.imdb.com/name/nm0000008",
    birthDate: "1924-04-03",
    birthPlace: "Omaha, Nebraska, USA",
    deathDate: "2004-07-01",
    deathPlace: "Westwood, Los Angeles, California, USA",
    filmographyData: {
      actor: 48,
      director: 1,
      cinematographer: 1,
      soundtrack: 5,
      producer: 1,
      self: 42,
      thanks: 9,
    },
    knownFormFirstItemDetails: {
      name: "Apocalypse Now",
      role: "Colonel Walter E. Kurtz",
      startYear: 1979,
    },
    personalDetails: {
      spouse: ["Tarita", "nm0850454"],
      children: ["Christian Brando", "nm0113598"],
      parents: ["Brando Sr., Marlon"],
      relatives: ["Brando"],
    },
  },
  {
    name: "Jake Gyllenhaal",
    url: "https://www.imdb.com/name/nm0350453/",
    birthDate: "1980-12-19",
    birthPlace: "Los Angeles, California, USA",
    filmographyData: {
      actor: 62,
      soundtrack: 4,
      producer: 18,
      self: 194,
      thanks: 7,
    },
    knownFormFirstItemDetails: {
      name: "Nightcrawler",
      role: "Louis Bloom",
      startYear: 2014,
    },
    personalDetails: {
      parents: ["Naomi Foner", "nm0284524"],
      relatives: ["Maggie Gyllenhaal"],
    },
  },
  {
    name: "Emilia Clarke",
    url: "https://www.imdb.com/name/nm3592338",
    birthDate: "1986-10-23",
    birthPlace: "London, England, UK",
    filmographyData: {
      actress: 24,
      soundtrack: 3,
      producer: 1,
      self: 81,
    },
    knownFormFirstItemDetails: {
      name: "Game of Thrones",
      role: "Daenerys Targaryen",
      startYear: 2011,
      endYear: 2019,
    },
    personalDetails: {
      parents: ["Clarke, Jenny"],
    },
  },
  {
    name: "Shahrokh Estakhri",
    url: "https://www.imdb.com/name/nm5427511",
    filmographyData: {
      actor: 10,
    },
    knownFormFirstItemDetails: {
      name: "Check",
      role: "Meysam",
      startYear: 2012,
    },
    personalDetails: {},
    allImagesCount: 1,
  },
];

describe("test imdb name details resolver", () => {
  dataToTest.forEach((testData) => {
    it(
      `check ${testData.name} details`,
      async () => {
        const resolver = new IMDBPersonDetailsResolver(testData.url);
        const nameDetails = (await resolver.getDetails()) as IPerson;
        expect(typeof nameDetails === "object").toBe(true);
        expect(nameDetails.name).toBe(testData.name);
        if (testData.birthDate) {
          expect(nameDetails.birthDate).toBeInstanceOf(Date);
          expect(dayjs(nameDetails.birthDate).format("YYYY-MM-DD")).toBe(
            testData.birthDate
          );
        }
        if (testData.deathDate) {
          expect(nameDetails.deathDate).toBeInstanceOf(Date);
          expect(dayjs(nameDetails.deathDate).format("YYYY-MM-DD")).toBe(
            testData.deathDate
          );
        }
        if (nameDetails.birthPlace) {
          expect(nameDetails.birthPlace).toContain(testData.birthPlace);
        }
        if (nameDetails.deathPlace) {
          expect(nameDetails.deathPlace).toContain(testData.deathPlace);
        }

        const filmoGraphyData = testData.filmographyData;
        for (const category in filmoGraphyData) {
          const result = nameDetails.filmography.filter(
            (i) => i.category === category
          );
          expect(result.length).toBeGreaterThanOrEqual(
            filmoGraphyData[category as keyof typeof filmoGraphyData]
          );
          result.forEach((dataOfCategory) => {
            expect(typeof dataOfCategory.startYear).toBe("number");
            if (
              ["actor", "actress"].includes(dataOfCategory.category) &&
              dataOfCategory.productionStatus.length == 0
            )
              expect(dataOfCategory.startYear).not.toBe(0);
            expect(dataOfCategory.name.length).toBeGreaterThanOrEqual(1);
          });
        }
        expect(nameDetails.allImages.length).toBeGreaterThanOrEqual(
          testData.allImagesCount ?? 30
        );
        nameDetails.allImages.forEach((image) => {
          expect(image.url.length).toBeGreaterThan(1);
        });
        expect(nameDetails.profileImage?.url.length).toBeGreaterThan(1);
        expect(nameDetails.knownFor.length).toBeGreaterThanOrEqual(4);
        expect(nameDetails.knownFor[0].name).toBe(
          testData.knownFormFirstItemDetails.name
        );
        expect(nameDetails.knownFor[0].posterImage.url.length).toBeGreaterThan(
          1
        );
        expect(nameDetails.knownFor[0].role).toBe(
          testData.knownFormFirstItemDetails.role
        );
        expect(nameDetails.knownFor[0].startYear).toBe(
          testData.knownFormFirstItemDetails.startYear
        );
        expect(nameDetails.knownFor[0].endYear).toBe(
          testData.knownFormFirstItemDetails.endYear ??
            testData.knownFormFirstItemDetails.startYear
        );
        nameDetails.knownFor.forEach((film) => {
          expect(film.name.length).toBeGreaterThanOrEqual(1);
          expect(film.posterImage.url.length).toBeGreaterThanOrEqual(1);
        });
        expect(nameDetails.miniBio.length).toBeGreaterThan(0);
        expect(nameDetails.miniBio[0].length).toBeGreaterThan(20);
        expect(nameDetails.personalDetails.length).toBeGreaterThanOrEqual(
          Object.keys(testData.personalDetails).length
        );

        const personalDetails = testData.personalDetails;
        for (const title in personalDetails) {
          const result = nameDetails.personalDetails.find(
            (i) => i.title === title
          );
          const items = personalDetails[
            title as keyof typeof personalDetails
          ] as Array<string>;
          expect(result?.details).toContain(items[0]);
          if (items.length > 1) {
            items.slice(1).forEach((source) => {
              expect(
                !!result?.relatedSources.find((i) => i.sourceId === source)
              ).toBe(true);
            });
          }
        }
      },
      200 * 1000
    );
  });
});
