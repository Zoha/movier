import {
  ITitleGoofItem,
  ITitleQuoteItem,
  ITitleQuoteLineItemDetails,
} from "./../interfaces";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";
import { load as loadCheerio, Cheerio, CheerioAPI, Element } from "cheerio";
import axios from "axios";
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

export class IMDBTitleDetailsResolver implements ITitleDetailsResolver {
  private url: string;
  private resolverCacheManager = new ResolverCacheManager();
  private mainPageHTMLData!: string;
  private releaseInfoPageHTMLData!: string;
  private fullCreditsPageHTMLData!: string;
  private ratingsPageHTMLData!: string;
  private companyCreditPageHTMLData!: string;
  private taglinesPageHTMLData!: string;
  private posterImagesFirstPageHTMLData!: string;
  private stillFrameImagesFirstPageHTMLData!: string;
  private awardsPageHTMLData!: string;
  private quotesPageHTMLData!: string;
  private goofsPageHTMLData!: string;
  private criticReviewsPageHTMLData!: string;

  // cheerio loaded instances
  private mainPageCheerio!: CheerioAPI;
  private releaseInfoPageCheerio!: CheerioAPI;
  private fullCreditsPageCheerio!: CheerioAPI;
  private ratingsPageCheerio!: CheerioAPI;
  private companyCreditPageCheerio!: CheerioAPI;
  private taglinesPageCheerio!: CheerioAPI;
  private posterImagesFirstPageCheerio!: CheerioAPI;
  private stillFrameImagesFirstPageCheerio!: CheerioAPI;
  private awardsPageCheerio!: CheerioAPI;
  private quotesPageCheerio!: CheerioAPI;
  private goofsPageCheerio!: CheerioAPI;
  private criticReviewsPageCheerio!: CheerioAPI;

  private mainPageNextData!: IMDBNextData;

  constructor(url: string) {
    this.url = url;
  }

  async getDetails(): Promise<ITitle> {
    await Promise.all([
      this.getMainPageHTMLData(),
      this.getReleaseInfoPageHTMLData(),
      this.getFullCreditsPageHTMLData(),
      this.getRatingsPageHTMLData(),
      this.getCompanyCreditsPageHTMLData(),
      this.getTaglinesPageHTMLData(),
      this.getPosterImagesFirstPageHTMLData(),
      this.getStillFrameImagesFirstPageHTMLData(),
      this.getAwardsPageHTMLData(),
      this.getCriticReviewsHTMLData(),
      this.getQuotesPageHTMLData(),
      this.getGoofsPageHTMLData(),
    ]);

    return this.generateReturnDetailsData();
  }

  async getMainPageHTMLData() {
    const apiResult = await axios.get(this.url);
    this.mainPageHTMLData = apiResult.data;
    this.mainPageCheerio = loadCheerio(this.mainPageHTMLData);
    const nextDataString =
      this.mainPageCheerio("#__NEXT_DATA__")?.html()?.trim() || "{}";

    this.mainPageNextData = JSON.parse(nextDataString);
  }

  async getReleaseInfoPageHTMLData() {
    const releaseInfoPageUrl = this.addToPathOfUrl(this.url, "/releaseinfo");
    const apiResult = await axios.get(releaseInfoPageUrl);
    this.releaseInfoPageHTMLData = apiResult.data;
    this.releaseInfoPageCheerio = loadCheerio(this.releaseInfoPageHTMLData);
  }

  async getFullCreditsPageHTMLData() {
    const fullCreditsPageUrl = this.addToPathOfUrl(this.url, "/fullcredits");
    const apiResult = await axios.get(fullCreditsPageUrl);
    this.fullCreditsPageHTMLData = apiResult.data;
    this.fullCreditsPageCheerio = loadCheerio(this.fullCreditsPageHTMLData);
  }

  async getRatingsPageHTMLData() {
    const ratingsPageUrl = this.addToPathOfUrl(this.url, "/ratings");
    const apiResult = await axios.get(ratingsPageUrl);
    this.ratingsPageHTMLData = apiResult.data;
    this.ratingsPageCheerio = loadCheerio(this.ratingsPageHTMLData);
  }

  async getTaglinesPageHTMLData() {
    const taglinesPageUrl = this.addToPathOfUrl(this.url, "/taglines");
    const apiResult = await axios.get(taglinesPageUrl);
    this.taglinesPageHTMLData = apiResult.data;
    this.taglinesPageCheerio = loadCheerio(this.taglinesPageHTMLData);
  }

  async getCriticReviewsHTMLData() {
    const criticReviewsPageUrl = this.addToPathOfUrl(
      this.url,
      "/criticreviews"
    );
    const apiResult = await axios.get(criticReviewsPageUrl);
    this.criticReviewsPageHTMLData = apiResult.data;
    this.criticReviewsPageCheerio = loadCheerio(this.criticReviewsPageHTMLData);
  }

  async getCompanyCreditsPageHTMLData() {
    const companyCreditPageUrl = this.addToPathOfUrl(
      this.url,
      "/companycredits"
    );
    const apiResult = await axios.get(companyCreditPageUrl);
    this.companyCreditPageHTMLData = apiResult.data;
    this.companyCreditPageCheerio = loadCheerio(this.companyCreditPageHTMLData);
  }

  async getPosterImagesFirstPageHTMLData() {
    const posterImagesFirstPageUrl = this.addToPathOfUrl(
      this.url,
      "/mediaindex",
      {
        refine: "poster",
      }
    );
    const apiResult = await axios.get(posterImagesFirstPageUrl);
    this.posterImagesFirstPageHTMLData = apiResult.data;
    this.posterImagesFirstPageCheerio = loadCheerio(
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
    const apiResult = await axios.get(stillFrameImagesFirstPageUrl);
    this.stillFrameImagesFirstPageHTMLData = apiResult.data;
    this.stillFrameImagesFirstPageCheerio = loadCheerio(
      this.stillFrameImagesFirstPageHTMLData
    );
  }

  async getAwardsPageHTMLData() {
    const awardsPageUrl = this.addToPathOfUrl(this.url, "/awards");
    const apiResult = await axios.get(awardsPageUrl);
    this.awardsPageHTMLData = apiResult.data;
    this.awardsPageCheerio = loadCheerio(this.awardsPageHTMLData);
  }

  async getQuotesPageHTMLData() {
    const quotesPageUrl = this.addToPathOfUrl(this.url, "/quotes");
    const apiResult = await axios.get(quotesPageUrl);
    this.quotesPageHTMLData = apiResult.data;
    this.quotesPageCheerio = loadCheerio(this.quotesPageHTMLData);
  }

  async getGoofsPageHTMLData() {
    const goofsPageUrl = this.addToPathOfUrl(this.url, "/goofs");
    const apiResult = await axios.get(goofsPageUrl);
    this.goofsPageHTMLData = apiResult.data;
    this.goofsPageCheerio = loadCheerio(this.goofsPageHTMLData);
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

  async generateReturnDetailsData() {
    const res: ITitle = {
      detailsLang: Language.English,
      mainSource: this.mainSourceDetails,
      allSources: this.allSources,
      name: this.name,
      worldWideName: this.worldWideName,
      otherNames: this.allUniqueNames,
      titleYear: this.titleYear,
      genres: this.genres,
      directors: this.directors,
      writers: this.writers,
      mainType: this.mainType,
      plot: this.plot,
      casts: this.casts,
      producers: this.producers,
      mainRate: this.mainRate,
      allRates: this.allRates,
      allReleaseDates: this.allReleaseDates,
      dates: this.dates,
      ageCategoryTitle: this.ageCategoryTitle,
      languages: this.languages,
      countriesOfOrigin: this.countriesOfOrigin,
      posterImage: this.posterImage,
      allImages: this.allImages,
      boxOffice: this.boxOffice,
      productionCompanies: this.productionCompanies,
      taglines: this.taglines,
      runtime: this.runtime,
      keywords: this.keywords,
      awards: this.awards,
      awardsSummary: this.awardsSummary,
      quotes: this.quotes,
      goofs: this.goofs,
    };

    return res;
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

  get allSources(): ISourceDetails[] {
    const cacheDataManager = this.resolverCacheManager.load("allSources");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as ISourceDetails[];
    }
    return cacheDataManager.cacheAndReturnData([this.mainSourceDetails]);
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

  get allUniqueNames(): string[] {
    const cacheDataManager = this.resolverCacheManager.load("allUniqueNames");
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
      $("[data-testid='hero-title-block__metadata']").text()?.toLowerCase() ||
      "";
    return cacheDataManager.cacheAndReturnData(
      metaDataBoxText.includes("episode")
        ? TitleMainType.SeriesEpisode
        : metaDataBoxText.includes("series")
        ? TitleMainType.Series
        : TitleMainType.Movie
    );
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
    const $ = this.mainPageCheerio;
    const budgetRawText = $("[data-testid='title-boxoffice-budget'] li span")
      .first()
      .text();
    const [, budgetWithCommas] =
      /\$([\d,]+)\s\(estimated\)/.exec(
        formatHTMLText(budgetRawText, { toLowerCase: true })
      ) || [];
    const budget = this.convertDividedHTMLTextToNumber(budgetWithCommas);
    const sellInMainCountriesElText = $(
      "[data-testid='title-boxoffice-grossdomestic']"
    )
      .first()
      .text()
      .replace?.(/\n/g, "");
    const [, countriesString, sellInMainCountriesWithCommas] =
      /gross ([^$]+)\$([\d,]+)$/i.exec(sellInMainCountriesElText) || [];
    const countries = ((countriesString || "") as string)
      .split("&")
      .map((i) => i.trim().toLowerCase());
    const sellInMainCountries = this.convertDividedHTMLTextToNumber(
      sellInMainCountriesWithCommas
    );
    const openingSellText = $(
      "[data-testid='title-boxoffice-openingweekenddomestic'] li"
    )
      .text()
      .replace(/\n/g, "");

    const [, openingSellWithCommas, openingDateString] =
      /\$([\d,]+).*(\w{3}\s\d{1,2},\s\d{4})/i.exec(openingSellText) || [];
    const openingSell = this.convertDividedHTMLTextToNumber(
      openingSellWithCommas
    );
    const openingDate = dayjs(openingDateString, "MMM dd, YYYY")
      .startOf("day")
      .toDate();
    const worldWideElText = $(
      "[data-testid='title-boxoffice-cumulativeworldwidegross'] li span"
    )
      .first()
      .text();
    const [, worldWideSellWithCommas] =
      /\$([\d,]+)/.exec(worldWideElText) || [];
    const worldWideSell = this.convertDividedHTMLTextToNumber(
      worldWideSellWithCommas
    );
    return cacheDataManager.cacheAndReturnData({
      budget,
      worldwide: worldWideSell,
      mainCountries: {
        countries: countries,
        amount: sellInMainCountries,
      },
      opening: {
        countries: countries,
        amount: openingSell,
        date: openingDate,
      },
    });
  }

  get productionCompanies(): IProductionCompanyDetails[] {
    const cacheDataManager = this.resolverCacheManager.load(
      "productionCompanies"
    );
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IProductionCompanyDetails[];
    }
    const $ = this.companyCreditPageCheerio;
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
