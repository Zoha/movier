export interface PersonFilmographyData {
  name?: Name;
}

export interface Name {
  credits?: Credits;
}

export interface Credits {
  total?: number;
  edges?: CreditsEdge[];
  pageInfo?: PageInfo;
}

export interface CreditsEdge {
  node?: PurpleNode;
}

export interface PurpleNode {
  title?: FluffyTitle;
  category?: Category;
  characters?: Character[];
  episodeCredits?: EpisodeCredits;
  attributes?: Category[] | null;
}

export interface Category {
  text?: string;
}

export interface Character {
  name?: string;
}

export interface EpisodeCredits {
  total?: number;
  yearRange?: YearRange | null;
  edges?: EpisodeCreditsEdge[];
}

export interface EpisodeCreditsEdge {
  node?: FluffyNode;
}

export interface FluffyNode {
  title?: PurpleTitle;
}

export interface PurpleTitle {
  id?: string;
  originalTitleText?: Category;
  releaseYear?: ReleaseYear | null;
  series?: Series;
}

export interface ReleaseYear {
  year?: number;
}

export interface Series {
  displayableEpisodeNumber?: DisplayableEpisodeNumber;
}

export interface DisplayableEpisodeNumber {
  displayableSeason?: Category;
  episodeNumber?: Category;
}

export interface YearRange {
  year?: number;
  endYear?: number | null;
}

export interface FluffyTitle {
  id?: string;
  originalTitleText?: Category;
  primaryImage?: PrimaryImage | null;
  releaseYear?: YearRange | null;
  genres?: Genres;
  productionStatus?: ProductionStatus;
}

export interface Genres {
  genres?: Category[];
}

export interface PrimaryImage {
  url?: string;
  width?: number;
  height?: number;
  caption?: Caption;
}

export interface Caption {
  plainText?: string;
}

export interface ProductionStatus {
  currentProductionStage?: CurrentProductionStage;
}

export interface CurrentProductionStage {
  id?: ID;
}

export enum ID {
  PostProduction = "post_production",
  PreProduction = "pre_production",
  Released = "released",
}

export interface PageInfo {
  hasNextPage?: boolean;
}
