import {
  Genre,
  Source,
  TitleMainType,
  Language,
  AwardOutcome,
  ImageType,
} from "./enums";

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
  taglines: string[];
  runtime: IRuntimeDetails;
  keywords: string[];
  awards: IAwardDetails[];
  awardsSummary: IAwardsSummaryDetails;
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
  thumbnailImageUrl?: string;
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
  type: ImageType;
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
  source: ISourceDetails;
  name: string;
  titleYear: number;
  aka: string;
  url: string;
  titleType: TitleMainType;
  matchScore: number;
  thumbnailImageUrl: string;
}

export interface IFoundedPersonDetails {
  source: ISourceDetails;
  name: string;
  url: string;
  matchScore: number;
  thumbnailImageUrl: string;
}

export interface IRuntimeDetails {
  title: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface IAwardDetails {
  source: ISourceDetails;
  mainEvent: string;
  eventYear: number;
  subEvent: string;
  awardTitle: string;
  outcome: AwardOutcome;
  details?: string;
  relatedPersons: IPersonDetails[];
  relatedTitles: {
    name: string;
    source: ISourceDetails;
  }[];
}

export interface IAwardsSummaryDetails {
  totalNominations: number;
  nominationsOutcome: number;
  wins: number;
  oscarWins: number;
  emmyWins: number;
}

export interface ITitleDetailsResolver {
  getDetails(): Promise<ITitle | undefined>;
}

export interface ITitleSearchResolver {
  getResult(): Promise<IFoundedTitleDetails[]>;
}
export interface IPersonSearchResolver {
  getResult(): Promise<IFoundedPersonDetails[]>;
}

export interface IPersonDetailsResolver {
  getDetails(): Promise<IPerson | undefined>;
}

export interface IPerson {
  detailsLang: Language;
  mainSource: ISourceDetails;
  name: string;
  birthDate?: Date;
  birthPlace?: string;
  miniBio: string[];
  knownFor: IKnownForItem[];
  filmography: IFilmographyItem[];
  personalDetails: IPersonalDetailItem[];
  profileImage?: IImageDetails;
  allImages: IImageDetails[];
  deathDate?: Date;
  deathPlace?: string;
}

export interface IKnownForItem {
  source: ISourceDetails;
  posterImage: IImageDetails;
  name: string;
  role: string;
  startYear: number;
  endYear: number;
}

export interface IFilmographyItem {
  source: ISourceDetails;
  name: string;
  type: TitleMainType;
  startYear: number;
  endYear: number;
  productionStatus: string;
  role: string;
  category: string; // TODO: make an enum for this
}

export interface IPersonalDetailItem {
  title: string;
  details: string;
  relatedSources: ISourceDetails[];
}

export enum IMDBPathType {
  Title = "title",
  Name = "name",
}
