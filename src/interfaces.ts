import { Genre, Source, TitleMainType, Language, AwardOutcome } from "./enums";

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
  quotes: ITitleQuoteItem[];
  goofs: ITitleGoofItem[];
}

export type ITitleKey = keyof ITitle;

export interface ITitleDetailsResolverOptions {
  select?: Partial<{
    [key in ITitleKey]: boolean;
  }>;
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
  episodeCredits?: EpisodeCreditsDetails;
  thumbnailImageUrl?: string;
}

export interface EpisodeCreditsDetails {
  totalEpisodes: number;
  startYear: number;
  endYear: number;
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
  type: string;
  title: string;
  sourceType: Source;
  url: string;
  isThumbnail: boolean;
  names?: IPersonDetails[];
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
  seconds: number;
}

export interface IAwardDetails {
  mainEvent: string;
  eventYear: number;
  subEvent: string;
  awardTitle: string;
  outcome: AwardOutcome;
  details?: string;
}

export interface IAwardsSummaryDetails {
  eventName: string;
  awardName: string;
  totalNominations: number;
  wins: number;
}

export interface ITitleDetailsResolver {
  getDetails(opts?: ITitleDetailsResolverOptions): Promise<ITitle | undefined>;
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
  roles: string[];
  category: string; // TODO: make an enum for this
}

export interface IPersonalDetailItem {
  title: string;
  details: string;
  relatedSources: ISourceDetails[];
}

export interface ITitleQuoteItem {
  isSpoiler: boolean;
  lines: ITitleQuoteLineItemDetails[];
}

export interface ITitleQuoteLineItemDetails {
  characters: IQuoteCharacterDetails[];
  line?: string;
  stageDirection?: string;
}

export interface IQuoteCharacterDetails {
  name: string;
  playerName: string;
  playerSource: ISourceDetails;
}

export interface ITitleGoofItem {
  groupName: string;
  isSpoiler: boolean;
  details: string;
}
