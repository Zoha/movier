export interface IMDBNextData {
  props: Props;
}
export interface Props {
  pageProps: PageProps;
}
export interface PageProps {
  tconst: string;
  aboveTheFoldData: AboveTheFoldData;
  mainColumnData: MainColumnData;
  urqlState?: null;
  fetchState?: null;
}
export interface AboveTheFoldData {
  id: string;
  productionStatus: ProductionStatus;
  canHaveEpisodes: boolean;
  series?: null;
  titleText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  titleType: TitleType;
  originalTitleText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  certificate: Certificate;
  releaseYear: ReleaseYearOrYearRange;
  releaseDate: ReleaseDate;
  runtime: Runtime;
  canRate: CanRate;
  ratingsSummary: RatingsSummary;
  meterRanking: MeterRanking;
  primaryImage: PrimaryImageOrNode;
  images: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  videos: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  primaryVideos: PrimaryVideos;
  externalLinks: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  metacritic?: null;
  keywords: KeywordsOrFilmingLocations;
  genres: Genres;
  plot: Plot;
  plotContributionLink: PlotContributionLinkOrContributionLinkOrImageUploadLinkOrIframeAddReviewLink;
  credits: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  principalCredits?: PrincipalCreditsEntity[] | null;
  reviews: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  criticReviewsTotal: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  triviaTotal: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  meta: Meta;
  castPageTitle: CastPageTitle;
  creatorsPageTitle?: CreatorsPageTitleEntity[] | null;
  directorsPageTitle?: null[] | null;
  countriesOfOrigin: CountriesOfOrigin;
  production: Production;
  featuredReviews: FeaturedReviews;
  __typename: string;
}
export interface ProductionStatus {
  currentProductionStage: StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity;
  productionStatusHistory?: ProductionStatusHistoryEntity[] | null;
  restriction?: null;
  __typename: string;
}
export interface StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity {
  id: string;
  text: string;
  __typename: string;
}
export interface ProductionStatusHistoryEntity {
  status: StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity;
  __typename: string;
}
export interface NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory {
  text: string;
  __typename: string;
}
export interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}
export interface Certificate {
  rating: string;
  __typename: string;
}
export interface ReleaseYearOrYearRange {
  year: number;
  endYear: number;
  __typename: string;
}
export interface ReleaseDate {
  day: number;
  month: number;
  year: number;
  __typename: string;
}
export interface Runtime {
  seconds: number;
  __typename: string;
}
export interface CanRate {
  isRatable: boolean;
  __typename: string;
}
export interface RatingsSummary {
  aggregateRating: number;
  voteCount: number;
  __typename: string;
}
export interface MeterRanking {
  currentRank: number;
  rankChange: RankChange;
  __typename: string;
}
export interface RankChange {
  changeDirection: string;
  difference: number;
  __typename: string;
}
export interface PrimaryImageOrNode {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: CaptionOrPlotTextOrOriginalTextOrQuestion;
  __typename: string;
}
export interface CaptionOrPlotTextOrOriginalTextOrQuestion {
  plainText: string;
  __typename: string;
}
export interface ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies {
  total: number;
  __typename: string;
}
export interface PrimaryVideos {
  edges?: EdgesEntity[] | null;
  __typename: string;
}
export interface EdgesEntity {
  node: Node;
  __typename: string;
}
export interface Node {
  id: string;
  isMature: boolean;
  contentType: ContentType;
  thumbnail: ThumbnailOrPrimaryImage;
  runtime: Runtime1;
  description: DisplayNameOrDescriptionOrName;
  name: DisplayNameOrDescriptionOrName;
  playbackURLs?: PlaybackURLsEntityOrPreviewURLsEntity[] | null;
  previewURLs?: PlaybackURLsEntityOrPreviewURLsEntity[] | null;
  __typename: string;
}
export interface ContentType {
  id: string;
  displayName: DisplayNameOrTextOrName;
  __typename: string;
}
export interface DisplayNameOrTextOrName {
  value: string;
  __typename: string;
}
export interface ThumbnailOrPrimaryImage {
  url: string;
  height: number;
  width: number;
  __typename: string;
}
export interface Runtime1 {
  value: number;
  __typename: string;
}
export interface DisplayNameOrDescriptionOrName {
  value: string;
  language: string;
  __typename: string;
}
export interface PlaybackURLsEntityOrPreviewURLsEntity {
  displayName: DisplayNameOrDescriptionOrName;
  mimeType: string;
  url: string;
  __typename: string;
}
export interface KeywordsOrFilmingLocations {
  total: number;
  edges?: EdgesEntity1[] | null;
  __typename: string;
}
export interface EdgesEntity1 {
  node: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  __typename: string;
}
export interface Genres {
  genres?:
    | StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity[]
    | null;
  __typename: string;
}
export interface Plot {
  plotText: CaptionOrPlotTextOrOriginalTextOrQuestion;
  language: LanguageOrCountriesEntityOrEventOrNameOrPrimaryImageOrTitleType;
  __typename: string;
}
export interface LanguageOrCountriesEntityOrEventOrNameOrPrimaryImageOrTitleType {
  id: string;
  __typename: string;
}
export interface PlotContributionLinkOrContributionLinkOrImageUploadLinkOrIframeAddReviewLink {
  url: string;
  __typename: string;
}
export interface PrincipalCreditsEntity {
  totalCredits: number;
  category: StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity;
  credits?: CreditsEntity[] | null;
  __typename: string;
}
export interface CreditsEntity {
  name: Name;
  attributes?: null;
  __typename: string;
}
export interface Name {
  nameText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  id: string;
  __typename: string;
}
export interface Meta {
  canonicalId: string;
  publicationStatus: string;
  __typename: string;
}
export interface CastPageTitle {
  edges?: EdgesEntity2[] | null;
  __typename: string;
}
export interface EdgesEntity2 {
  node: NodeOrCreditsEntity;
  __typename: string;
}
export interface NodeOrCreditsEntity {
  name: Name1;
  __typename: string;
}
export interface Name1 {
  nameText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  __typename: string;
}
export interface CreatorsPageTitleEntity {
  credits?: NodeOrCreditsEntity[] | null;
  __typename: string;
}
export interface CountriesOfOrigin {
  countries?:
    | LanguageOrCountriesEntityOrEventOrNameOrPrimaryImageOrTitleType[]
    | null;
  __typename: string;
}
export interface Production {
  edges?: EdgesEntity3[] | null;
  __typename: string;
}
export interface EdgesEntity3 {
  node: Node1;
  __typename: string;
}
export interface Node1 {
  company: Company;
  __typename: string;
}
export interface Company {
  id: string;
  companyText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  __typename: string;
}
export interface FeaturedReviews {
  edges?: EdgesEntity4[] | null;
  __typename: string;
}
export interface EdgesEntity4 {
  node: Node2;
  __typename: string;
}
export interface Node2 {
  author: Author;
  summary: Summary;
  text: Text;
  authorRating: number;
  submissionDate: string;
  __typename: string;
}
export interface Author {
  nickName: string;
  __typename: string;
}
export interface Summary {
  originalText: string;
  __typename: string;
}
export interface Text {
  originalText: CaptionOrPlotTextOrOriginalTextOrQuestion;
  __typename: string;
}
export interface MainColumnData {
  id: string;
  wins: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  nominations: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  prestigiousAwardSummary: PrestigiousAwardSummary;
  ratingsSummary: RatingsSummary1;
  episodes: Episodes;
  videos: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  videoStrip: VideoStrip;
  titleMainImages: TitleMainImages;
  productionStatus: ProductionStatus;
  primaryImage: LanguageOrCountriesEntityOrEventOrNameOrPrimaryImageOrTitleType;
  imageUploadLink: PlotContributionLinkOrContributionLinkOrImageUploadLinkOrIframeAddReviewLink;
  titleType: LanguageOrCountriesEntityOrEventOrNameOrPrimaryImageOrTitleType;
  canHaveEpisodes: boolean;
  cast: Cast;
  principalCast?: PrincipalCastEntity[] | null;
  creators?: CreatorsEntity[] | null;
  directors?: null[] | null;
  writers?: null[] | null;
  triviaTotal: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  trivia: Trivia;
  goofsTotal: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  goofs: Goofs;
  quotesTotal: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  quotes: Quotes;
  crazyCredits: CrazyCredits;
  alternateVersions: AlternateVersions;
  connections: Connections;
  soundtrack: Soundtrack;
  titleText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  originalTitleText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  releaseYear: YearsEntityOrReleaseYear;
  reviews: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  featuredReviews: FeaturedReviews1;
  canRate: CanRate;
  iframeAddReviewLink: PlotContributionLinkOrContributionLinkOrImageUploadLinkOrIframeAddReviewLink;
  faqsTotal: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  faqs: Faqs;
  releaseDate: ReleaseDate1;
  countriesOfOrigin: CountriesOfOrigin1;
  detailsExternalLinks: DetailsExternalLinks;
  spokenLanguages: SpokenLanguages;
  akas: Akas;
  filmingLocations: KeywordsOrFilmingLocations;
  production: Production;
  companies: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  productionBudget?: null;
  lifetimeGross?: null;
  openingWeekendGross?: null;
  worldwideGross?: null;
  technicalSpecifications: TechnicalSpecifications;
  runtime: Runtime;
  series?: null;
  contributionQuestions: ContributionQuestions;
  __typename: string;
}
export interface PrestigiousAwardSummary {
  nominations: number;
  wins: number;
  award: Award;
  __typename: string;
}
export interface Award {
  text: string;
  id: string;
  event: LanguageOrCountriesEntityOrEventOrNameOrPrimaryImageOrTitleType;
  __typename: string;
}
export interface RatingsSummary1 {
  topRanking: TopRanking;
  __typename: string;
}
export interface TopRanking {
  id: string;
  text: DisplayNameOrTextOrName;
  rank: number;
  __typename: string;
}
export interface Episodes {
  episodes: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  seasons?: SeasonsEntity[] | null;
  years?: YearsEntityOrReleaseYear[] | null;
  totalEpisodes: ImagesOrVideosOrExternalLinksOrCreditsOrReviewsOrCriticReviewsTotalOrTriviaTotalOrEpisodesOrTotalEpisodesOrWinsOrNominationsOrGoofsTotalOrQuotesTotalOrFaqsTotalOrCompanies;
  topRated: TopRated;
  __typename: string;
}
export interface SeasonsEntity {
  number: number;
  __typename: string;
}
export interface YearsEntityOrReleaseYear {
  year: number;
  __typename: string;
}
export interface TopRated {
  edges?: EdgesEntity5[] | null;
  __typename: string;
}
export interface EdgesEntity5 {
  node: Node3;
  __typename: string;
}
export interface Node3 {
  ratingsSummary: RatingsSummary2;
  __typename: string;
}
export interface RatingsSummary2 {
  aggregateRating: number;
  __typename: string;
}
export interface VideoStrip {
  edges?: EdgesEntity6[] | null;
  __typename: string;
}
export interface EdgesEntity6 {
  node: Node4;
  __typename: string;
}
export interface Node4 {
  id: string;
  contentType: ContentType1;
  name: DisplayNameOrTextOrName;
  runtime: Runtime1;
  thumbnail: ThumbnailOrPrimaryImage;
  __typename: string;
}
export interface ContentType1 {
  displayName: DisplayNameOrTextOrName;
  __typename: string;
}
export interface TitleMainImages {
  total: number;
  edges?: EdgesEntity7[] | null;
  __typename: string;
}
export interface EdgesEntity7 {
  node: PrimaryImageOrNode;
  __typename: string;
}
export interface Cast {
  edges?: EdgesEntity8[] | null;
  __typename: string;
}
export interface EdgesEntity8 {
  node: NodeOrCreditsEntity1;
  __typename: string;
}
export interface NodeOrCreditsEntity1 {
  name: Name2;
  attributes?: null;
  characters?: CharactersEntity[] | null;
  episodeCredits: EpisodeCredits;
  __typename: string;
}
export interface Name2 {
  id: string;
  nameText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  primaryImage: ThumbnailOrPrimaryImage;
  __typename: string;
}
export interface CharactersEntity {
  name: string;
  __typename: string;
}
export interface EpisodeCredits {
  total: number;
  yearRange: ReleaseYearOrYearRange;
  __typename: string;
}
export interface PrincipalCastEntity {
  credits?: NodeOrCreditsEntity1[] | null;
  __typename: string;
}
export interface CreatorsEntity {
  totalCredits: number;
  category: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  credits?: CreditsEntity[] | null;
  __typename: string;
}
export interface Trivia {
  edges?: EdgesEntity9[] | null;
  __typename: string;
}
export interface EdgesEntity9 {
  node: Node5;
  __typename: string;
}
export interface Node5 {
  text: TextOrCommentsEntityOrOriginalText;
  trademark?: null;
  relatedNames?: null;
  __typename: string;
}
export interface TextOrCommentsEntityOrOriginalText {
  plaidHtml: string;
  __typename: string;
}
export interface Goofs {
  edges?: null[] | null;
  __typename: string;
}
export interface Quotes {
  edges?: EdgesEntity10[] | null;
  __typename: string;
}
export interface EdgesEntity10 {
  node: Node6;
  __typename: string;
}
export interface Node6 {
  lines?: LinesEntity[] | null;
  __typename: string;
}
export interface LinesEntity {
  characters?: CharactersEntity1[] | null;
  text: string;
  stageDirection?: null;
  __typename: string;
}
export interface CharactersEntity1 {
  character: string;
  name: LanguageOrCountriesEntityOrEventOrNameOrPrimaryImageOrTitleType;
  __typename: string;
}
export interface CrazyCredits {
  edges?: EdgesEntity11[] | null;
  __typename: string;
}
export interface EdgesEntity11 {
  node: Node7;
  __typename: string;
}
export interface Node7 {
  text: TextOrCommentsEntityOrOriginalText;
  __typename: string;
}
export interface AlternateVersions {
  total: number;
  edges?: null[] | null;
  __typename: string;
}
export interface Connections {
  edges?: EdgesEntity12[] | null;
  __typename: string;
}
export interface EdgesEntity12 {
  node: Node8;
  __typename: string;
}
export interface Node8 {
  associatedTitle: AssociatedTitle;
  category: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  __typename: string;
}
export interface AssociatedTitle {
  id: string;
  releaseYear: YearsEntityOrReleaseYear;
  titleText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  originalTitleText: NodeOrNameTextOrCompanyTextOrTitleTextOrOriginalTitleTextOrCategory;
  series?: null;
  __typename: string;
}
export interface Soundtrack {
  edges?: EdgesEntity13[] | null;
  __typename: string;
}
export interface EdgesEntity13 {
  node: Node9;
  __typename: string;
}
export interface Node9 {
  text: string;
  comments?: TextOrCommentsEntityOrOriginalText[] | null;
  __typename: string;
}
export interface FeaturedReviews1 {
  edges?: EdgesEntity14[] | null;
  __typename: string;
}
export interface EdgesEntity14 {
  node: Node10;
  __typename: string;
}
export interface Node10 {
  id: string;
  author: Author1;
  summary: Summary;
  text: Text1;
  authorRating: number;
  submissionDate: string;
  helpfulness: Helpfulness;
  __typename: string;
}
export interface Author1 {
  nickName: string;
  userId: string;
  __typename: string;
}
export interface Text1 {
  originalText: TextOrCommentsEntityOrOriginalText;
  __typename: string;
}
export interface Helpfulness {
  upVotes: number;
  downVotes: number;
  __typename: string;
}
export interface Faqs {
  edges?: EdgesEntity15[] | null;
  __typename: string;
}
export interface EdgesEntity15 {
  node: Node11;
  __typename: string;
}
export interface Node11 {
  id: string;
  question: CaptionOrPlotTextOrOriginalTextOrQuestion;
  __typename: string;
}
export interface ReleaseDate1 {
  day: number;
  month: number;
  year: number;
  country: StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity;
  __typename: string;
}
export interface CountriesOfOrigin1 {
  countries?:
    | StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity[]
    | null;
  __typename: string;
}
export interface DetailsExternalLinks {
  edges?: EdgesEntity16[] | null;
  total: number;
  __typename: string;
}
export interface EdgesEntity16 {
  node: Node12;
  __typename: string;
}
export interface Node12 {
  url: string;
  label: string;
  externalLinkRegion?: null;
  __typename: string;
}
export interface SpokenLanguages {
  spokenLanguages?:
    | StatusOrCurrentProductionStageOrGenresEntityOrCategoryOrCountryOrCountriesEntityOrSpokenLanguagesEntity[]
    | null;
  __typename: string;
}
export interface Akas {
  edges?: EdgesEntity1[] | null;
  __typename: string;
}
export interface TechnicalSpecifications {
  soundMixes: SoundMixes;
  aspectRatios: AspectRatios;
  colorations: Colorations;
  __typename: string;
}
export interface SoundMixes {
  items?: ItemsEntity[] | null;
  __typename: string;
}
export interface ItemsEntity {
  id: string;
  text: string;
  attributes?: null[] | null;
  __typename: string;
}
export interface AspectRatios {
  items?: ItemsEntity1[] | null;
  __typename: string;
}
export interface ItemsEntity1 {
  aspectRatio: string;
  attributes?: null[] | null;
  __typename: string;
}
export interface Colorations {
  items?: ItemsEntity2[] | null;
  __typename: string;
}
export interface ItemsEntity2 {
  conceptId: string;
  text: string;
  attributes?: null[] | null;
  __typename: string;
}
export interface ContributionQuestions {
  contributionLink: PlotContributionLinkOrContributionLinkOrImageUploadLinkOrIframeAddReviewLink;
  edges?: null[] | null;
  __typename: string;
}
