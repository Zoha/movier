import { PersonFilmographyData } from "./../externalInterfaces/IMDBPersonFilmographyDataInterface";
import dayjs from "dayjs";
import { IPersonalDetailItem } from "../interfaces";
import { ImageType, IMDBPathType, Source, TitleMainType } from "../enums";
import { load as loadCheerio, CheerioAPI, Cheerio, Element } from "cheerio";
import { Language } from "../enums";
import {
  IPerson,
  IPersonDetailsResolver,
  ISourceDetails,
  IFilmographyItem,
  IImageDetails,
  IKnownForItem,
} from "../interfaces";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";
import { formatHTMLText } from "../utils/formatHTMLText";
import { stripHTMLText } from "../utils/stripHTMLText";
import { convertIMDBPathToIMDBUrl } from "../utils/convertIMDBPathToIMDBUrl";
import { getIMDBFullSizeImageFromThumbnailUrl } from "../utils/getIMDBFullSizeImageFromThumbnailUrl";
import { getRequest, graphqlRequest } from "../requestClient";
import { PersonDetailsNextData } from "../externalInterfaces/IMDBPersonNextDataInterface";
import { IMDB_API_BASE_URL } from "../constants";
import { convertIMDBTitleIdToUrl } from "../utils/convertIMDBTitleIdToUrl";

export class IMDBPersonDetailsResolver implements IPersonDetailsResolver {
  private url: string;
  private resolverCacheManager = new ResolverCacheManager();
  private mainPageHTMLData!: string;
  private bioPageHTMLData!: string;
  private mediaIndexPageHTMLData!: string;

  // cheerio loaded instances
  private mainPageCheerio!: CheerioAPI;
  private bioPageCheerio!: CheerioAPI;
  private mediaIndexPageCheerio!: CheerioAPI;

  private mainPageNextData: PersonDetailsNextData = {};
  private filmographyData: PersonFilmographyData = {};

  constructor(url: string) {
    this.url = url;
  }

  async getDetails(): Promise<IPerson | undefined> {
    await Promise.all([
      this.getMainPageHTMLData(),
      this.getFilmographyData(),
      this.getBioPageHTMLData(),
      this.getMediaIndexPageHTMLData(),
    ]);
    return this.generateReturnDetailsData();
  }

  async getMainPageHTMLData() {
    const apiResult = await getRequest(this.url);
    this.mainPageHTMLData = apiResult.data;
    this.mainPageCheerio = loadCheerio(apiResult.data);
    const nextDataString =
      this.mainPageCheerio("#__NEXT_DATA__")?.html()?.trim() || "{}";

    this.mainPageNextData = JSON.parse(nextDataString);
  }

  async getBioPageHTMLData() {
    const url = this.addToPathOfUrl(this.url, "/bio");
    const apiResult = await getRequest(url);
    this.bioPageHTMLData = apiResult.data;
    this.bioPageCheerio = loadCheerio(apiResult.data);
  }

  async getMediaIndexPageHTMLData() {
    const url = this.addToPathOfUrl(this.url, "/mediaindex");
    const apiResult = await getRequest(url);
    this.mediaIndexPageHTMLData = apiResult.data;
    this.mediaIndexPageCheerio = loadCheerio(apiResult.data);
  }

  async getFilmographyData() {
    const apiResult = await graphqlRequest(IMDB_API_BASE_URL, {
      operationName: "Filmography",
      variables: { id: this.sourceId },
      query:
        'query Filmography ($id : ID!) { \n name (id : $id) { \n credits (first : 5000 , filter : { excludeCategories : ["self" , "archive_footage"]} ) { \n total, \n edges { \n node {  \n title { \n id \n originalTitleText { \n text \n } \n primaryImage { \n url, \n width, \n height, \n caption { \n plainText \n } \n } \n releaseYear { \n year \n endYear \n }, \n genres { \n genres { \n text \n } \n } \n productionStatus { \n currentProductionStage { \n id \n } \n } \n } \n category { \n text, \n } \n ...on Cast { \n characters { \n name \n }, \n episodeCredits (last: 1000) { \n total \n yearRange { \n endYear, \n year \n } \n edges { \n node { \n title { \n id \n originalTitleText { \n text \n } \n releaseYear { \n year \n } \n series { \n displayableEpisodeNumber { \n displayableSeason { \n text \n } \n episodeNumber { \n text \n } \n } \n } \n } \n } \n } \n } \n }, \n attributes { \n text \n } \n } \n  \n } \n pageInfo { \n hasNextPage \n } \n } \n } \n}',
    });
    this.filmographyData = apiResult.data as PersonFilmographyData;
  }

  addToPathOfUrl(
    originalPath: string,
    joinPath: string,
    query: { [key: string]: string } = {}
  ): string {
    const urlInstance = new URL(originalPath);
    urlInstance.pathname = urlInstance.pathname.replace(/\/$/, "") + joinPath;
    Object.keys(query).forEach((key) => {
      urlInstance.searchParams.set(key, query[key]);
    });
    return urlInstance.href;
  }

  generateReturnDetailsData(): IPerson | undefined {
    const result: IPerson = {
      detailsLang: Language.English,
      mainSource: this.mainSourceDetails,
      name: this.name,
      miniBio: this.miniBio,
      knownFor: this.knownFor,
      filmography: this.filmography, // TODO:
      profileImage: this.profileImage,
      allImages: this.allImages,
      personalDetails: this.personalDetails,
      birthDate: this.birthDate,
      birthPlace: this.birthPlace,
      deathDate: this.deathDate,
      deathPlace: this.deathPlace,
    };
    return result;
  }

  get mainSourceDetails(): ISourceDetails {
    const cacheDataManager =
      this.resolverCacheManager.load("mainSourceDetails");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as ISourceDetails;
    }
    return cacheDataManager.cacheAndReturnData({
      sourceId: this.sourceId,
      sourceType: Source.IMDB,
      sourceUrl: this.url,
    });
  }

  get sourceId(): string {
    const cacheDataManager = this.resolverCacheManager.load("sourceId");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    return cacheDataManager.cacheAndReturnData(
      extractIMDBIdFromUrl(this.url, "nm")
    );
  }

  get name(): string {
    const cacheDataManager = this.resolverCacheManager.load("name");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const name = formatHTMLText(
      this.mainPageNextData.props?.pageProps?.aboveTheFold?.nameText?.text
    );

    return cacheDataManager.cacheAndReturnData(name);
  }

  get miniBio(): string[] {
    const cacheDataManager = this.resolverCacheManager.load("miniBio");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string[];
    }
    const $ = this.bioPageCheerio;
    const miniBioFullHTML =
      $("a[name='mini_bio']")
        .next("h4")
        .next(".soda")
        .find("p")
        .first()
        .html() ?? "";
    const miniBio = miniBioFullHTML
      .split(/<br><br>/)
      .map((t) => stripHTMLText(t.trim()));

    return cacheDataManager.cacheAndReturnData(miniBio);
  }

  get knownFor(): IKnownForItem[] {
    const cacheDataManager = this.resolverCacheManager.load("knownFor");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IKnownForItem[];
    }

    const knownForItems: IKnownForItem[] = [];
    const $ = this.mainPageCheerio;
    const knownForContainerElements = $(
      "[data-testid='nm_flmg_kwn_for'] .ipc-list-card--span"
    );
    knownForContainerElements.each((i, el) => {
      const years = $(el)
        .find(
          ".ipc-primary-image-list-card__content-bottom .ipc-primary-image-list-card__secondary-text"
        )
        .text()
        .trim()
        .split(" ")[0]
        .split("–")
        .map(Number);
      const thumbnailImgEl = $(el).find("img").first();
      knownForItems.push({
        name: formatHTMLText(
          $(el).find(".ipc-primary-image-list-card__title").first().text()
        ),
        role: formatHTMLText(
          $(el)
            .find(
              ".ipc-primary-image-list-card__content-mid-bottom .ipc-primary-image-list-card__secondary-text"
            )
            .first()
            .text()
        ),
        startYear: years[0],
        endYear: years[1] ?? years[0],
        posterImage: this.extractImageFullDetailsFromImgElement(thumbnailImgEl),
        source: this.extractSourceDetailsFromAElement(
          $(el).find("a.ipc-lockup-overlay").first(),
          "tt"
        ),
      });
    });

    return cacheDataManager.cacheAndReturnData(knownForItems);
  }

  extractImageFullDetailsFromImgElement(
    thumbnailImgEl: Cheerio<Element>,
    type = ImageType.Poster
  ): IImageDetails {
    const thumbnailUrl = thumbnailImgEl.attr("src");

    return {
      isThumbnail: false,
      sourceType: Source.IMDB,
      title: thumbnailImgEl.attr("alt") ?? "",
      type: type,
      url: getIMDBFullSizeImageFromThumbnailUrl(thumbnailUrl),
      thumbnails: [
        {
          isThumbnail: true,
          sourceType: Source.IMDB,
          title: thumbnailImgEl.attr("alt") ?? "",
          type: type,
          url: thumbnailUrl ?? "",
          size: {
            width: Number(thumbnailImgEl.attr("width")) || 0,
            height: Number(thumbnailImgEl.attr("height")) || 0,
          },
        },
      ],
    };
  }

  extractSourceDetailsFromAElement(
    aElement: Cheerio<Element>,
    sourceIdPrefix: string
  ): ISourceDetails {
    const sourceUrl = convertIMDBPathToIMDBUrl(aElement.attr("href"));
    return {
      sourceType: Source.IMDB,
      sourceUrl,
      sourceId: extractIMDBIdFromUrl(sourceUrl, sourceIdPrefix),
    };
  }

  get filmography(): IFilmographyItem[] {
    const cacheDataManager = this.resolverCacheManager.load("filmography");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IFilmographyItem[];
    }

    let filmographyItems: IFilmographyItem[] = [];
    filmographyItems =
      this.filmographyData?.name?.credits?.edges?.map(
        (credit): IFilmographyItem => {
          const startYear =
            credit.node?.episodeCredits?.yearRange?.year ??
            credit.node?.title?.releaseYear?.year ??
            0;
          return {
            category: credit.node?.category?.text?.toLocaleLowerCase() ?? "",
            endYear:
              credit.node?.episodeCredits?.yearRange?.endYear ?? startYear,
            name: credit.node?.title?.originalTitleText?.text ?? "",
            productionStatus:
              credit.node?.title?.productionStatus?.currentProductionStage
                ?.id ?? "",
            roles: credit.node?.characters?.map((i) => i.name ?? "") ?? [],
            source: {
              sourceId: credit.node?.title?.id ?? "",
              sourceType: Source.IMDB,
              sourceUrl: convertIMDBTitleIdToUrl(
                credit.node?.title?.id ?? "",
                IMDBPathType.Title
              ),
            },
            startYear,
            type: TitleMainType.Movie,
          };
        }
      ) ?? [];

    return cacheDataManager.cacheAndReturnData(filmographyItems);
  }

  get profileImage(): IImageDetails | undefined {
    const cacheDataManager = this.resolverCacheManager.load("profileImage");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IImageDetails;
    }
    const $ = this.bioPageCheerio;
    const imgElement = $(".poster").first();
    if (!imgElement.length) {
      return;
    }
    const imageDetails = this.extractImageFullDetailsFromImgElement(
      imgElement,
      ImageType.ProfileImage
    );

    return cacheDataManager.cacheAndReturnData(imageDetails);
  }

  get allImages(): IImageDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("allImages");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IImageDetails[];
    }
    const $ = this.mediaIndexPageCheerio;
    const images: IImageDetails[] = [];
    $("#media_index_thumbnail_grid a img").each((i, el) => {
      images.push(
        this.extractImageFullDetailsFromImgElement($(el), ImageType.Other)
      );
    });

    return cacheDataManager.cacheAndReturnData(images);
  }

  get personalDetails(): IPersonalDetailItem[] {
    const cacheDataManager = this.resolverCacheManager.load("personalDetails");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IPersonalDetailItem[];
    }
    const $ = this.bioPageCheerio;
    const personalDetails: IPersonalDetailItem[] = [];
    const extractDetailsFromTableRow = (trEl: Element) => {
      const a = $(trEl).find("td:eq(1)").find("a").first();
      const aUrl = a.attr("href");
      personalDetails.push({
        title: formatHTMLText($(trEl).find("td:eq(0)").text(), {
          toLowerCase: true,
        }),
        details: formatHTMLText(
          $(trEl)
            .find("td:eq(1)")
            .text()
            .replace(/\s{2,}/g, " ")
        ),
        relatedSources: aUrl?.startsWith("/name/nm")
          ? [this.extractSourceDetailsFromAElement(a, "nm")]
          : [],
      });
    };
    $("a[name='overview']")
      .next("h4")
      .next("table")
      .find("tr")
      .each((i, trEl) => extractDetailsFromTableRow(trEl));
    $("a[name='family']")
      .next("h4")
      .next("table")
      .find("tr")
      .each((i, trEl) => extractDetailsFromTableRow(trEl));

    return cacheDataManager.cacheAndReturnData(personalDetails);
  }

  get birthDate(): Date | undefined {
    const cacheDataManager = this.resolverCacheManager.load("birthDate");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as Date;
    }
    const birthDateRaw =
      this.mainPageNextData?.props?.pageProps?.mainColumnData?.birthDate
        ?.dateComponents;
    const birthDate = dayjs(
      `${birthDateRaw?.year}-${birthDateRaw?.month}-${birthDateRaw?.day}`,
      "YYYY-M-D"
    ).toDate();
    return cacheDataManager.cacheAndReturnData(birthDate);
  }

  get birthPlace(): string | undefined {
    const cacheDataManager = this.resolverCacheManager.load("birthPlace");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const birthPlace =
      this.mainPageNextData?.props?.pageProps?.mainColumnData?.birthLocation
        ?.text ?? "";
    if (!birthPlace.length) {
      return;
    }

    return cacheDataManager.cacheAndReturnData(formatHTMLText(birthPlace));
  }

  get deathDate(): Date | undefined {
    const cacheDataManager = this.resolverCacheManager.load("deathDate");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as Date;
    }
    const deathDateRaw =
      this.mainPageNextData?.props?.pageProps?.mainColumnData?.deathDate
        ?.dateComponents;
    if (!deathDateRaw) {
      return;
    }
    const deathDate = dayjs(
      `${deathDateRaw.year}-${deathDateRaw.month}-${deathDateRaw.day}`,
      "YYYY-M-D"
    ).toDate();

    return cacheDataManager.cacheAndReturnData(deathDate);
  }

  get deathPlace(): string | undefined {
    const cacheDataManager = this.resolverCacheManager.load("deathPlace");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const deathLocation =
      this.mainPageNextData?.props?.pageProps?.mainColumnData?.deathLocation
        ?.text ?? "";
    if (!deathLocation.length) {
      return;
    }

    return cacheDataManager.cacheAndReturnData(formatHTMLText(deathLocation));
  }
}
