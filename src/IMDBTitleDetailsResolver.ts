import { load as loadCheerio, Cheerio, CheerioAPI, Element } from "cheerio";
import axios from "axios";
import { Genre, Language, Source, TitleMainType } from "./enums";
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
} from "./interfaces";
import { camelCase } from "change-case";
import { formatHTMLText } from "./utils/formatHTMLText";
import { convertIMDBPathToIMDBUrl } from "./utils/convertIMDBPathToIMDBUrl";
import dayjs from "dayjs";

export class IMDBTitleDetailsResolver implements ITitleDetailsResolver {
  private url: string;
  private mainPageHTMLData!: string;
  private releaseInfoPageHTMLData!: string;
  private fullCreditsPageHTMLData!: string;
  private ratingsPageHTMLData!: string;
  private companyCreditPageHTMLData!: string;
  private taglinesPageHTMLData!: string;
  private posterImagesFirstPageHTMLData!: string;
  private stillFrameImagesFirstPageHTMLData!: string;

  // cheerio loaded instances
  private mainPageCheerio!: CheerioAPI;
  private releaseInfoPageCheerio!: CheerioAPI;
  private fullCreditsPageCheerio!: CheerioAPI;
  private ratingsPageCheerio!: CheerioAPI;
  private companyCreditPageCheerio!: CheerioAPI;
  private taglinesPageCheerio!: CheerioAPI;
  private posterImagesFirstPageCheerio!: CheerioAPI;
  private stillFrameImagesFirstPageCheerio!: CheerioAPI;

  constructor(url: string) {
    this.url = url;
  }

  async getDetails(): Promise<ITitle | undefined> {
    await Promise.all([
      this.getMainPageHTMLData(),
      this.getReleaseInfoPageHTMLData(),
      this.getFullCreditsPageHTMLData(),
      this.getRatingsPageHTMLData(),
      this.getCompanyCreditsPageHTMLData(),
      this.getTaglinesPageHTMLData(),
      this.getPosterImagesFirstPageHTMLData(),
      this.getStillFrameImagesFirstPageHTMLData(),
    ]);

    return this.generateReturnDetailsData();
  }

  async getMainPageHTMLData() {
    const apiResult = await axios.get(this.url);
    this.mainPageHTMLData = apiResult.data;
    this.mainPageCheerio = loadCheerio(this.mainPageHTMLData);
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

  generateReturnDetailsData() {
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
      casts: this.cast,
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
      storyline: this.storyline,
      taglines: this.taglines,
      runtime: this.runtime,
      keywords: this.keywords,
      otherLangs: [],
    };

    return res;
  }

  extractIdFromUrl(fullUrl: string, idPrefix: string): string {
    const matchRegexp = new RegExp(`^${idPrefix}\\d+`);
    return (
      fullUrl
        .replace(/\/$/, "")
        .split("/")
        .filter((i) => matchRegexp.test(i))
        .slice(-1)[0] || ""
    );
  }

  get mainSourceDetails(): ISourceDetails {
    return {
      sourceId: this.sourceId,
      sourceType: Source.IMDB,
      sourceUrl: this.url,
    };
  }

  get allSources(): ISourceDetails[] {
    return [this.mainSourceDetails];
  }

  get sourceId(): string {
    return this.extractIdFromUrl(this.url, "tt");
  }

  get name(): string {
    const nameInAllNamesList = this.allNames.find((i) =>
      i.title.toLowerCase().includes("original title")
    )?.name;

    if (!nameInAllNamesList) {
      return this.nameInMainPage;
    }
    return nameInAllNamesList;
  }

  get allNames(): Array<{ title: string; name: string }> {
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
    return allNames;
  }

  get allUniqueNames(): string[] {
    return [...new Set(this.allNames.map((i) => i.name))];
  }

  get nameInMainPage(): string {
    const $ = this.mainPageCheerio;
    return formatHTMLText($("h1").first().text());
  }

  get worldWideName(): string {
    return (
      formatHTMLText(
        this.allNames.find((i) => i.title.toLowerCase().includes("world-wide"))
          ?.name
      ) || this.name
    );
  }

  get titleYear(): number {
    const $ = this.releaseInfoPageCheerio;
    const yearText = $("#releaseinfo_content table tr")
      .eq(0)
      .find("td")
      .eq(1)
      .text()
      .slice(-4);
    return Number(yearText);
  }

  get genres(): Genre[] {
    const $ = this.mainPageCheerio;
    const originalIMDBGenres: string[] = [];
    $("[data-testid='storyline-genres'] a").each(function () {
      originalIMDBGenres.push($(this).text());
    });

    const genreEnumValues = Object.values(Genre);

    return originalIMDBGenres
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
      sourceId: this.extractIdFromUrl(sourceUrl, sourceIdPrefix),
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
    // TODO: some other info for series episodes
    return this.extractPersonInfoFromTrsForSpecificSectionId("#director");
  }

  get writers(): IPersonDetails[] {
    return this.extractPersonInfoFromTrsForSpecificSectionId(
      "#writer",
      (el) => {
        const extraInfo = formatHTMLText(el.find("td").eq(2).text());
        return { extraInfo };
      }
    );
  }

  get mainType(): TitleMainType {
    const $ = this.mainPageCheerio;
    const metaDataBoxText = $("[data-testid='hero-title-block__metadata']")
      .text()
      ?.toLowerCase();
    return metaDataBoxText.includes("episode")
      ? TitleMainType.SeriesEpisode
      : metaDataBoxText.includes("series")
      ? TitleMainType.Series
      : TitleMainType.Movie;
  }

  get plot(): string {
    const $ = this.mainPageCheerio;
    const plotText = $("[data-testid='plot-xl']").text();
    return formatHTMLText(plotText);
  }

  get cast(): ICastDetails[] {
    const resolverInstance = this;

    const $ = this.fullCreditsPageCheerio;
    return this.extractPersonInfoFromTrsForSpecificSectionId(
      "#cast",
      (el): Omit<ICastDetails, "name" | "source"> => {
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
        const imageThumbnailUrl = el
          .find("td:eq(0) img")
          .first()
          .attr("loadlate");
        return { otherNames, roles, imageThumbnailUrl };
      },
      {
        nameAElementSelector: "td:eq(1) a:eq(0)",
      }
    ) as ICastDetails[];
  }

  get producers(): IPersonDetails[] {
    return this.extractPersonInfoFromTrsForSpecificSectionId(
      "#producer",
      (el) => {
        const extraInfo = formatHTMLText(el.find("td").eq(2).text());
        return { extraInfo };
      }
    );
  }

  get mainRate(): IRateDetails {
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

    return {
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
    };
  }

  convertDividedHTMLTextToNumber(ratingText?: string): number {
    if (!ratingText) {
      return 0;
    }
    return Number(formatHTMLText(ratingText).replace(/,/g, "")) || 0;
  }

  get allRates(): IRateDetails[] {
    return [this.mainRate];
  }

  get allReleaseDates(): IReleaseDateDetails[] {
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
    return releaseDates;
  }

  get isEnded(): boolean {
    const $ = this.mainPageCheerio;

    if (this.mainType === TitleMainType.Movie) {
      return false;
    }
    const metaText = $("[data-testid='hero-title-block__metadata'] a").text();
    const yearDisplayRegexp = /\d{4}.{1}\d{4}/;
    if (yearDisplayRegexp.test(metaText)) {
      return true;
    }
    return false;
  }

  get endYear(): number {
    const $ = this.mainPageCheerio;
    if (!this.isEnded) {
      return NaN;
    }

    const metaText = $("[data-testid='hero-title-block__metadata'] a").text();

    const yearDisplayRegexp = /\d{4}.{1}(\d{4})/;
    const [, yearText] = yearDisplayRegexp.exec(metaText) || [];
    return Number(yearText);
  }

  get dates(): IDatesDetails {
    // pick first one that dont have a festival in its info
    const startDateDetails =
      this.allReleaseDates.find(
        (releaseDate) => !releaseDate.extraInfo?.includes?.("festival")
      ) || this.allReleaseDates[0];

    return {
      startCountry: startDateDetails.country,
      startDate: startDateDetails.date,
      startExtraInfo: startDateDetails.extraInfo,
      startYear: startDateDetails?.date.getUTCFullYear() ?? 2020,
      titleYear: this.titleYear,
      isEnded: this.isEnded,
      ...(this.isEnded
        ? {
            endYear: this.endYear,
          }
        : {}),
    };
  }

  get ageCategoryTitle(): string {
    const $ = this.mainPageCheerio;

    let metaText = "";
    $("[data-testid='hero-title-block__metadata'] a").each(function () {
      if ($(this).attr("href")?.includes("parentalguide")) {
        metaText = formatHTMLText($(this).text());
      }
    });

    return metaText;
  }

  get languages(): string[] {
    const $ = this.mainPageCheerio;
    const languageEl = $("[data-testid='title-details-languages']").first();
    const languages: string[] = [];
    languageEl.find("li a").each(function () {
      languages.push(formatHTMLText($(this).text()));
    });
    return languages;
  }

  get countriesOfOrigin(): string[] {
    const $ = this.mainPageCheerio;
    const countriesEl = $("[data-testid='title-details-origin']").first();
    const countries: string[] = [];
    countriesEl.find("li a").each(function () {
      countries.push(formatHTMLText($(this).text()));
    });
    return countries;
  }

  getAllThumbnailsFromSrcSet(srcset: string): IImageDetails[] {
    const setPartsRegexp = /([^\s]+)\s(\d{2,4}w)$/;
    const thumbnails = srcset
      .split("w,")
      .map((i, index, arr) => (i !== arr.slice(-1)[0] ? i + "w" : i))
      .filter((set) => {
        const [, url] = setPartsRegexp.exec(set) || [];
        return !!url;
      })
      .map((set) => {
        const [, url, title] = setPartsRegexp.exec(set) || [];
        const [, width, height] = /(\d{2,4}),(\d{2,4})_\.jpg$/.exec(url) || [];
        return {
          title,
          sourceType: Source.IMDB,
          isThumbnail: true,
          url,
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

  getFullSizeImageFromThumbnailUrl(thumbnailUrl?: string): string {
    if (!thumbnailUrl || typeof thumbnailUrl !== "string") {
      return "";
    }
    if (/@.+/i.test(thumbnailUrl)) {
      return thumbnailUrl.split("@").slice(0, -1).join("@") + "@.jpg";
    } else if (/\._V1.+/i.test(thumbnailUrl)) {
      return thumbnailUrl.split("._V1").slice(0, -1).join("") + ".jpg";
    }
    return "";
  }

  get posterImage(): IImageDetails {
    const $ = this.mainPageCheerio;
    const imgEl = $("[data-testid='hero-media__poster'] img").first();
    const srcset = imgEl.attr("srcset");
    const urlSrc = imgEl.attr("src");
    const url = this.getFullSizeImageFromThumbnailUrl(urlSrc);
    const original: IImageDetails = {
      title: "poster",
      sourceType: Source.IMDB,
      isThumbnail: false,
      url,
    };
    if (srcset) {
      original.thumbnails = this.getAllThumbnailsFromSrcSet(srcset);
    }
    return original;
  }

  get allImages(): IImageDetails[] {
    const images: IImageDetails[] = [];
    const $p = this.posterImagesFirstPageCheerio;
    const $s = this.stillFrameImagesFirstPageCheerio;
    const resolverInstance = this;
    [
      {
        type: "poster",
        cheerio: $p,
      },
      {
        type: "stillFrame",
        cheerio: $s,
      },
    ].forEach(({ type, cheerio: $target }) => {
      $target("#media_index_thumbnail_grid a img").each(function () {
        const thumb100ImageUrl = $target(this).attr("src");
        images.push({
          isThumbnail: false,
          sourceType: Source.IMDB,
          title: type,
          url: resolverInstance.getFullSizeImageFromThumbnailUrl(
            thumb100ImageUrl
          ),

          thumbnails: [
            ...(thumb100ImageUrl
              ? [
                  {
                    isThumbnail: true,
                    sourceType: Source.IMDB,
                    title: `${type} 100px`,
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

    return [
      this.posterImage,
      ...images.filter((i) => i.url !== this.posterImage.url),
    ];
  }

  get boxOffice(): IBoxOfficeDetails | undefined {
    if (this.mainType !== TitleMainType.Movie) {
      return undefined;
    }
    const $ = this.mainPageCheerio;
    const budgetRawText = $("[data-testid='title-boxoffice-budget'] li span")
      .first()
      .text();
    const [, budgetWithCommas] =
      /\$([\d,]+)\s\(estimated\)/.exec(formatHTMLText(budgetRawText)) || [];
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
    return {
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
    };
  }

  get productionCompanies(): IProductionCompanyDetails[] {
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
    return productionCompanies;
  }

  get storyline(): string {
    const $ = this.mainPageCheerio;
    return formatHTMLText(
      $("[data-testid='storyline-plot-summary']")
        .find(".ipc-html-content")
        .find("div")
        .first()
        .contents()
        .filter(function () {
          return this.nodeType == 3;
        })
        .text()
    );
  }

  get taglines(): string[] {
    const $ = this.taglinesPageCheerio;
    const taglines: string[] = [];

    $("#taglines_content")
      .find(".soda")
      .each(function () {
        taglines.push(formatHTMLText($(this).text()));
      });
    return taglines;
  }

  get runtime(): IRuntimeDetails {
    const $ = this.mainPageCheerio;
    const runtimeTitle = formatHTMLText(
      $("[data-testid='title-techspec_runtime'] div").first().text()
    );

    const seconds = 0;
    const [, minutesString] = /(\d{1,2})\sminutes/.exec(runtimeTitle) || [];
    const minutes = Number(minutesString) || 0;
    const [, hoursString] = /(\d{1,2})\shours/.exec(runtimeTitle) || [];
    const hours = Number(hoursString) || 0;

    return {
      title: runtimeTitle,
      hours,
      minutes,
      seconds,
    };
  }

  get keywords(): string[] {
    const $ = this.mainPageCheerio;
    const keywords: string[] = [];
    $("[data-testid='storyline-plot-keywords'] a span").each(function () {
      const keyword = formatHTMLText($(this).text());
      // exclude keyword if it says \d more item ( for more tags )
      if (/more$/.test(keyword)) {
        return;
      }
      keywords.push(keyword);
    });
    return keywords;
  }
}
