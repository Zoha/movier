/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMDBNextData {
  props?: Props;
  page?: string;
  query?: Query;
  buildID?: string;
  assetPrefix?: string;
  runtimeConfig?: RuntimeConfig;
  isFallback?: boolean;
  dynamicIDS?: number[];
  gssp?: boolean;
  customServer?: boolean;
  scriptLoader?: any[];
}

interface Props {
  pageProps?: PageProps;
  nSSP?: boolean;
}

interface PageProps {
  tconst?: string;
  aboveTheFoldData?: AboveTheFoldData;
  mainColumnData?: MainColumnData;
  requestContext?: RequestContext;
  cmsContext?: CMSContext;
  translationContext?: TranslationContext;
  urqlState?: null;
  fetchState?: null;
}

interface AboveTheFoldData {
  id?: string;
  productionStatus?: ProductionStatus;
  canHaveEpisodes?: boolean;
  series?: null;
  titleText?: OriginalTitleText;
  titleType?: TitleType;
  originalTitleText?: OriginalTitleText;
  certificate?: AboveTheFoldDataCertificate;
  releaseYear?: AboveTheFoldDataReleaseYear;
  releaseDate?: ReleaseDate;
  runtime?: AboveTheFoldDataRuntime;
  canRate?: CanRate;
  ratingsSummary?: AboveTheFoldDataRatingsSummary;
  meterRanking?: MeterRanking;
  primaryImage?: NodeClass;
  images?: Credits;
  videos?: Credits;
  primaryVideos?: PrimaryVideos;
  externalLinks?: Credits;
  metacritic?: Metacritic;
  keywords?: Keywords;
  genres?: Genres;
  plot?: Plot;
  plotContributionLink?: Link;
  credits?: Credits;
  principalCredits?: PrincipalCredit[];
  reviews?: Credits;
  criticReviewsTotal?: Credits;
  triviaTotal?: Credits;
  meta?: Meta;
  castPageTitle?: CastPageTitle;
  creatorsPageTitle?: any[];
  directorsPageTitle?: DirectorsPageTitle[];
  countriesOfOrigin?: AboveTheFoldDataCountriesOfOrigin;
  production?: Production;
  featuredReviews?: AboveTheFoldDataFeaturedReviews;
  typename?: AboveTheFoldDataTypename;
}

interface CanRate {
  isRatable?: boolean;
  typename?: CanRateTypename;
}

enum CanRateTypename {
  CanRate = "CanRate",
}

interface CastPageTitle {
  edges?: CastPageTitleEdge[];
  typename?: string;
}

interface CastPageTitleEdge {
  node?: DirectorsPageTitleNode;
  typename?: PurpleTypename;
}

interface DirectorsPageTitleNode {
  name?: PurpleName;
  typename?: string;
}

interface PurpleName {
  nameText?: OriginalTitleText;
  typename?: FluffyTypename;
}

interface OriginalTitleText {
  text?: string;
  typename?: string;
}

enum FluffyTypename {
  Name = "Name",
}

enum PurpleTypename {
  CreditEdge = "CreditEdge",
}

interface AboveTheFoldDataCertificate {
  rating?: Rating;
  typename?: CertificateTypename;
}

enum Rating {
  PG = "PG",
  PG13 = "PG-13",
  R = "R",
}

enum CertificateTypename {
  Certificate = "Certificate",
}

interface AboveTheFoldDataCountriesOfOrigin {
  countries?: PrimaryImageElement[];
  typename?: string;
}

interface PrimaryImageElement {
  id?: string;
  typename?: string;
}

interface Credits {
  total?: number;
  typename?: string;
}

interface DirectorsPageTitle {
  credits?: DirectorsPageTitleNode[];
  typename?: string;
}

interface AboveTheFoldDataFeaturedReviews {
  edges?: PurpleEdge[];
  typename?: string;
}

interface PurpleEdge {
  node?: PurpleNode;
  typename?: string;
}

interface PurpleNode {
  author?: PurpleAuthor;
  summary?: Summary;
  text?: PurpleText;
  authorRating?: number;
  submissionDate?: Date;
  typename?: string;
}

interface PurpleAuthor {
  nickName?: string;
  typename?: string;
}

interface Summary {
  originalText?: string;
  typename?: string;
}

interface PurpleText {
  originalText?: PlotText;
  typename?: string;
}

interface PlotText {
  plainText?: string;
  typename?: PlotTextTypename;
}

enum PlotTextTypename {
  Markdown = "Markdown",
}

interface Genres {
  genres?: CurrentProductionStage[];
  typename?: GenresTypename;
}

interface CurrentProductionStage {
  text?: string;
  id?: string;
  typename?: string;
  event?: PrimaryImageElement;
  attributes?: any[];
}

enum GenresTypename {
  Genres = "Genres",
}

interface Keywords {
  total?: number;
  edges?: KeywordsEdge[];
  typename?: string;
}

interface KeywordsEdge {
  node?: OriginalTitleText;
  typename?: string;
}

interface Meta {
  canonicalID?: string;
  publicationStatus?: string;
  typename?: string;
}

interface Metacritic {
  metascore?: Metascore;
  typename?: string;
}

interface Metascore {
  score?: number;
  typename?: string;
}

interface MeterRanking {
  currentRank?: number;
  rankChange?: RankChange;
  typename?: string;
}

interface RankChange {
  changeDirection?: string;
  difference?: number;
  typename?: string;
}

interface Plot {
  plotText?: PlotText;
  language?: PrimaryImageElement;
  typename?: string;
}

interface Link {
  url?: string;
  typename?: string;
}

interface NodeClass {
  id?: string;
  width?: number;
  height?: number;
  url?: string;
  caption?: PlotText;
  typename?: PrimaryImageTypename;
}

enum PrimaryImageTypename {
  Image = "Image",
  Thumbnail = "Thumbnail",
}

interface PrimaryVideos {
  edges?: PrimaryVideosEdge[];
  typename?: string;
}

interface PrimaryVideosEdge {
  node?: FluffyNode;
  typename?: TentacledTypename;
}

interface FluffyNode {
  id?: string;
  isMature?: boolean;
  contentType?: PurpleContentType;
  thumbnail?: NodeClass;
  runtime?: PurpleRuntime;
  description?: Description;
  name?: Description;
  playbackURLs?: URL[];
  previewURLs?: URL[];
  typename?: StickyTypename;
}

interface PurpleContentType {
  id?: string;
  displayName?: NameClass;
  typename?: ContentTypeTypename;
}

interface NameClass {
  value?: string;
  typename?: DisplayNameTypename;
}

enum DisplayNameTypename {
  LocalizedString = "LocalizedString",
}

enum ContentTypeTypename {
  VideoContentType = "VideoContentType",
}

interface Description {
  value?: string;
  language?: string;
  typename?: DisplayNameTypename;
}

interface URL {
  displayName?: Description;
  mimeType?: string;
  url?: string;
  typename?: string;
}

interface PurpleRuntime {
  value?: number;
  typename?: IndigoTypename;
}

enum IndigoTypename {
  VideoRuntime = "VideoRuntime",
}

enum StickyTypename {
  Video = "Video",
}

enum TentacledTypename {
  VideoEdge = "VideoEdge",
}

interface PrincipalCredit {
  totalCredits?: number;
  category?: CurrentProductionStage;
  credits?: Credit[];
  typename?: string;
}

interface Credit {
  name?: FluffyName;
  attributes?: null;
  typename?: string;
}

interface FluffyName {
  nameText?: OriginalTitleText;
  id?: string;
  typename?: FluffyTypename;
  primaryImage?: NodeClass | null;
}

interface Production {
  edges?: ProductionEdge[];
  typename?: string;
}

interface ProductionEdge {
  node?: TentacledNode;
  typename?: string;
}

interface TentacledNode {
  company?: Company;
  typename?: string;
}

interface Company {
  id?: string;
  companyText?: OriginalTitleText;
  typename?: string;
}

interface ProductionStatus {
  currentProductionStage?: CurrentProductionStage;
  productionStatusHistory?: ProductionStatusHistory[];
  restriction?: null;
  typename?: string;
}

interface ProductionStatusHistory {
  status?: CurrentProductionStage;
  typename?: ProductionStatusHistoryTypename;
}

enum ProductionStatusHistoryTypename {
  ProductionStatusHistory = "ProductionStatusHistory",
}

interface AboveTheFoldDataRatingsSummary {
  aggregateRating?: number | null;
  voteCount?: number;
  typename?: RatingsSummaryTypename;
}

enum RatingsSummaryTypename {
  RatingsSummary = "RatingsSummary",
}

interface ReleaseDate {
  day?: number;
  month?: number;
  year?: number;
  typename?: string;
  country?: CurrentProductionStage;
}

interface AboveTheFoldDataReleaseYear {
  year?: number;
  endYear?: null;
  typename?: ReleaseYearTypename;
}

enum ReleaseYearTypename {
  YearRange = "YearRange",
}

interface AboveTheFoldDataRuntime {
  seconds?: number;
  typename?: IndecentTypename;
}

enum IndecentTypename {
  Runtime = "Runtime",
}

interface TitleType {
  text?: string;
  id?: string;
  isSeries?: boolean;
  isEpisode?: boolean;
  typename?: string;
}

enum AboveTheFoldDataTypename {
  Title = "Title",
}

interface CMSContext {
  transformedPlacements?: TransformedPlacements;
  isDebug?: boolean;
}

interface TransformedPlacements {
  right3?: TransformedPlacementsRight3;
  right5?: TransformedPlacementsRight5;
}

interface TransformedPlacementsRight3 {
  componentName?: string;
  arguments?: ContextClass;
  symphonyMetadata?: SymphonyMetadata;
  transformedArguments?: TransformedArguments;
}

interface ContextClass {
  the03_ImageTargetURL?: string;
  urlLabel?: string;
  the03_ImageSize?: string;
  heading?: string;
  blurbContent?: string;
  blurbPosition?: string;
  widgetref?: string;
  widgetType?: string;
  targetURL?: string;
  the03_ImageImageID?: string;
  generatedPrefix?: string;
  slotName?: string;
}

interface SymphonyMetadata {
  requestID?: string;
  marketplaceID?: string;
  merchantID?: string;
  customerID?: string;
  sessionID?: string;
  contentID?: string;
  creativeID?: string;
  placementID?: string;
  msoGroupName?: null;
  msoSlotOrder?: null;
}

interface TransformedArguments {
  the03_ImageTargetURL?: string;
  urlLabel?: string;
  the03_ImageSize?: string;
  heading?: string;
  blurbContent?: string;
  blurbPosition?: string;
  widgetref?: string;
  widgetType?: string;
  targetURL?: string;
  the03_ImageImageID?: string;
  generatedPrefix?: string;
  slotName?: string;
  refTag?: string;
  errors?: Error[];
  displayTitle?: string;
  iconName?: string;
  description?: string;
  overlayCaption?: string;
  callToActionText?: string;
  callToActionURL?: string;
  linkedImages?: LinkedImage[];
  the01_ImageSize?: string;
  the01_ImageImageID?: string;
  the01_ImageImageIDOverride?: string;
  the01_ImageRelatedListID?: string;
}

interface Error {
  code?: string;
  context?: ContextClass;
}

interface LinkedImage {
  imageModel?: ImageModel;
  link?: string;
}

interface ImageModel {
  url?: string;
  caption?: string;
  maxHeight?: number;
  maxWidth?: number;
}

interface TransformedPlacementsRight5 {
  componentName?: string;
  arguments?: Right5_Arguments;
  symphonyMetadata?: SymphonyMetadata;
  transformedArguments?: TransformedArguments;
  queryTypeFlags?: QueryTypeFlags;
}

interface Right5_Arguments {
  urlLabel?: string;
  the01_ImageSize?: string;
  the01_ImageImageID?: string;
  heading?: string;
  blurbContent?: string;
  blurbPosition?: string;
  the01_ImageImageIDOverride?: string;
  the01_ImageRelatedListID?: string;
  widgetref?: string;
  widgetType?: string;
  targetURL?: string;
  generatedPrefix?: string;
  slotName?: string;
}

interface QueryTypeFlags {
  video?: boolean;
}

interface MainColumnData {
  id?: string;
  wins?: Credits;
  nominations?: Credits;
  prestigiousAwardSummary?: PrestigiousAwardSummary;
  ratingsSummary?: MainColumnDataRatingsSummary;
  episodes?: null;
  videos?: Credits;
  videoStrip?: VideoStrip;
  titleMainImages?: TitleMainImages;
  productionStatus?: ProductionStatus;
  primaryImage?: PrimaryImageElement;
  imageUploadLink?: Link;
  titleType?: PrimaryImageElement;
  canHaveEpisodes?: boolean;
  cast?: Cast;
  principalCast?: PrincipalCast[];
  creators?: any[];
  directors?: Director[];
  writers?: Director[];
  isAdult?: boolean;
  moreLikeThisTitles?: MoreLikeThisTitles;
  summaries?: Summaries;
  outlines?: Outlines;
  synopses?: Outlines;
  storylineKeywords?: StorylineKeywords;
  taglines?: Keywords;
  genres?: Genres;
  certificate?: MainColumnDataCertificate;
  parentsGuide?: ParentsGuide;
  triviaTotal?: Credits;
  trivia?: Trivia;
  goofsTotal?: Credits;
  goofs?: CrazyCredits;
  quotesTotal?: Credits;
  quotes?: Quotes;
  crazyCredits?: CrazyCredits;
  alternateVersions?: AlternateVersions;
  connections?: Connections;
  soundtrack?: Soundtrack;
  titleText?: OriginalTitleText;
  originalTitleText?: OriginalTitleText;
  releaseYear?: AssociatedTitleReleaseYear;
  reviews?: Credits;
  featuredReviews?: MainColumnDataFeaturedReviews;
  canRate?: CanRate;
  iframeAddReviewLink?: Link;
  faqsTotal?: Credits;
  faqs?: Faqs;
  releaseDate?: ReleaseDate;
  countriesOfOrigin?: MainColumnDataCountriesOfOrigin;
  detailsExternalLinks?: DetailsExternalLinks;
  spokenLanguages?: SpokenLanguages;
  akas?: Akas;
  filmingLocations?: Keywords;
  production?: Production;
  companies?: Credits;
  productionBudget?: ProductionBudget;
  lifetimeGross?: Gross;
  openingWeekendGross?: OpeningWeekendGross;
  worldwideGross?: Gross;
  technicalSpecifications?: TechnicalSpecifications;
  runtime?: AboveTheFoldDataRuntime;
  series?: null;
  news?: News;
  contributionQuestions?: ContributionQuestions;
  typename?: AboveTheFoldDataTypename;
}

interface Akas {
  edges?: KeywordsEdge[];
  typename?: string;
}

interface AlternateVersions {
  total?: number;
  edges?: AlternateVersionsEdge[];
  typename?: string;
}

interface AlternateVersionsEdge {
  node?: StickyNode;
  typename?: string;
}

interface StickyNode {
  text?: TextElement;
  typename?: string;
}

interface TextElement {
  plaidHTML?: string;
  typename?: PlotTextTypename;
}

interface Cast {
  edges?: CastEdge[];
  typename?: string;
}

interface CastEdge {
  node?: PrincipalCastNode;
  typename?: PurpleTypename;
}

interface PrincipalCastNode {
  name?: FluffyName;
  attributes?: OriginalTitleText[] | null;
  characters?: NodeCharacter[];
  episodeCredits?: EpisodeCredits;
  typename?: CreditTypename;
}

interface NodeCharacter {
  name?: string;
  typename?: CharacterTypename;
}

enum CharacterTypename {
  Character = "Character",
}

interface EpisodeCredits {
  total?: number;
  yearRange?: null;
  typename?: EpisodeCreditsTypename;
}

enum EpisodeCreditsTypename {
  EpisodeCastConnection = "EpisodeCastConnection",
}

enum CreditTypename {
  Cast = "Cast",
}

interface MainColumnDataCertificate {
  rating?: Rating;
  ratingReason?: string;
  ratingsBody?: PrimaryImageElement;
  typename?: CertificateTypename;
}

interface Connections {
  edges?: ConnectionsEdge[];
  typename?: string;
}

interface ConnectionsEdge {
  node?: IndigoNode;
  typename?: string;
}

interface IndigoNode {
  associatedTitle?: AssociatedTitle;
  category?: OriginalTitleText;
  typename?: string;
}

interface AssociatedTitle {
  id?: string;
  releaseYear?: AssociatedTitleReleaseYear;
  titleText?: OriginalTitleText;
  originalTitleText?: OriginalTitleText;
  series?: AssociatedTitleSeries;
  typename?: AboveTheFoldDataTypename;
}

interface AssociatedTitleReleaseYear {
  year?: number;
  typename?: ReleaseYearTypename;
}

interface AssociatedTitleSeries {
  series?: SeriesSeries;
  typename?: string;
}

interface SeriesSeries {
  titleText?: OriginalTitleText;
  originalTitleText?: OriginalTitleText;
  typename?: AboveTheFoldDataTypename;
}

interface ContributionQuestions {
  contributionLink?: Link;
  edges?: any[];
  typename?: string;
}

interface MainColumnDataCountriesOfOrigin {
  countries?: CurrentProductionStage[];
  typename?: string;
}

interface CrazyCredits {
  edges?: AlternateVersionsEdge[];
  typename?: string;
}

interface DetailsExternalLinks {
  edges?: DetailsExternalLinksEdge[];
  total?: number;
  typename?: string;
}

interface DetailsExternalLinksEdge {
  node?: IndecentNode;
  typename?: string;
}

interface IndecentNode {
  url?: string;
  label?: string;
  externalLinkRegion?: null;
  typename?: string;
}

interface Director {
  totalCredits?: number;
  category?: OriginalTitleText;
  credits?: Credit[];
  typename?: string;
}

interface Faqs {
  edges?: FaqsEdge[];
  typename?: string;
}

interface FaqsEdge {
  node?: HilariousNode;
  typename?: string;
}

interface HilariousNode {
  id?: string;
  question?: PlotText;
  typename?: string;
}

interface MainColumnDataFeaturedReviews {
  edges?: FluffyEdge[];
  typename?: string;
}

interface FluffyEdge {
  node?: AmbitiousNode;
  typename?: string;
}

interface AmbitiousNode {
  id?: string;
  author?: FluffyAuthor;
  summary?: Summary;
  text?: FluffyText;
  authorRating?: number;
  submissionDate?: Date;
  helpfulness?: Helpfulness;
  typename?: string;
}

interface FluffyAuthor {
  nickName?: string;
  userID?: string;
  typename?: string;
}

interface Helpfulness {
  upVotes?: number;
  downVotes?: number;
  typename?: string;
}

interface FluffyText {
  originalText?: TextElement;
  typename?: string;
}

interface Gross {
  total?: Total;
  typename?: string;
}

interface Total {
  amount?: number;
  currency?: string;
  typename?: string;
}

interface MoreLikeThisTitles {
  edges?: MoreLikeThisTitlesEdge[];
  typename?: string;
}

interface MoreLikeThisTitlesEdge {
  node?: CunningNode;
  typename?: HilariousTypename;
}

interface CunningNode {
  id?: string;
  titleText?: OriginalTitleText;
  titleType?: CurrentProductionStage;
  originalTitleText?: OriginalTitleText;
  primaryImage?: NodeClass;
  releaseYear?: AboveTheFoldDataReleaseYear;
  ratingsSummary?: AboveTheFoldDataRatingsSummary;
  runtime?: AboveTheFoldDataRuntime | null;
  certificate?: AboveTheFoldDataCertificate | null;
  canRate?: CanRate;
  titleCardGenres?: TitleCardGenres;
  canHaveEpisodes?: boolean;
  primaryWatchOption?: PrimaryWatchOption | null;
  typename?: AboveTheFoldDataTypename;
}

interface PrimaryWatchOption {
  additionalWatchOptionsCount?: number;
  typename?: PrimaryWatchOptionTypename;
}

enum PrimaryWatchOptionTypename {
  PrimaryWatchOption = "PrimaryWatchOption",
}

interface TitleCardGenres {
  genres?: OriginalTitleText[];
  typename?: GenresTypename;
}

enum HilariousTypename {
  MoreLikeThisEdge = "MoreLikeThisEdge",
}

interface News {
  edges?: NewsEdge[];
  typename?: string;
}

interface NewsEdge {
  node?: MagentaNode;
  typename?: string;
}

interface MagentaNode {
  id?: string;
  articleTitle?: PlotText;
  date?: Date;
  image?: NodeClass;
  source?: Source;
  typename?: string;
}

interface Source {
  homepage?: Homepage;
  typename?: string;
}

interface Homepage {
  label?: string;
  typename?: string;
}

interface OpeningWeekendGross {
  gross?: Gross;
  weekendEndDate?: Date;
  typename?: string;
}

interface Outlines {
  edges?: OutlinesEdge[];
  typename?: string;
}

interface OutlinesEdge {
  node?: FriskyNode;
  typename?: string;
}

interface FriskyNode {
  plotText?: TextElement;
  typename?: string;
}

interface ParentsGuide {
  guideItems?: Credits;
  typename?: string;
}

interface PrestigiousAwardSummary {
  nominations?: number;
  wins?: number;
  award?: CurrentProductionStage;
  typename?: string;
}

interface PrincipalCast {
  credits?: PrincipalCastNode[];
  typename?: string;
}

interface ProductionBudget {
  budget?: Total;
  typename?: string;
}

interface Quotes {
  edges?: QuotesEdge[];
  typename?: string;
}

interface QuotesEdge {
  node?: MischievousNode;
  typename?: string;
}

interface MischievousNode {
  lines?: Line[];
  typename?: string;
}

interface Line {
  characters?: LineCharacter[];
  text?: string;
  stageDirection?: null;
  typename?: string;
}

interface LineCharacter {
  character?: string;
  name?: PrimaryImageElement;
  typename?: string;
}

interface MainColumnDataRatingsSummary {
  topRanking?: TopRanking;
  typename?: RatingsSummaryTypename;
}

interface TopRanking {
  id?: string;
  text?: NameClass;
  rank?: number;
  typename?: string;
}

interface Soundtrack {
  edges?: SoundtrackEdge[];
  typename?: string;
}

interface SoundtrackEdge {
  node?: BraggadociousNode;
  typename?: string;
}

interface BraggadociousNode {
  text?: string;
  comments?: TextElement[];
  typename?: string;
}

interface SpokenLanguages {
  spokenLanguages?: CurrentProductionStage[];
  typename?: string;
}

interface StorylineKeywords {
  edges?: StorylineKeywordsEdge[];
  total?: number;
  typename?: string;
}

interface StorylineKeywordsEdge {
  node?: Node1;
  typename?: string;
}

interface Node1 {
  legacyID?: string;
  text?: string;
  typename?: string;
}

interface Summaries {
  edges?: SummariesEdge[];
  typename?: string;
}

interface SummariesEdge {
  node?: Node2;
  typename?: string;
}

interface Node2 {
  plotText?: TextElement;
  author?: string;
  typename?: string;
}

interface TechnicalSpecifications {
  soundMixes?: SoundMixes;
  aspectRatios?: AspectRatios;
  colorations?: Colorations;
  typename?: string;
}

interface AspectRatios {
  items?: AspectRatiosItem[];
  typename?: string;
}

interface AspectRatiosItem {
  aspectRatio?: string;
  attributes?: any[];
  typename?: string;
}

interface Colorations {
  items?: ColorationsItem[];
  typename?: string;
}

interface ColorationsItem {
  conceptID?: string;
  text?: string;
  attributes?: any[];
  typename?: string;
}

interface SoundMixes {
  items?: CurrentProductionStage[];
  typename?: string;
}

interface TitleMainImages {
  total?: number;
  edges?: TitleMainImagesEdge[];
  typename?: string;
}

interface TitleMainImagesEdge {
  node?: NodeClass;
  typename?: AmbitiousTypename;
}

enum AmbitiousTypename {
  ImageEdge = "ImageEdge",
}

interface Trivia {
  edges?: TriviaEdge[];
  typename?: string;
}

interface TriviaEdge {
  node?: Node3;
  typename?: string;
}

interface Node3 {
  text?: TextElement;
  trademark?: null;
  relatedNames?: null;
  typename?: string;
}

interface VideoStrip {
  edges?: VideoStripEdge[];
  typename?: string;
}

interface VideoStripEdge {
  node?: Node4;
  typename?: TentacledTypename;
}

interface Node4 {
  id?: string;
  contentType?: FluffyContentType;
  name?: NameClass;
  runtime?: PurpleRuntime;
  thumbnail?: NodeClass;
  typename?: StickyTypename;
}

interface FluffyContentType {
  displayName?: NameClass;
  typename?: ContentTypeTypename;
}

interface RequestContext {
  timestamp?: Date;
  sidecar?: Sidecar;
  pageType?: string;
  subPageType?: string;
  pageConst?: string;
  refTagPrefix?: string;
  headers?: Headers;
  requestID?: string;
  isInternal?: boolean;
}

interface Headers {
  xForwardedFor?: string;
  xForwardedProto?: string;
  xForwardedPort?: string;
  host?: string;
  xAmznTraceID?: string;
  xForwardedHost?: string;
  xForwardedServer?: string;
  userAgent?: string;
  xAmzRid?: string;
  xAutobahnVia?: string;
  xAutobahnHeaderOrder?: string;
  xAmznCiHTTPVersion?: string;
  xOriginalURI?: string;
  xOriginalMethod?: string;
  xOriginalScheme?: string;
  originalXForwardedFor?: string;
  cookie?: string;
  acceptLanguage?: string;
  accept?: string;
  acceptEncoding?: string;
  xAmznHeaderCount?: string;
  secChUa?: string;
  secChUaMobile?: string;
  secChUaPlatform?: string;
  upgradeInsecureRequests?: string;
  secFetchSite?: string;
  secFetchMode?: string;
  secFetchUser?: string;
  secFetchDest?: string;
  xAmazonFrontier?: string;
  xAmazonWtmTagAtcEnable?: string;
  xAmazonUrlspace?: string;
  xAmazonInternalIPLocation?: string;
  xAmazonInternalIPClass?: string;
}

interface Sidecar {
  account?: Account;
  isFreediveEligible?: boolean;
  placementMap?: PlacementMap;
  weblabs?: Weblabs;
  ads?: Ads;
  localizationResponse?: LocalizationResponse;
  isReferenceViewPreferred?: boolean;
  sessionID?: string;
}

interface Account {
  userName?: string;
  isLoggedIn?: boolean;
}

interface Ads {
  sisPixelMarkup?: string;
  adSlotsInfo?: string;
}

interface LocalizationResponse {
  userCountryCode?: string;
  userLanguage?: string;
  languageForTranslations?: string;
  geolocationCountryCode?: string;
  latitude?: string;
  longitude?: string;
  isOriginalTitlePreferenceSet?: boolean;
  isFullLocalizationEnabled?: boolean;
  isLanguageSelectorEnabled?: boolean;
}

interface PlacementMap {
  right3?: PlacementMapRight3;
  right5?: PlacementMapRight5;
}

interface PlacementMapRight3 {
  componentName?: string;
  arguments?: ContextClass;
  symphonyMetadata?: SymphonyMetadata;
}

interface PlacementMapRight5 {
  componentName?: string;
  arguments?: Right5_Arguments;
  symphonyMetadata?: SymphonyMetadata;
}

interface Weblabs {
  imdbAdsLatencyExperiment419202?: IMDB418056_Class;
  imdbNextTitleMainHeroVideoPlayback369575?: IMDB418056_Class;
  imdbNextTitleMainInlineVideoPlaylisting382226?: IMDB418056_Class;
  imdbAdsWebMediaInterop395798?: IMDBADSWEBMEDIAINTEROP395798_Class;
  imdbNextWebp421674?: IMDBADSWEBMEDIAINTEROP395798_Class;
  imdbWebBranchIntegration380339?: IMDBADSWEBMEDIAINTEROP395798_Class;
  imdbNextClientSideNavigation323089?: IMDB418056_Class;
  imdb418056?: IMDB418056_Class;
  imdbPersistedQueries417749?: IMDBADSWEBMEDIAINTEROP395798_Class;
  imdbBranchKeySelection373673?: IMDB418056_Class;
  imdbTrustarcGdprCookieCompliance274700?: IMDB418056_Class;
  imdbHeroSubnavOrientation418229?: IMDB418056_Class;
  imdbZukoVpcEndpointSwap427660?: IMDBADSWEBMEDIAINTEROP395798_Class;
}

interface IMDB418056_Class {
  c?: boolean;
}

interface IMDBADSWEBMEDIAINTEROP395798_Class {
  t1?: boolean;
}

interface TranslationContext {
  i18N?: I18N;
}

interface I18N {
  translations?: Translations;
  locale?: string;
}

interface Translations {
  resources?: { [key: string]: string };
  default?: Default;
}

interface Default {
  resources?: { [key: string]: string };
}

interface Query {
  tconst?: string;
}

interface RuntimeConfig {
  sidecarHost?: string;
  env?: string;
  stage?: string;
  cachedGraphQLEndpoint?: string;
  graphQLEndpoint?: string;
  vpcGraphQLEndpoint?: string;
  graphQLTimeout?: string;
  adsPublicSiteHost?: string;
}
