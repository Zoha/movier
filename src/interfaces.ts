import { Genre, Source, WriterRole, TitleMainType, Language } from "./enums";

export interface Title {
  detailsLang: Language;
  mainSource: SourceDetails;
  allSources?: SourceDetails[];
  name: string;
  localName: string;
  otherNames: string[];
  titleYear: number;
  genres: Genre;
  directors: PersonDetails[];
  writers: WriterDetails[];
  mainType: TitleMainType;
  plot: string;
  casts: CastDetails[];
  producers: ProducerDetails[];
  mainRateSource: SourceDetails;
  mainRate: RatesDetails;
  allRates: RatesDetails[];
  dates: DatesDetails;
  ageCategoryTitle: string;
  languages: string[];
  countries: string[];
  boxOffice: BoxOfficeDetails;
  productionCompanies: string[];
  filmingLocations: string[];
  mainImage: string;
  allImages: ImageDetails;
  otherLangs: Title[];
}

interface SourceDetails {
  sourceId: string;
  sourceType: Source;
  sourceUrl: string;
}

interface PersonDetails {
  name: string;
  otherNames: string[];
}

interface WriterDetails extends PersonDetails {
  role?: WriterRole;
}

interface CastDetails extends PersonDetails {
  roles: string;
}

interface ProducerDetails extends PersonDetails {
  title: string;
}

interface RatesDetails {
  rateSource: Source;
  rate: number;
  votesCount: number;
}

interface DatesDetails {
  titleYear: number;
  startYear: number;
  endYear: number;
  startDate: Date;
  endDate: Date;
}

interface BoxOfficeDetails {
  budget: number;
  worldwide: number;
  crossMainCountries: {
    countries: string[];
    amount: number;
  };
  opening: {
    countries: string[];
    amount: number;
    date: number;
  };
}

interface ImageDetails {
  title: string;
  sourceType: Source;
  url: string;
  isThumbnail: boolean;
  size: {
    width: number;
    height: number;
  };
  thumbnails: ImageDetails[];
}

export interface FoundedTitleDetails {
  source: Source;
  name: string;
  titleYear: number;
  aka: string;
  url: string;
  titleType: TitleMainType;
  matchScore: number;
  thumbnailImage: string;
}
