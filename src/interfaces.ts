import { Genre, Source, TitleMainType, Language } from "./enums";

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
  writers: IPersonDetails[];
  mainType: TitleMainType;
  plot: string;
  casts: ICastDetails[];
  producers: IPersonDetails[];
  mainRate: IRateDetails;
  allRates: IRateDetails[];
  dates: IDatesDetails;
  allReleaseDates: IReleaseDateDetails[];
  ageCategoryTitle: string;
  languages: string[];
  countriesOfOrigin: string[];
  posterImage: IImageDetails;
  allImages: IImageDetails[];
  boxOffice?: IBoxOfficeDetails;
  productionCompanies: IProductionCompanyDetails[];
  storyline: string;
  taglines: string[];
  runtime: IRuntimeDetails;
  keywords: string[];

  // TODO: add this properties

  // all images
  // awards
  // awards summary
  // videos ( just trailers )
  // related

  otherLangs: ITitle[];
}

export interface ITitleLocale {
  detailsLang: Language;
  mainSource: ISourceDetails;
  name: string;
  otherNames: string[];
  plot: string;
}

export interface ISourceDetails {
  sourceId: string;
  sourceType: Source;
  sourceUrl: string;
}

export interface IPersonDetails {
  source?: ISourceDetails;
  name: string;
  extraInfo?: string;
}

export interface IRoleDetails {
  source?: ISourceDetails;
  name: string;
}

export interface ICastDetails extends IPersonDetails {
  roles: IRoleDetails[];
  otherNames?: string[];
  imageThumbnailUrl?: string;
}

export interface IRateAndVotesCount {
  rate: number;
  votesCount: number;
}

export interface IAgesRateAndVotesCount {
  allAges?: IRateAndVotesCount;
  under18?: IRateAndVotesCount;
  between18And29?: IRateAndVotesCount;
  between30And44?: IRateAndVotesCount;
  over44?: IRateAndVotesCount;
}

export interface IRateDetailsForSpecificAge extends IRateAndVotesCount {
  percent?: number;
}

export interface IRateDetails extends IRateAndVotesCount {
  rateSource: Source;
  assortedByGender?: {
    allGenders?: IAgesRateAndVotesCount;
    male?: IAgesRateAndVotesCount;
    female?: IAgesRateAndVotesCount;
  };
  assortedByRate?: IRateDetailsForSpecificAge[];
}

export interface IDatesDetails {
  titleYear: number;
  startYear: number;
  startCountry: string;
  startExtraInfo?: string;
  endYear?: number;
  startDate: Date;
  isEnded?: boolean;
}

export interface IReleaseDateDetails {
  country: string;
  date: Date;
  extraInfo?: string;
}

export interface IBoxOfficeDetails {
  budget: number;
  worldwide: number;
  mainCountries: {
    countries: string[];
    amount: number;
  };
  opening: {
    countries: string[];
    amount: number;
    date: Date;
  };
}

export interface IProductionCompanyDetails {
  name: string;
  extraInfo?: string;
}

export interface IImageDetails {
  title: string;
  sourceType: Source;
  url: string;
  isThumbnail: boolean;
  size?: {
    width: number;
    height: number;
  };
  thumbnails?: IImageDetails[];
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

export interface IRuntimeDetails {
  title: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ITitleDetailsResolver {
  getDetails(): Promise<ITitle | undefined>;
}
