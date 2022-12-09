export interface PersonDetailsNextData {
  props?: Props;
  page?: string;
  query?: Query;
  buildId?: string;
  assetPrefix?: string;
  runtimeConfig?: RuntimeConfig;
  isFallback?: boolean;
  gssp?: boolean;
  customServer?: boolean;
  scriptLoader?: any[];
}

export interface Props {
  pageProps?: PageProps;
  __N_SSP?: boolean;
}

export interface PageProps {
  nmconst?: string;
  aboveTheFold?: AboveTheFold;
  mainColumnData?: MainColumnData;
  nameImageUploadLinkData?: NameImageUploadLinkData;
  urqlState?: null;
  fetchState?: null;
}

export interface AboveTheFold {
  id?: string;
  nameText?: NameText;
  searchIndexing?: SearchIndexing;
  disambiguator?: null;
  knownFor?: KnownFor;
  images?: Images;
  primaryImage?: PrimaryImage;
  meta?: Meta;
  bio?: Bio;
  primaryProfessions?: AboveTheFoldPrimaryProfession[];
  birthDate?: AboveTheFoldBirthDate;
  deathDate?: null;
  deathStatus?: string;
  meterRanking?: MeterRanking;
  subNavBio?: SubNavBio;
  subNavTrivia?: Images;
  subNavAwardNominations?: Images;
  videos?: Images;
  primaryVideos?: PrimaryVideos;
  __typename?: string;
}

export interface Bio {
  text?: CaptionClass;
  __typename?: string;
}

export interface CaptionClass {
  plainText?: string;
  __typename?: TextTypename;
}

export enum TextTypename {
  Markdown = "Markdown",
}

export interface AboveTheFoldBirthDate {
  displayableProperty?: DisplayableProperty;
  date?: Date;
  dateComponents?: DateComponents;
  __typename?: string;
}

export interface DateComponents {
  day?: number;
  month?: number;
  year?: number;
  isBCE?: boolean;
  __typename?: string;
}

export interface DisplayableProperty {
  value?: CaptionClass;
  __typename?: string;
}

export interface Images {
  total?: number;
  __typename?: string;
}

export interface KnownFor {
  edges?: AkasEdge[];
  __typename?: string;
}

export interface AkasEdge {
  node?: PurpleNode;
  __typename?: string;
}

export interface PurpleNode {
  title?: PurpleTitle;
  summary?: PurpleSummary;
  __typename?: string;
}

export interface PurpleSummary {
  principalCategory?: NameText;
  __typename?: string;
}

export interface NameText {
  text?: string;
  __typename?: NameTextTypename;
}

export enum NameTextTypename {
  CreditCategory = "CreditCategory",
  Genre = "Genre",
  NameText = "NameText",
  TitleText = "TitleText",
}

export interface PurpleTitle {
  titleText?: NameText;
  __typename?: string;
}

export interface Meta {
  canonicalId?: string;
  publicationStatus?: string;
  __typename?: string;
}

export interface MeterRanking {
  currentRank?: number;
  rankChange?: RankChange;
  __typename?: string;
}

export interface RankChange {
  changeDirection?: string;
  difference?: number;
  __typename?: string;
}

export interface PrimaryImage {
  id?: string;
  url?: string;
  height?: number;
  width?: number;
  caption?: CaptionClass;
  __typename?: PrimaryImageTypename;
}

export enum PrimaryImageTypename {
  Image = "Image",
}

export interface AboveTheFoldPrimaryProfession {
  category?: NameText;
  __typename?: string;
}

export interface PrimaryVideos {
  edges?: PrimaryVideosEdge[];
  __typename?: string;
}

export interface PrimaryVideosEdge {
  node?: FluffyNode;
  __typename?: string;
}

export interface FluffyNode {
  id?: string;
  isMature?: boolean;
  thumbnail?: Thumbnail;
  runtime?: NodeRuntime;
  description?: Description;
  name?: Description;
  previewURLs?: PreviewURL[];
  contentType?: ContentType;
  primaryTitle?: PrimaryTitle;
  __typename?: string;
}

export interface ContentType {
  id?: string;
  displayName?: DisplayName;
  __typename?: string;
}

export interface DisplayName {
  value?: string;
  __typename?: string;
}

export interface Description {
  value?: string;
  language?: string;
  __typename?: string;
}

export interface PreviewURL {
  displayName?: Description;
  mimeType?: string;
  url?: string;
  __typename?: string;
}

export interface PrimaryTitle {
  originalTitleText?: NameText;
  titleText?: NameText;
  releaseYear?: ReleaseYear;
  titleType?: PrimaryTitleTitleType;
  __typename?: string;
}

export interface ReleaseYear {
  year?: number;
  endYear?: number | null;
  __typename?: ReleaseYearTypename;
}

export enum ReleaseYearTypename {
  YearRange = "YearRange",
}

export interface PrimaryTitleTitleType {
  canHaveEpisodes?: boolean;
  __typename?: string;
}

export interface NodeRuntime {
  value?: number;
  __typename?: string;
}

export interface Thumbnail {
  url?: string;
  height?: number;
  width?: number;
  __typename?: string;
}

export interface SearchIndexing {
  disableIndexing?: boolean;
  __typename?: string;
}

export interface SubNavBio {
  id?: string;
  __typename?: string;
}

export interface MainColumnData {
  id?: string;
  wins?: Images;
  nominations?: Images;
  prestigiousAwardSummary?: PrestigiousAwardSummary;
  images?: Children;
  primaryImage?: PrimaryImage;
  imageUploadLink?: null;
  nameText?: NameText;
  knownFor?: PurpleKnownFor;
  primaryProfessions?: MainColumnDataPrimaryProfession[];
  height?: Height;
  birthDate?: MainColumnDataBirthDate;
  birthLocation?: BirthLocation;
  deathDate?: MainColumnDataBirthDate;
  deathLocation?: BirthLocation;
  deathCause?: null;
  akas?: KnownFor;
  otherWorks?: Children;
  personalDetailsSpouses?: null;
  parents?: Others;
  children?: Children;
  others?: Others;
  personalDetailsExternalLinks?: Children;
  publicityListings?: Images;
  nameFilmBiography?: Images;
  namePrintBiography?: Images;
  namePortrayal?: Images;
  publicityInterview?: Images;
  publicityArticle?: Images;
  publicityPictorial?: Images;
  publicityMagazineCover?: Images;
  demographicData?: null;
  triviaTotal?: Images;
  trivia?: Quotes;
  quotesTotal?: Images;
  quotes?: Quotes;
  trademarksTotal?: Images;
  trademarks?: Quotes;
  nickNames?: Height[];
  titleSalariesTotal?: Images;
  titleSalaries?: TitleSalaries;
  __typename?: string;
}

export interface MainColumnDataBirthDate {
  dateComponents?: DateComponents;
  displayableProperty?: DisplayableProperty;
  __typename?: string;
}

export interface BirthLocation {
  text?: string;
  displayableProperty?: DisplayableProperty;
  __typename?: string;
}

export interface Children {
  total?: number;
  pageInfo?: PageInfo;
  edges?: ChildrenEdge[];
  __typename?: string;
}

export interface ChildrenEdge {
  node?: TentacledNode;
  __typename?: string;
}

export interface TentacledNode {
  id?: string;
  url?: string;
  caption?: CaptionClass;
  height?: number;
  width?: number;
  __typename?: string;
  season?: string;
  displayableProperty?: DisplayableProperty;
  year?: string;
  category?: null;
  text?: BodyClass;
  label?: string;
}

export interface BodyClass {
  __typename?: TextTypename;
}

export interface PageInfo {
  hasNextPage?: boolean;
  endCursor?: null | string;
  __typename?: string;
}

export interface Height {
  displayableProperty?: DisplayableProperty;
  __typename?: string;
}

export interface PurpleKnownFor {
  edges?: PurpleEdge[];
  __typename?: string;
}

export interface PurpleEdge {
  node?: StickyNode;
  __typename?: string;
}

export interface StickyNode {
  summary?: FluffySummary;
  credit?: Credit;
  title?: FluffyTitle;
  __typename?: string;
}

export interface Credit {
  attributes?: null;
  category?: Award;
  characters?: Character[];
  episodeCredits?: EpisodeCredits;
  __typename?: string;
}

export interface Award {
  id?: string;
  text?: string;
  __typename?: AwardTypename;
  event?: SubNavBio;
}

export enum AwardTypename {
  AwardDetails = "AwardDetails",
  CreditCategory = "CreditCategory",
  NameRelationType = "NameRelationType",
  ProductionStage = "ProductionStage",
}

export interface Character {
  name?: string;
  __typename?: string;
}

export interface EpisodeCredits {
  total?: number;
  yearRange?: ReleaseYear | null;
  displayableYears?: Children;
  displayableSeasons?: Children;
  __typename?: string;
}

export interface FluffySummary {
  attributes?: null;
  episodeCount?: number | null;
  principalCategory?: Award;
  principalCharacters?: Character[];
  principalJobs?: null;
  yearRange?: ReleaseYear;
  __typename?: string;
}

export interface FluffyTitle {
  id?: string;
  canRate?: CanRate;
  certificate?: Certificate;
  originalTitleText?: NameText;
  titleText?: NameText;
  titleType?: TitleTitleType;
  primaryImage?: PrimaryImage;
  ratingsSummary?: RatingsSummary;
  latestTrailer?: SubNavBio;
  releaseYear?: ReleaseYear;
  runtime?: TitleRuntime;
  series?: null;
  episodes?: Episodes | null;
  genres?: Genres;
  productionStatus?: ProductionStatus;
  __typename?: string;
}

export interface CanRate {
  isRatable?: boolean;
  __typename?: string;
}

export interface Certificate {
  rating?: string;
  __typename?: string;
}

export interface Episodes {
  displayableSeasons?: Children;
  displayableYears?: Children;
  __typename?: string;
}

export interface Genres {
  genres?: NameText[];
  __typename?: string;
}

export interface ProductionStatus {
  currentProductionStage?: Award;
  __typename?: string;
}

export interface RatingsSummary {
  aggregateRating?: number;
  voteCount?: number;
  __typename?: string;
}

export interface TitleRuntime {
  seconds?: number;
  __typename?: string;
}

export interface TitleTitleType {
  canHaveEpisodes?: boolean;
  displayableProperty?: DisplayableProperty;
  text?: string;
  id?: string;
  __typename?: string;
}

export interface Others {
  total?: number;
  pageInfo?: PageInfo;
  edges?: OthersEdge[];
  __typename?: string;
}

export interface OthersEdge {
  node?: IndigoNode;
  __typename?: string;
}

export interface IndigoNode {
  relationshipType?: Award;
  relationName?: RelationName;
  __typename?: string;
}

export interface RelationName {
  name?: SubNavBio | null;
  displayableProperty?: DisplayableProperty;
  __typename?: string;
}

export interface PrestigiousAwardSummary {
  nominations?: number;
  wins?: number;
  award?: Award;
  __typename?: string;
}

export interface MainColumnDataPrimaryProfession {
  category?: Award;
  __typename?: string;
}

export interface Quotes {
  edges?: QuotesEdge[];
  __typename?: string;
}

export interface QuotesEdge {
  node?: IndecentNode;
  __typename?: string;
}

export interface IndecentNode {
  displayableArticle?: DisplayableArticle;
  __typename?: string;
}

export interface DisplayableArticle {
  body?: BodyClass;
  __typename?: string;
}

export interface TitleSalaries {
  edges?: TitleSalariesEdge[];
  __typename?: string;
}

export interface TitleSalariesEdge {
  node?: HilariousNode;
  __typename?: string;
}

export interface HilariousNode {
  title?: TentacledTitle;
  displayableProperty?: DisplayableProperty;
  __typename?: string;
}

export interface TentacledTitle {
  id?: string;
  titleText?: NameText;
  originalTitleText?: NameText;
  releaseYear?: PurpleReleaseYear;
  __typename?: string;
}

export interface PurpleReleaseYear {
  year?: number;
  __typename?: ReleaseYearTypename;
}

export interface NameImageUploadLinkData {
  id?: string;
  imageUploadLink?: null;
  __typename?: string;
}

export interface Query {
  ref_?: string;
  opfInternalRedirectIsNewUser?: string;
  opfInternalRedirectSessionId?: string;
  opfInternalRedirectSessionToken?: string;
  opfInternalRedirectUbid?: string;
  opfInternalRedirectSourceHost?: string;
  nmconst?: string;
}

export interface RuntimeConfig {
  sidecarHost?: string;
  env?: string;
  stage?: string;
  cachedGraphQLEndpoint?: string;
  graphQLEndpoint?: string;
  vpcGraphQLEndpoint?: string;
  graphQLTimeout?: string;
  adsPublicSiteHost?: string;
}
