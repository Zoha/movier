import {
  ITitleDetailsResolverOptions,
  ITitleGoofItem,
  ITitleKey,
  ITitleQuoteItem,
  ITitleQuoteLineItemDetails,
} from "./../interfaces";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";
import { load as loadCheerio, Cheerio, CheerioAPI, Element } from "cheerio";
import {
  AwardOutcome,
  Genre,
  ImageType,
  Language,
  Source,
  TitleMainType,
} from "../enums";
import {
  ICastDetails,
  IPersonDetails,
  IRateDetails,
  IRoleDetails,
  ISourceDetails,
  ITitle,
  ITitleDetailsResolver,
  IRateAndVotesCount,
  IRateDetailsForSpecificAge,
  IDatesDetails,
  IReleaseDateDetails,
  IImageDetails,
  IBoxOfficeDetails,
  IProductionCompanyDetails,
  IRuntimeDetails,
  IAwardDetails,
  IAwardsSummaryDetails,
  EpisodeCreditsDetails,
} from "../interfaces";
import { camelCase } from "change-case";
import { formatHTMLText } from "../utils/formatHTMLText";
import { convertIMDBPathToIMDBUrl } from "../utils/convertIMDBPathToIMDBUrl";
import dayjs from "dayjs";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";
import { IMDBNextData } from "../externalInterfaces/IMDBNextDataInterface";
import { getIMDBFullSizeImageFromThumbnailUrl } from "../utils/getIMDBFullSizeImageFromThumbnailUrl";
import { getRequest } from "../requestClient";

type HttpRequestKey =
  | "mainPage"
  | "releaseInfo"
  | "fullCredits"
  | "ratings"
  | "companyCredits"
  | "taglines"
  | "posterImages"
  | "stillFrameImages"
  | "awards"
  | "quotes"
  | "goofs"
  | "criticReviews";

export const titleKeys = new Set<ITitleKey>([
  "detailsLang",
  "mainSource",
  "allSources",
  "name",
  "worldWideName",
  "otherNames",
  "titleYear",
  "genres",
  "directors",
  "writers",
  "mainType",
  "plot",
  "casts",
  "producers",
  "mainRate",
  "allRates",
  "dates",
  "allReleaseDates",
  "ageCategoryTitle",
  "languages",
  "countriesOfOrigin",
  "posterImage",
  "allImages",
  "boxOffice",
  "productionCompanies",
  "taglines",
  "runtime",
  "keywords",
  "awards",
  "awardsSummary",
  "quotes",
  "goofs",
]);

export class IMDBTitleDetailsResolver implements ITitleDetailsResolver {
  private url: string;
  private resolverCacheManager = new ResolverCacheManager();
  public httpRequests = new Set<HttpRequestKey>();

  private _mainPageHTMLData: string = "";
  private _releaseInfoPageHTMLData: string = "";
  private _fullCreditsPageHTMLData: string = "";
  private _ratingsPageHTMLData: string = "";
  private _companyCreditsPageHTMLData: string = "";
  private _taglinesPageHTMLData: string = "";
  private _posterImagesFirstPageHTMLData: string = "";
  private _stillFrameImagesFirstPageHTMLData: string = "";
  private _awardsPageHTMLData: string = "";
  private _quotesPageHTMLData: string = "";
  private _goofsPageHTMLData: string = "";
  private _criticReviewsPageHTMLData: string = "";

  // cheerio loaded instances
  private _mainPageCheerio: CheerioAPI = loadCheerio("");
  private _releaseInfoPageCheerio: CheerioAPI = loadCheerio("");
  private _fullCreditsPageCheerio: CheerioAPI = loadCheerio("");
  private _ratingsPageCheerio: CheerioAPI = loadCheerio("");
  private _companyCreditsPageCheerio: CheerioAPI = loadCheerio("");
  private _taglinesPageCheerio: CheerioAPI = loadCheerio("");
  private _posterImagesFirstPageCheerio: CheerioAPI = loadCheerio("");
  private _stillFrameImagesFirstPageCheerio: CheerioAPI = loadCheerio("");
  private _awardsPageCheerio: CheerioAPI = loadCheerio("");
  private _quotesPageCheerio: CheerioAPI = loadCheerio("");
  private _goofsPageCheerio: CheerioAPI = loadCheerio("");
  private _criticReviewsPageCheerio: CheerioAPI = loadCheerio("");

  private _mainPageNextData: IMDBNextData = {};

  private get mainPageNextData(): IMDBNextData {
    this.httpRequests.add("mainPage");
    return this._mainPageNextData;
  }

  private get mainPageHTMLData(): string {
    this.httpRequests.add("mainPage");
    return this._mainPageHTMLData;
  }
  private get releaseInfoPageHTMLData(): string {
    this.httpRequests.add("releaseInfo");
    return this._releaseInfoPageHTMLData;
  }
  private get fullCreditsPageHTMLData(): string {
    this.httpRequests.add("fullCredits");
    return this._fullCreditsPageHTMLData;
  }
  private get ratingsPageHTMLData(): string {
    this.httpRequests.add("ratings");
    return this._ratingsPageHTMLData;
  }
  private get companyCreditsPageHTMLData(): string {
    this.httpRequests.add("companyCredits");
    return this._companyCreditsPageHTMLData;
  }
  private get taglinesPageHTMLData(): string {
    this.httpRequests.add("taglines");
    return this._taglinesPageHTMLData;
  }
  private get posterImagesFirstPageHTMLData(): string {
    this.httpRequests.add("posterImages");
    return this._posterImagesFirstPageHTMLData;
  }
  private get stillFrameImagesFirstPageHTMLData(): string {
    this.httpRequests.add("stillFrameImages");
    return this._stillFrameImagesFirstPageHTMLData;
  }
  private get awardsPageHTMLData(): string {
    this.httpRequests.add("awards");
    return this._awardsPageHTMLData;
  }
  private get quotesPageHTMLData(): string {
    this.httpRequests.add("quotes");
    return this._quotesPageHTMLData;
  }
  private get goofsPageHTMLData(): string {
    this.httpRequests.add("goofs");
    return this._goofsPageHTMLData;
  }
  private get criticReviewsPageHTMLData(): string {
    this.httpRequests.add("criticReviews");
    return this._criticReviewsPageHTMLData;
  }

  private get mainPageCheerio(): CheerioAPI {
    this.httpRequests.add("mainPage");
    return this._mainPageCheerio;
  }
  private get releaseInfoPageCheerio(): CheerioAPI {
    this.httpRequests.add("releaseInfo");
    return this._releaseInfoPageCheerio;
  }
  private get fullCreditsPageCheerio(): CheerioAPI {
    this.httpRequests.add("fullCredits");
    return this._fullCreditsPageCheerio;
  }
  private get ratingsPageCheerio(): CheerioAPI {
    this.httpRequests.add("ratings");
    return this._ratingsPageCheerio;
  }
  private get companyCreditsPageCheerio(): CheerioAPI {
    this.httpRequests.add("companyCredits");
    return this._companyCreditsPageCheerio;
  }
  private get taglinesPageCheerio(): CheerioAPI {
    this.httpRequests.add("taglines");
    return this._taglinesPageCheerio;
  }
  private get posterImagesFirstPageCheerio(): CheerioAPI {
    this.httpRequests.add("posterImages");
    return this._posterImagesFirstPageCheerio;
  }
  private get stillFrameImagesFirstPageCheerio(): CheerioAPI {
    this.httpRequests.add("stillFrameImages");
    return this._stillFrameImagesFirstPageCheerio;
  }
  private get awardsPageCheerio(): CheerioAPI {
    this.httpRequests.add("awards");
    return this._awardsPageCheerio;
  }
  private get quotesPageCheerio(): CheerioAPI {
    this.httpRequests.add("quotes");
    return this._quotesPageCheerio;
  }
  private get goofsPageCheerio(): CheerioAPI {
    this.httpRequests.add("goofs");
    return this._goofsPageCheerio;
  }
  private get criticReviewsPageCheerio(): CheerioAPI {
    this.httpRequests.add("criticReviews");
    return this._criticReviewsPageCheerio;
  }

  constructor(url: string) {
    this.url = url;
  }

  async getDetails(opts?: ITitleDetailsResolverOptions): Promise<ITitle> {
    // Access all fields to return, which will populate `this.httpRequests`
    // with the minimum number of required HTTP requests. This is essentially
    // a no-op in order to tell based on data-access which HTTP requests are
    // required depending on the selections in `opts`.
    this.resolverCacheManager = new ResolverCacheManager();
    await this.generateReturnDetailsData(opts);
    this.resolverCacheManager = new ResolverCacheManager();

    // load any required HTTP requests
    await Promise.all(
      [
        this.httpRequests.has("mainPage") && this.getMainPageHTMLData(),
        this.httpRequests.has("releaseInfo") &&
          this.getReleaseInfoPageHTMLData(),
        this.httpRequests.has("fullCredits") &&
          this.getFullCreditsPageHTMLData(),
        this.httpRequests.has("ratings") && this.getRatingsPageHTMLData(),
        this.httpRequests.has("companyCredits") &&
          this.getCompanyCreditsPageHTMLData(),
        this.httpRequests.has("taglines") && this.getTaglinesPageHTMLData(),
        this.httpRequests.has("posterImages") &&
          this.getPosterImagesFirstPageHTMLData(),
        this.httpRequests.has("stillFrameImages") &&
          this.getStillFrameImagesFirstPageHTMLData(),
        this.httpRequests.has("awards") && this.getAwardsPageHTMLData(),
        this.httpRequests.has("criticReviews") &&
          this.getCriticReviewsHTMLData(),
        this.httpRequests.has("quotes") && this.getQuotesPageHTMLData(),
        this.httpRequests.has("goofs") && this.getGoofsPageHTMLData(),
      ].filter(Boolean)
    );

    // Return the actual resolved data
    return this.generateReturnDetailsData(opts);
  }

  async getMainPageHTMLData() {
    const apiResult = await getRequest(this.url);
    this._mainPageHTMLData = apiResult.data;
    this._mainPageCheerio = loadCheerio(this.mainPageHTMLData);
    const nextDataString =
      this.mainPageCheerio("#__NEXT_DATA__")?.html()?.trim() || "{}";

    this._mainPageNextData = JSON.parse(nextDataString);
  }

  async getReleaseInfoPageHTMLData() {
    const releaseInfoPageUrl = this.addToPathOfUrl(this.url, "/releaseinfo");
    const apiResult = await getRequest(releaseInfoPageUrl);
    this._releaseInfoPageHTMLData = apiResult.data;
    this._releaseInfoPageCheerio = loadCheerio(this.releaseInfoPageHTMLData);
  }

  async getFullCreditsPageHTMLData() {
    const fullCreditsPageUrl = this.addToPathOfUrl(this.url, "/fullcredits");
    const apiResult = await getRequest(fullCreditsPageUrl);
    this._fullCreditsPageHTMLData = apiResult.data;
    this._fullCreditsPageCheerio = loadCheerio(this.fullCreditsPageHTMLData);
  }

  async getRatingsPageHTMLData() {
    const ratingsPageUrl = this.addToPathOfUrl(this.url, "/ratings");
    const apiResult = await getRequest(ratingsPageUrl);
    this._ratingsPageHTMLData = apiResult.data;
    this._ratingsPageCheerio = loadCheerio(this.ratingsPageHTMLData);
  }

  async getTaglinesPageHTMLData() {
    const taglinesPageUrl = this.addToPathOfUrl(this.url, "/taglines");
    const apiResult = await getRequest(taglinesPageUrl);
    this._taglinesPageHTMLData = apiResult.data;
    this._taglinesPageCheerio = loadCheerio(this.taglinesPageHTMLData);
  }

  async getCriticReviewsHTMLData() {
    const criticReviewsPageUrl = this.addToPathOfUrl(
      this.url,
      "/criticreviews"
    );
    const apiResult = await getRequest(criticReviewsPageUrl);
    this._criticReviewsPageHTMLData = apiResult.data;
    this._criticReviewsPageCheerio = loadCheerio(
      this.criticReviewsPageHTMLData
    );
  }

  async getCompanyCreditsPageHTMLData() {
    const companyCreditsPageUrl = this.addToPathOfUrl(
      this.url,
      "/companycredits"
    );
    const apiResult = await getRequest(companyCreditsPageUrl);
    this._companyCreditsPageHTMLData = apiResult.data;
    this._companyCreditsPageCheerio = loadCheerio(
      this.companyCreditsPageHTMLData
    );
  }

  async getPosterImagesFirstPageHTMLData() {
    const posterImagesFirstPageUrl = this.addToPathOfUrl(
      this.url,
      "/mediaindex",
      {
        refine: "poster",
      }
    );
    const apiResult = await getRequest(posterImagesFirstPageUrl);
    this._posterImagesFirstPageHTMLData = apiResult.data;
    this._posterImagesFirstPageCheerio = loadCheerio(
      this.posterImagesFirstPageHTMLData
    );
  }

  async getStillFrameImagesFirstPageHTMLData() {
    const stillFrameImagesFirstPageUrl = this.addToPathOfUrl(
      this.url,
      "/mediaindex",
      {
        refine: "still_frame",
      }
    );
    const apiResult = await getRequest(stillFrameImagesFirstPageUrl);
    this._stillFrameImagesFirstPageHTMLData = apiResult.data;
    this._stillFrameImagesFirstPageCheerio = loadCheerio(
      this.stillFrameImagesFirstPageHTMLData
    );
  }

  async getAwardsPageHTMLData() {
    const awardsPageUrl = this.addToPathOfUrl(this.url, "/awards");
    const apiResult = await getRequest(awardsPageUrl);
    this._awardsPageHTMLData = apiResult.data;
    this._awardsPageCheerio = loadCheerio(this.awardsPageHTMLData);
  }

  async getQuotesPageHTMLData() {
    const quotesPageUrl = this.addToPathOfUrl(this.url, "/quotes");
    const apiResult = await getRequest(quotesPageUrl);
    this._quotesPageHTMLData = apiResult.data;
    this._quotesPageCheerio = loadCheerio(this.quotesPageHTMLData);
  }

  async getGoofsPageHTMLData() {
    const goofsPageUrl = this.addToPathOfUrl(this.url, "/goofs");
    const apiResult = await getRequest(goofsPageUrl);
    this._goofsPageHTMLData = apiResult.data;
    this._goofsPageCheerio = loadCheerio(this.goofsPageHTMLData);
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

  async generateReturnDetailsData(
    opts?: ITitleDetailsResolverOptions
  ): Promise<ITitle> {
    const titleKeySelections = new Set<ITitleKey>();

    titleKeys.forEach((titleKey) => {
      if (!opts?.select || opts.select[titleKey as ITitleKey]) {
        titleKeySelections.add(titleKey);
      }
    });

    const res: Partial<ITitle> = {
      detailsLang: titleKeySelections.has("detailsLang")
        ? Language.English
        : undefined,
      mainSource: titleKeySelections.has("mainSource")
        ? this.mainSource
        : undefined,
      allSources: titleKeySelections.has("allSources")
        ? this.allSources
        : undefined,
      name: titleKeySelections.has("name") ? this.name : undefined,
      worldWideName: titleKeySelections.has("worldWideName")
        ? this.worldWideName
        : undefined,
      otherNames: titleKeySelections.has("otherNames")
        ? this.otherNames
        : undefined,
      titleYear: titleKeySelections.has("titleYear")
        ? this.titleYear
        : undefined,
      genres: titleKeySelections.has("genres") ? this.genres : undefined,
      directors: titleKeySelections.has("directors")
        ? this.directors
        : undefined,
      writers: titleKeySelections.has("writers") ? this.writers : undefined,
      mainType: titleKeySelections.has("mainType") ? this.mainType : undefined,
      plot: titleKeySelections.has("plot") ? this.plot : undefined,
      casts: titleKeySelections.has("casts") ? this.casts : undefined,
      producers: titleKeySelections.has("producers")
        ? this.producers
        : undefined,
      mainRate: titleKeySelections.has("mainRate") ? this.mainRate : undefined,
      allRates: titleKeySelections.has("allRates") ? this.allRates : undefined,
      allReleaseDates: titleKeySelections.has("allReleaseDates")
        ? this.allReleaseDates
        : undefined,
      dates: titleKeySelections.has("dates") ? this.dates : undefined,
      ageCategoryTitle: titleKeySelections.has("ageCategoryTitle")
        ? this.ageCategoryTitle
        : undefined,
      languages: titleKeySelections.has("languages")
        ? this.languages
        : undefined,
      countriesOfOrigin: titleKeySelections.has("countriesOfOrigin")
        ? this.countriesOfOrigin
        : undefined,
      posterImage: titleKeySelections.has("posterImage")
        ? this.posterImage
        : undefined,
      allImages: titleKeySelections.has("allImages")
        ? this.allImages
        : undefined,
      boxOffice: titleKeySelections.has("boxOffice")
        ? this.boxOffice
        : undefined,
      productionCompanies: titleKeySelections.has("productionCompanies")
        ? this.productionCompanies
        : undefined,
      taglines: titleKeySelections.has("taglines") ? this.taglines : undefined,
      runtime: titleKeySelections.has("runtime") ? this.runtime : undefined,
      keywords: titleKeySelections.has("keywords") ? this.keywords : undefined,
      awards: titleKeySelections.has("awards") ? this.awards : undefined,
      awardsSummary: titleKeySelections.has("awardsSummary")
        ? this.awardsSummary
        : undefined,
      quotes: titleKeySelections.has("quotes") ? this.quotes : undefined,
      goofs: titleKeySelections.has("goofs") ? this.goofs : undefined,
    };

    return res as ITitle;
  }

  get mainSource(): ISourceDetails {
    const cacheDataManager = this.resolverCacheManager.load("mainSource");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as ISourceDetails;
    }
    return cacheDataManager.cacheAndReturnData({
      sourceId: this.sourceId,
      sourceType: Source.IMDB,
      sourceUrl: this.url,
    });
  }

  get allSources(): ISourceDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("allSources");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as ISourceDetails[];
    }
    return cacheDataManager.cacheAndReturnData([this.mainSource]);
  }

  get sourceId(): string {
    const cacheDataManager = this.resolverCacheManager.load("sourceId");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    return cacheDataManager.cacheAndReturnData(
      extractIMDBIdFromUrl(this.url, "tt")
    );
  }

  get name(): string {
    const cacheDataManager = this.resolverCacheManager.load("name");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const nameInAllNamesList = this.allNames.find((i) =>
      i.title.toLowerCase().includes("original title")
    )?.name;

    if (!nameInAllNamesList) {
      return this.nameInMainPage;
    }
    return cacheDataManager.cacheAndReturnData(nameInAllNamesList);
  }

  get allNames(): Array<{ title: string; name: string }> {
    const cacheDataManager = this.resolverCacheManager.load("allNames");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as Array<{ title: string; name: string }>;
    }
    const $ = this.releaseInfoPageCheerio;
    const allNames: Array<{ title: string; name: string }> = [];
    const allNamesTrs = $("#akas").next("table").find("tr");
    allNamesTrs.each(function () {
      const $this = $(this);
      allNames.push({
        title: formatHTMLText($this.find("td").first().text()),
        name: formatHTMLText($this.find("td").last().text()),
      });
    });
    return cacheDataManager.cacheAndReturnData(allNames);
  }

  get otherNames(): string[] {
    const cacheDataManager = this.resolverCacheManager.load("otherNames");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string[];
    }
    return cacheDataManager.cacheAndReturnData(
      this.allNames
        .map((i) => i.name)
        // unique items
        // TODO: test that this is working
        .filter((v, i, arr) => arr.findIndex((fv) => fv === v) === i)
    );
  }

  get nameInMainPage(): string {
    const cacheDataManager = this.resolverCacheManager.load("nameInMainPage");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const $ = this.mainPageCheerio;
    return cacheDataManager.cacheAndReturnData(
      formatHTMLText($("h1").first().text())
    );
  }

  get worldWideName(): string {
    const cacheDataManager = this.resolverCacheManager.load("worldWideName");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    return cacheDataManager.cacheAndReturnData(
      formatHTMLText(
        this.allNames.find((i) => i.title.toLowerCase().includes("world-wide"))
          ?.name
      ) || this.name
    );
  }

  get titleYear(): number {
    const cacheDataManager = this.resolverCacheManager.load("titleYear");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as number;
    }
    const $ = this.releaseInfoPageCheerio;
    const yearText = $("#releaseinfo_content table tr")
      .eq(0)
      .find("td")
      .eq(1)
      .text()
      .slice(-4);
    return cacheDataManager.cacheAndReturnData(Number(yearText));
  }

  get genres(): Genre[] {
    const genresInNextData =
      this.mainPageNextData.props?.pageProps?.aboveTheFoldData?.genres?.genres?.map(
        (genre) => genre.text || ""
      ) || [];

    const genreEnumValues = Object.values(Genre);

    return genresInNextData
      .map((genre) => camelCase(genre))
      .filter((oGenre) => genreEnumValues.includes(oGenre as Genre)) as Genre[];
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

  extractPersonInfoFromTrsForSpecificSectionId(
    sectionId: string,
    extractor?: (
      el: Cheerio<Element>,
      index: number,
      extraData: {
        nameLinkEl: Cheerio<Element>;
        sourceUrl: string;
        source: ISourceDetails;
        name: string;
      }
    ) => Omit<IPersonDetails, "source" | "name">,
    {
      nameAElementSelector = ".name a",
      limitUntilFirstInvalidRow = true,
    }: {
      nameAElementSelector?: string;
      limitUntilFirstInvalidRow?: boolean;
    } = {}
  ): IPersonDetails[] {
    const $ = this.fullCreditsPageCheerio;
    const list: IPersonDetails[] = [];
    const resolverInstance = this;
    let limitReached = false;
    $(sectionId)
      .next("table")
      .find("tr")
      .each(function (index) {
        if (limitReached) {
          return;
        }
        const el = $(this);
        if (el.find("td").length < 2) {
          if (el.text().trim().length === 0) {
            return;
          }
          if (index > 0 && limitUntilFirstInvalidRow) {
            limitReached = true;
          }
          return; // if so, the row is for title (in cast)
        }
        const nameLinkEl = el.find(nameAElementSelector).first();
        const source = resolverInstance.extractSourceDetailsFromAElement(
          nameLinkEl,
          "nm"
        );
        const name = formatHTMLText(nameLinkEl.text());

        const extraData = {
          nameLinkEl,
          sourceUrl: source.sourceUrl,
          source,
          name,
        };
        list.push({
          source,
          name,
          ...(extractor ? extractor(el, index, extraData) : {}),
        });
      });
    return list;
  }

  get directors(): IPersonDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("directors");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IPersonDetails[];
    }
    // TODO: some other info for series episodes
    return cacheDataManager.cacheAndReturnData(
      this.extractPersonInfoFromTrsForSpecificSectionId("#director")
    );
  }

  get writers(): IPersonDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("writers");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IPersonDetails[];
    }
    return cacheDataManager.cacheAndReturnData(
      this.extractPersonInfoFromTrsForSpecificSectionId("#writer", (el) => {
        const extraInfo = formatHTMLText(el.find("td").eq(2).text());
        return { extraInfo };
      })
    );
  }

  get mainType(): TitleMainType {
    const cacheDataManager = this.resolverCacheManager.load("mainType");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as TitleMainType;
    }
    const $ = this.mainPageCheerio;
    const metaDataBoxText =
      $("[data-testid='hero-title-block__metadata'] li:first-child")
        .text()
        ?.toLowerCase() || "";

    // TODO: also handle short and tvMiniSeries
    const mainType = metaDataBoxText.includes("episode")
      ? TitleMainType.SeriesEpisode
      : metaDataBoxText.includes("series")
      ? TitleMainType.Series
      : metaDataBoxText.includes("tv special")
      ? TitleMainType.TVSpecial
      : metaDataBoxText.includes("video")
      ? TitleMainType.Video
      : metaDataBoxText.includes("tv movie")
      ? TitleMainType.TVMovie
      : metaDataBoxText.includes("tv short")
      ? TitleMainType.TVShort
      : TitleMainType.Movie;

    return cacheDataManager.cacheAndReturnData(mainType);
  }

  get plot(): string {
    const cacheDataManager = this.resolverCacheManager.load("plot");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const $ = this.mainPageCheerio;
    const plotText = $("[data-testid='plot-xl']").text();
    return cacheDataManager.cacheAndReturnData(formatHTMLText(plotText));
  }

  get casts(): ICastDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("cast");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as ICastDetails[];
    }
    const resolverInstance = this;

    const $ = this.fullCreditsPageCheerio;
    return cacheDataManager.cacheAndReturnData(
      this.extractPersonInfoFromTrsForSpecificSectionId(
        "#cast",
        (el, index, extData): Omit<ICastDetails, "name" | "source"> => {
          const roles: IRoleDetails[] = [];
          el.find("td")
            .eq(3)
            .find("a")
            .each(function () {
              const aEl = $(this);
              const isCharLink = /\/nm\d{4}/.test(aEl.attr("href") || "");
              if (!isCharLink) {
                return;
              }
              roles.push({
                source: resolverInstance.extractSourceDetailsFromAElement(
                  aEl,
                  "nm"
                ),
                name: formatHTMLText(aEl.text()),
              });
            });
          const secondTdText = el.find("td").eq(3).text();
          const [, asWho] = /\(as\s([^)]+)\)/.exec(secondTdText) || [];
          const otherNames = asWho ? [formatHTMLText(asWho)] : [];
          const thumbnailImageUrl = el
            .find("td:eq(0) img")
            .first()
            .attr("loadlate");
          let episodeCredits: EpisodeCreditsDetails | null = null;
          if (this.mainType === TitleMainType.Series) {
            // find name episode credits
            const charDetailsInNextData =
              this.mainPageNextData.props?.pageProps?.mainColumnData?.cast?.edges?.find(
                (c) => c.node?.name?.id === extData.source.sourceId
              )?.node?.episodeCredits;
            if (charDetailsInNextData) {
              episodeCredits = {
                startYear: charDetailsInNextData.yearRange?.year ?? 0,
                endYear: charDetailsInNextData.yearRange?.endYear ?? 0,
                totalEpisodes: charDetailsInNextData.total ?? 0,
              };
            }
          }
          return {
            otherNames,
            roles,
            thumbnailImageUrl,
            ...(episodeCredits ? { episodeCredits } : {}),
          };
        },
        {
          nameAElementSelector: "td:eq(1) a:eq(0)",
        }
      ) as ICastDetails[]
    );
  }

  get producers(): IPersonDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("producers");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IPersonDetails[];
    }
    return cacheDataManager.cacheAndReturnData(
      this.extractPersonInfoFromTrsForSpecificSectionId("#producer", (el) => {
        const extraInfo = formatHTMLText(el.find("td").eq(2).text());
        return { extraInfo };
      })
    );
  }

  get mainRate(): IRateDetails {
    const cacheDataManager = this.resolverCacheManager.load("mainRate");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IRateDetails;
    }
    const $ = this.ratingsPageCheerio;
    const assortedByGenderTrs = $("td.ratingTable")
      .first()
      .parentsUntil("table")
      .find("tr");
    const allGendersTds = assortedByGenderTrs.eq(1).find("td");
    const maleTds = assortedByGenderTrs.eq(2).find("td");
    const femaleTds = assortedByGenderTrs.eq(3).find("td");
    const resolverInstance = this;

    const getRateAndVotesCountFromTd = (
      tdEl: Cheerio<Element>
    ): IRateAndVotesCount => {
      return {
        rate: this.convertDividedHTMLTextToNumber(
          tdEl.find(".bigcell").first().text()
        ),
        votesCount: this.convertDividedHTMLTextToNumber(
          tdEl.find(".smallcell a").first().text()
        ),
      };
    };

    const assortedByRateList: IRateDetailsForSpecificAge[] = [];
    $("table")
      .first()
      .find("tr")
      .slice(1)
      .each(function () {
        assortedByRateList.push({
          rate: resolverInstance.convertDividedHTMLTextToNumber(
            $(this).find("td:eq(0) .rightAligned").first().text()
          ),
          votesCount: resolverInstance.convertDividedHTMLTextToNumber(
            $(this).find("td:eq(2) .leftAligned").first().text()
          ),
          percent: resolverInstance.convertDividedHTMLTextToNumber(
            $(this)
              .find("td:eq(1) .topAligned")
              .first()
              .text()
              .replace(/"/g, "")
          ),
        });
      });

    return cacheDataManager.cacheAndReturnData({
      rate: getRateAndVotesCountFromTd(allGendersTds.eq(1)).rate,
      votesCount: getRateAndVotesCountFromTd(allGendersTds.eq(1)).votesCount,
      rateSource: Source.IMDB,
      assortedByGender: {
        allGenders: {
          allAges: getRateAndVotesCountFromTd(allGendersTds.eq(1)),
          under18: getRateAndVotesCountFromTd(allGendersTds.eq(2)),
          between18And29: getRateAndVotesCountFromTd(allGendersTds.eq(3)),
          between30And44: getRateAndVotesCountFromTd(allGendersTds.eq(4)),
          over44: getRateAndVotesCountFromTd(allGendersTds.eq(5)),
        },
        male: {
          allAges: getRateAndVotesCountFromTd(maleTds.eq(1)),
          under18: getRateAndVotesCountFromTd(maleTds.eq(2)),
          between18And29: getRateAndVotesCountFromTd(maleTds.eq(3)),
          between30And44: getRateAndVotesCountFromTd(maleTds.eq(4)),
          over44: getRateAndVotesCountFromTd(maleTds.eq(5)),
        },
        female: {
          allAges: getRateAndVotesCountFromTd(femaleTds.eq(1)),
          under18: getRateAndVotesCountFromTd(femaleTds.eq(2)),
          between18And29: getRateAndVotesCountFromTd(femaleTds.eq(3)),
          between30And44: getRateAndVotesCountFromTd(femaleTds.eq(4)),
          over44: getRateAndVotesCountFromTd(femaleTds.eq(5)),
        },
      },
      assortedByRate: assortedByRateList,
    });
  }

  convertDividedHTMLTextToNumber(ratingText?: string): number {
    if (!ratingText) {
      return 0;
    }
    return Number(formatHTMLText(ratingText).replace(/,/g, "")) || 0;
  }

  get allRates(): IRateDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("allRates");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IRateDetails[];
    }
    const allScores = [this.mainRate];
    if (this.metaCriticsScore) {
      allScores.push(this.metaCriticsScore);
    }
    return cacheDataManager.cacheAndReturnData(allScores);
  }

  get allReleaseDates(): IReleaseDateDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("allReleaseDates");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IReleaseDateDetails[];
    }
    const $ = this.releaseInfoPageCheerio;

    const releaseDates: IReleaseDateDetails[] = [];
    $("#releases")
      .next("table")
      .find("tr")
      .each(function () {
        const country = formatHTMLText(
          $(this).find(".release-date-item__country-name a").first().text()
        );
        const extraInfo = formatHTMLText(
          $(this).find(".release-date-item__attributes").first().text()
        );
        const releaseDateIMDBText = formatHTMLText(
          $(this).find(".release-date-item__date").first().text()
        );
        let date = null;
        if (releaseDateIMDBText.length === 4) {
          date = dayjs(releaseDateIMDBText, "YYYY").endOf("year").toDate();
        } else {
          date = dayjs(releaseDateIMDBText, "dd MMMM YYYY")
            .startOf("day")
            .toDate();
        }

        releaseDates.push({
          country,
          date,
          ...(extraInfo ? { extraInfo } : {}),
        });
      });
    return cacheDataManager.cacheAndReturnData(releaseDates);
  }

  get isEnded(): boolean {
    const cacheDataManager = this.resolverCacheManager.load("isEnded");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as boolean;
    }
    const $ = this.mainPageCheerio;

    if (this.mainType === TitleMainType.Movie) {
      return false;
    }
    const metaText = $("[data-testid='hero-title-block__metadata'] a").text();
    const yearDisplayRegexp = /\d{4}.{1}\d{4}/;
    if (yearDisplayRegexp.test(metaText)) {
      return true;
    }
    return cacheDataManager.cacheAndReturnData(false);
  }

  get endYear(): number {
    const cacheDataManager = this.resolverCacheManager.load("endYear");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as number;
    }
    const $ = this.mainPageCheerio;
    if (!this.isEnded) {
      return NaN;
    }

    const metaText = $("[data-testid='hero-title-block__metadata'] a").text();

    const yearDisplayRegexp = /\d{4}.{1}(\d{4})/;
    const [, yearText] = yearDisplayRegexp.exec(metaText) || [];
    return cacheDataManager.cacheAndReturnData(Number(yearText));
  }

  get dates(): IDatesDetails {
    const cacheDataManager = this.resolverCacheManager.load("dates");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IDatesDetails;
    }
    // pick first one that don't have a festival in its info
    const startDateDetails =
      this.allReleaseDates.find(
        (releaseDate) => !releaseDate.extraInfo?.includes?.("festival")
      ) ?? this.allReleaseDates[0];

    return cacheDataManager.cacheAndReturnData({
      startCountry: startDateDetails?.country ?? "",
      startDate: startDateDetails?.date ?? "",
      startExtraInfo: startDateDetails?.extraInfo ?? "",
      startYear: startDateDetails?.date?.getUTCFullYear() ?? this.titleYear,
      titleYear: this.titleYear,
      isEnded: this.isEnded,
      ...(this.isEnded
        ? {
            endYear: this.endYear,
          }
        : {}),
    });
  }

  get ageCategoryTitle(): string {
    const cacheDataManager = this.resolverCacheManager.load("ageCategoryTitle");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const $ = this.mainPageCheerio;

    let metaText = "";
    $("[data-testid='hero-title-block__metadata'] a").each(function () {
      if ($(this).attr("href")?.includes("parentalguide")) {
        metaText = formatHTMLText($(this).text());
      }
    });

    return cacheDataManager.cacheAndReturnData(metaText);
  }

  get languages(): string[] {
    const cacheDataManager = this.resolverCacheManager.load("languages");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string[];
    }
    const $ = this.mainPageCheerio;
    const languageEl = $("[data-testid='title-details-languages']").first();
    const languages: string[] = [];
    languageEl.find("li a").each(function () {
      languages.push(formatHTMLText($(this).text()));
    });
    return cacheDataManager.cacheAndReturnData(languages);
  }

  get countriesOfOrigin(): string[] {
    const cacheDataManager =
      this.resolverCacheManager.load("countriesOfOrigin");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string[];
    }
    const $ = this.mainPageCheerio;
    const countriesEl = $("[data-testid='title-details-origin']").first();
    const countries: string[] = [];
    countriesEl.find("li a").each(function () {
      countries.push(formatHTMLText($(this).text()));
    });
    return cacheDataManager.cacheAndReturnData(countries);
  }

  getAllThumbnailsFromSrcSet(
    srcset: string,
    alt: string,
    type = ImageType.Poster
  ): IImageDetails[] {
    const setPartsRegexp = /([^\s]+)\s(\d{2,4}w)$/;
    const thumbnails = srcset
      .split("w,")
      .map((i, index, arr) => (i !== arr.slice(-1)[0] ? i + "w" : i))
      .filter((set) => {
        const [, url] = setPartsRegexp.exec(set) || [];
        return !!url;
      })
      .map((set) => {
        const [, url, titlePostfix] = setPartsRegexp.exec(set) || [];
        const title = `${alt} ${titlePostfix}`;
        const [, width, height] = /(\d{2,4}),(\d{2,4})_\.jpg$/.exec(url) || [];
        return {
          title,
          sourceType: Source.IMDB,
          isThumbnail: true,
          url,
          type,
          ...(width && height
            ? {
                size: {
                  width: Number(width),
                  height: Number(height),
                },
              }
            : {}),
        };
      });
    return thumbnails.filter((i) => !!i);
  }

  get posterImage(): IImageDetails {
    const cacheDataManager = this.resolverCacheManager.load("posterImage");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IImageDetails;
    }
    const $ = this.mainPageCheerio;
    const imgEl = $("[data-testid='hero-media__poster'] img").first();
    const srcset = imgEl.attr("srcset");
    const urlSrc = imgEl.attr("src");
    const url = getIMDBFullSizeImageFromThumbnailUrl(urlSrc);
    const type = ImageType.Poster;
    const original: IImageDetails = {
      title: `${this.name} ${this.titleYear}`,
      type,
      sourceType: Source.IMDB,
      isThumbnail: false,
      url,
    };
    if (srcset) {
      original.thumbnails = this.getAllThumbnailsFromSrcSet(
        srcset,
        imgEl.attr("alt") || ""
      );
    }
    return cacheDataManager.cacheAndReturnData(original);
  }

  get allImages(): IImageDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("allImages");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IImageDetails[];
    }
    const images: IImageDetails[] = [];
    const $p = this.posterImagesFirstPageCheerio;
    const $s = this.stillFrameImagesFirstPageCheerio;
    [
      {
        type: ImageType.Poster,
        cheerio: $p,
      },
      {
        type: ImageType.StillFrame,
        cheerio: $s,
      },
    ].forEach(({ type, cheerio: $target }) => {
      $target("#media_index_thumbnail_grid a img").each(function () {
        const thumb100ImageUrl = $target(this).attr("src");
        const title = $target(this).attr("alt") || "";
        images.push({
          isThumbnail: false,
          sourceType: Source.IMDB,
          title,
          type,
          url: getIMDBFullSizeImageFromThumbnailUrl(thumb100ImageUrl),
          thumbnails: [
            ...(thumb100ImageUrl
              ? [
                  {
                    isThumbnail: true,
                    sourceType: Source.IMDB,
                    title: `${title} 100px`,
                    type,
                    size: {
                      height: 100,
                      width: 100,
                    },
                    url: thumb100ImageUrl,
                  },
                ]
              : []),
          ],
        });
      });
    });

    return cacheDataManager.cacheAndReturnData([
      this.posterImage,
      ...images.filter((i) => i.url !== this.posterImage.url),
    ]);
  }

  get boxOffice(): IBoxOfficeDetails | undefined {
    const cacheDataManager = this.resolverCacheManager.load("boxOffice");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IBoxOfficeDetails | undefined;
    }
    if (this.mainType !== TitleMainType.Movie) {
      return undefined;
    }
    const colData = this.mainPageNextData.props?.pageProps?.mainColumnData;
    const budget = colData?.productionBudget?.budget?.amount ?? 0;
    const worldWide = colData?.worldwideGross?.total?.amount ?? 0;
    const mainCountriesOpening = colData?.lifetimeGross?.total?.amount ?? 0;

    const openingDate = dayjs(
      colData?.openingWeekendGross?.weekendEndDate,
      "YYYY-mm-DD"
    )
      .startOf("day")
      .toDate();
    const mainCountries =
      this.mainPageNextData.props?.pageProps?.translationContext?.i18n?.translations?.default?.resources?.title_main_boxoffice_openingweekenddomestic
        ?.slice(16)
        .split("&")
        .map((i) => i.trim()) ?? "";
    const openingCountries =
      this.mainPageNextData.props?.pageProps?.translationContext?.i18n?.translations?.default?.resources?.title_main_boxoffice_grossdomestic
        ?.slice(6)
        .split("&")
        .map((i) => i.trim()) ?? "";
    return cacheDataManager.cacheAndReturnData({
      budget,
      worldwide: worldWide,
      mainCountries: {
        countries: mainCountries,
        amount: mainCountriesOpening,
      },
      opening: {
        countries: openingCountries,
        amount: colData?.openingWeekendGross?.gross?.total?.amount ?? 0,
        date: openingDate,
      },
    } as IBoxOfficeDetails);
  }

  get productionCompanies(): IProductionCompanyDetails[] {
    const cacheDataManager = this.resolverCacheManager.load(
      "productionCompanies"
    );
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IProductionCompanyDetails[];
    }
    const $ = this.companyCreditsPageCheerio;
    const productionCompanies: IProductionCompanyDetails[] = [];
    $("#production")
      .next("ul")
      .find("li")
      .each(function () {
        const extraInfo = formatHTMLText(
          $(this)
            .contents()
            .filter(function () {
              return this.nodeType == 3;
            })
            .text()
        );
        const name = formatHTMLText($(this).find("a").text());
        productionCompanies.push({
          name,
          ...(extraInfo ? { extraInfo } : {}),
        });
      });
    return cacheDataManager.cacheAndReturnData(productionCompanies);
  }

  get taglines(): string[] {
    const cacheDataManager = this.resolverCacheManager.load("taglines");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string[];
    }
    const $ = this.taglinesPageCheerio;
    let taglines: string[] = [];

    $("#taglines_content")
      .find(".soda")
      .each(function () {
        taglines.push(formatHTMLText($(this).text()));
      });
    if (
      taglines.length === 1 &&
      taglines[0]?.toLowerCase().includes("we don't have any taglines")
    ) {
      taglines = [];
    }
    return cacheDataManager.cacheAndReturnData(taglines);
  }

  get runtime(): IRuntimeDetails {
    const cacheDataManager = this.resolverCacheManager.load("runtime");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IRuntimeDetails;
    }
    const $ = this.mainPageCheerio;
    const runtimeTitle = formatHTMLText(
      $("[data-testid='title-techspec_runtime'] div").first().text()
    );

    const seconds = 0;
    const [, minutesString] = /(\d{1,2})\sminutes/.exec(runtimeTitle) || [];
    const minutes = Number(minutesString) || 0;
    const [, hoursString] = /(\d{1,2})\shours/.exec(runtimeTitle) || [];
    const hours = Number(hoursString) || 0;

    return cacheDataManager.cacheAndReturnData({
      title: runtimeTitle,
      hours,
      minutes,
      seconds,
    });
  }

  get keywords(): string[] {
    return (
      this.mainPageNextData.props?.pageProps?.aboveTheFoldData?.keywords?.edges
        ?.map((i) => i.node?.text || "")
        .filter((i) => !!i) || []
    );
  }

  get awards(): IAwardDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("awards");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IAwardDetails[];
    }
    const $ = this.awardsPageCheerio;
    const awards: IAwardDetails[] = [];
    const resolverInstance = this;
    $("h3")
      .slice(1)
      .each(function () {
        const mainEventFullText = formatHTMLText($(this).text());
        const [, mainEvent, eventYearString] =
          /(.+)\s+(\d{4})$/.exec(mainEventFullText) || [];
        const eventYear = Number(eventYearString);
        const source: ISourceDetails =
          resolverInstance.extractSourceDetailsFromAElement(
            $(this).find("a").first(),
            "ev"
          );
        const tableEl = $(this).next("table.awards").first();
        const outcomeTds = tableEl.find("td.title_award_outcome");
        const outcomeTdsLength = outcomeTds.length;
        let proceedRows = 0;
        // for each outcome
        Array(outcomeTdsLength)
          .fill(null)
          .forEach((n, outcomeTdIndex) => {
            const td = outcomeTds.eq(outcomeTdIndex);
            const trsLength = Number(td.attr("rowspan"));

            const outcome =
              formatHTMLText(td.find("b").first().text(), {
                toLowerCase: true,
              }) === "winner"
                ? AwardOutcome.Winner
                : AwardOutcome.Nominee;

            const subEvent = formatHTMLText(td.find("span").first().text());

            // for each tr of the outcome
            tableEl
              .find("tr")
              .slice(proceedRows, proceedRows + trsLength)
              .each(function () {
                const descriptionTd = $(this).find(".award_description");
                const awardTitle = formatHTMLText(
                  descriptionTd
                    .contents()
                    .filter(function () {
                      return this.nodeType == 3;
                    })
                    .text()
                );
                const relatedPersons: IPersonDetails[] = [];
                const relatedTitles: {
                  name: string;
                  source: ISourceDetails;
                }[] = [];
                descriptionTd.find("a").each(function () {
                  const href = $(this).attr("href");
                  if (href?.startsWith("/title")) {
                    relatedTitles.push({
                      name: formatHTMLText($(this).text()),
                      source: resolverInstance.extractSourceDetailsFromAElement(
                        $(this),
                        "tt"
                      ),
                    });
                  } else {
                    relatedPersons.push({
                      name: formatHTMLText($(this).text()),
                      source: resolverInstance.extractSourceDetailsFromAElement(
                        $(this),
                        "nm"
                      ),
                    });
                  }
                });

                const details = formatHTMLText(
                  descriptionTd.find(".award_detail_notes").text()
                );

                awards.push({
                  mainEvent,
                  eventYear,
                  outcome,
                  subEvent,
                  awardTitle,
                  source,
                  relatedPersons,
                  relatedTitles,
                  details,
                });
              });
            proceedRows += trsLength;
          });
      });
    return cacheDataManager.cacheAndReturnData(awards);
  }

  get awardsSummary(): IAwardsSummaryDetails {
    const cacheDataManager = this.resolverCacheManager.load("awardsSummary");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IAwardsSummaryDetails;
    }
    const $ = this.awardsPageCheerio;
    let totalNominations = 0;
    let nominationsOutcome = 0;
    let wins = 0;
    $("td.title_award_outcome").each(function () {
      const td = $(this);
      const text = formatHTMLText(td.text(), { toLowerCase: true });
      const length = Number(td.attr("rowspan"));
      totalNominations += length;
      if (text.includes("winner")) {
        wins += length;
      } else {
        nominationsOutcome += length;
      }
    });
    const $m = this.mainPageCheerio;
    const infoText = $m("[data-testid='award_information']")
      .first()
      .find("a.ipc-metadata-list-item__label")
      .text();
    const [, primaryEventWins] = /won (\d+) .+/i.exec(infoText) || [];
    let oscarWins = 0,
      emmyWins = 0;
    if (primaryEventWins) {
      if (this.mainType === TitleMainType.Movie) {
        oscarWins = Number(primaryEventWins);
      } else {
        emmyWins = Number(primaryEventWins);
      }
    }

    return cacheDataManager.cacheAndReturnData({
      totalNominations,
      nominationsOutcome,
      wins,
      oscarWins,
      emmyWins,
    });
  }

  get metaCriticsScore(): IRateDetails | null {
    const cacheDataManager = this.resolverCacheManager.load("metaCriticsScore");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IRateDetails;
    }

    const $ = this.criticReviewsPageCheerio;

    const scoreText = $("span[itemprop='ratingValue']").eq(0).text();
    if (!scoreText) {
      return null;
    }

    const score: IRateDetails = {
      rate: Number(scoreText) || 0,
      rateSource: Source.MetaCritics,
      votesCount: Number($("span[itemprop='ratingCount']").text()) || 0,
    };

    return cacheDataManager.cacheAndReturnData(score);
  }

  get quotes(): ITitleQuoteItem[] {
    const cacheDataManager = this.resolverCacheManager.load("quotes");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as ITitleQuoteItem[];
    }
    const $ = this.quotesPageCheerio;
    const quotes: ITitleQuoteItem[] = [];
    const addToLines = (el: Element, isSpoiler = false) => {
      const lines: ITitleQuoteLineItemDetails[] = [];
      $(el)
        .find("p")
        .each((i, pel) => {
          const charAEl = $(pel).find("a").first();
          const characterName = formatHTMLText(charAEl.text());
          const line = formatHTMLText($(pel).text())
            .slice(characterName.length)
            .replace(/^\s?:\s?/, "");
          lines.push({
            character: {
              name: characterName,
              playerSource: this.extractSourceDetailsFromAElement(
                charAEl,
                "nm"
              ),
            },
            line,
          });
        });
      quotes.push({
        isSpoiler,
        lines,
      });
    };
    $(".list:eq(0) .sodatext").each((i, el) => {
      addToLines(el, false);
    });
    $("#spoilers")
      .parent()
      .find(".sodatext")
      .each((i, el) => {
        addToLines(el, true);
      });

    return cacheDataManager.cacheAndReturnData(quotes);
  }

  get goofs(): ITitleGoofItem[] {
    const cacheDataManager = this.resolverCacheManager.load("goofs");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as ITitleGoofItem[];
    }

    const $ = this.goofsPageCheerio;
    const goofs: ITitleGoofItem[] = [];
    $("h4.li_group").each((i, el) => {
      let target = $(el);
      while (target.next(".sodavote").length) {
        target = target.next(".sodavote");
        goofs.push({
          details: formatHTMLText(target.find(".sodatext").text()),
          groupName: formatHTMLText($(el).text()),
        });
      }
    });

    return cacheDataManager.cacheAndReturnData(goofs);
  }
}
