import { Genre, Source, WriterRole, TitleMainType, Language } from "./enums";

export interface ITitle {
  detailsLang: Language;
  mainSource: ISourceDetails;
  allSources: ISourceDetails[];
  name: string;
  worldWideName: string;
  otherNames: string[];
  titleYear: number;
  genres: Genre[];
  directors: IPersonDetails[];
  writers: IWriterDetails[];
  mainType: TitleMainType;
  plot: string;
  casts: ICastDetails[];
  producers: IProducerDetails[];
  mainRateSource: ISourceDetails;
  mainRate: IRatesDetails;
  allRates: IRatesDetails[];
  dates: IDatesDetails;
  ageCategoryTitle: string;
  languages: string[];
  countries: string[];
  boxOffice: IBoxOfficeDetails;
  productionCompanies: string[];
  filmingLocations: string[];
  mainImage: string;
  allImages: IImageDetails;
  otherLangs: ITitle[];
}

export interface ISourceDetails {
  sourceId: string;
  sourceType: Source;
  sourceUrl: string;
}

export interface IPersonDetails {
  source?: ISourceDetails;
  name: string;
  otherNames: string[];
}

export interface IWriterDetails extends IPersonDetails {
  role?: WriterRole;
}

export interface ICastDetails extends IPersonDetails {
  roles: string;
}

export interface IProducerDetails extends IPersonDetails {
  title: string;
}

export interface IRatesDetails {
  rateSource: Source;
  rate: number;
  votesCount: number;
}

export interface IDatesDetails {
  titleYear: number;
  startYear: number;
  endYear: number;
  startDate: Date;
  endDate: Date;
}

export interface IBoxOfficeDetails {
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

export interface IImageDetails {
  title: string;
  sourceType: Source;
  url: string;
  isThumbnail: boolean;
  size: {
    width: number;
    height: number;
  };
  thumbnails: IImageDetails[];
}

export interface IFoundedTitleDetails {
  source: Source;
  name: string;
  titleYear: number;
  aka: string;
  url: string;
  titleType: TitleMainType;
  matchScore: number;
  thumbnailImage: string;
}

export interface ITitleDetailsResolver {
  getDetails(): Promise<ITitle | undefined>;
}
