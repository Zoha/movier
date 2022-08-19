import dayjs from "dayjs";
import { IPersonalDetailItem } from "../interfaces";
import { ImageType, Source, TitleMainType } from "../enums";
import axios from "axios";
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

  constructor(url: string) {
    this.url = url;
  }

  async getDetails(): Promise<IPerson | undefined> {
    await Promise.all([
      this.getMainPageHTMLData(),
      this.getBioPageHTMLData(),
      this.getMediaIndexPageHTMLData(),
    ]);
    return this.generateReturnDetailsData();
  }

  async getMainPageHTMLData() {
    const apiResult = await axios.get(this.url);
    this.mainPageHTMLData = apiResult.data;
    this.mainPageCheerio = loadCheerio(apiResult.data);
  }

  async getBioPageHTMLData() {
    const url = this.addToPathOfUrl(this.url, "/bio");
    const apiResult = await axios.get(url);
    this.bioPageHTMLData = apiResult.data;
    this.bioPageCheerio = loadCheerio(apiResult.data);
  }

  async getMediaIndexPageHTMLData() {
    const url = this.addToPathOfUrl(this.url, "/mediaindex");
    const apiResult = await axios.get(url);
    this.mediaIndexPageHTMLData = apiResult.data;
    this.mediaIndexPageCheerio = loadCheerio(apiResult.data);
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
    const result = {
      detailsLang: Language.English,
      mainSource: this.mainSourceDetails,
      name: this.name,
      miniBio: this.miniBio,
      knownFor: this.knownFor,
      filmography: this.filmography,
      profileImage: this.profileImage,
      allImages: this.allImages,
      personalDetails: this.personalDetails,
      birthDate: this.birthDate,
      birthPlace: this.birthPlace,
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
    const $ = this.mainPageCheerio;
    const name = formatHTMLText($("h1.header .itemprop").first().text());

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
    const knownForContainerElements = $("#knownfor .knownfor-title");
    knownForContainerElements.each((i, el) => {
      const years = $(el)
        .find(".knownfor-year .knownfor-ellipsis")
        .text()
        .replace(/^\(/g, "")
        .replace(/\)$/g, "")
        .split("-")
        .map(Number);
      const thumbnailImgEl = $(el).find("img").first();
      knownForItems.push({
        name: formatHTMLText($(el).find(".knownfor-title-role a").text()),
        role: formatHTMLText($(el).find(".knownfor-title-role span").text()),
        startYear: years[0],
        endYear: years[1] ?? years[0],
        posterImage: this.extractImageFullDetailsFromImgElement(thumbnailImgEl),
        source: this.extractSourceDetailsFromAElement(
          $(el).find(".knownfor-title-role a"),
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
            width: Number(thumbnailImgEl.attr("width")) ?? 0,
            height: Number(thumbnailImgEl.attr("height")) ?? 0,
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

    const filmographyItems: IFilmographyItem[] = [];
    const $ = this.mainPageCheerio;

    $("#filmography .head").each((i, el) => {
      const category = formatHTMLText($(el).find("a").text());
      $(el)
        .next(".filmo-category-section")
        .find(".filmo-row")
        .each((i, subEl) => {
          const years = formatHTMLText($(subEl).find(".year_column").text())
            .split("-")
            .map(Number);
          const name = formatHTMLText($(subEl).find("b a").first().text());
          if (!name) {
            return;
          }
          filmographyItems.push({
            category: category,
            endYear: years[0] ?? 0,
            startYear: years[1] ?? years[0] ?? 0,
            name: name,
            role: formatHTMLText(
              $(subEl)
                .clone()
                .children()
                .remove()
                .end()
                .text()
                .replace(/.+\w\)\n\n/g, "")
                .replace(/[()]/g, "")
            ),
            source: this.extractSourceDetailsFromAElement(
              $(subEl).find("b a").first(),
              "tt"
            ),
            productionStatus: formatHTMLText(
              $(subEl).find(".in_production").text()
            ),
            type: $(subEl).text().toLowerCase().includes("series")
              ? TitleMainType.Series
              : TitleMainType.Movie,
          });
        });
    });

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
        title: formatHTMLText($(trEl).find("td:eq(0)").text()),
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
    const $ = this.mainPageCheerio;
    const birthDateString = $("#name-born-info")
      .find("time")
      .first()
      .attr("datetime");
    if (!birthDateString) {
      return;
    }
    const birthDate = dayjs(birthDateString, "YYYY-M-D").toDate();
    return cacheDataManager.cacheAndReturnData(birthDate);
  }

  get birthPlace(): string | undefined {
    const cacheDataManager = this.resolverCacheManager.load("birthPlace");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as string;
    }
    const $ = this.mainPageCheerio;
    const birthPlaceEl = $("#name-born-info")
      .clone()
      .find("time")
      .remove()
      .end()
      .find("a")
      .first();
    if (!birthPlaceEl.length) {
      return;
    }

    return cacheDataManager.cacheAndReturnData(
      formatHTMLText(birthPlaceEl.text()) ?? ""
    );
  }
}
