import { SearchPersonByNameOptions } from "../personSearcher";
import { IMDB_TITLE_SEARCH_URL } from "../constants";
import {
  IFoundedPersonDetails,
  IPersonSearchResolver as IPersonSearchResolver,
} from "../interfaces";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";
import { load as loadCheerio, CheerioAPI } from "cheerio";
import { formatHTMLText } from "../utils/formatHTMLText";
import { Source } from "../enums";
import { convertIMDBPathToIMDBUrl } from "../utils/convertIMDBPathToIMDBUrl";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";
import { getRequest } from "../requestClient";

export class IMDBPersonSearchResolver implements IPersonSearchResolver {
  private queryName: string;
  private exactMatch: boolean;
  public searchPageHTMLData!: string;

  private resolverCacheManager = new ResolverCacheManager();

  // cheerio instances
  private searchPageCheerio!: CheerioAPI;

  constructor(
    queryName: string,
    { exactMatch = false }: Omit<SearchPersonByNameOptions, "sourceType"> = {}
  ) {
    this.queryName = queryName;
    this.exactMatch = exactMatch;
  }

  async getResult(): Promise<IFoundedPersonDetails[]> {
    await this.loadSearchPageHTMLData();
    const unsortedSearchResultList = this.originalResultList;

    // do sort and filters
    const finalResult = unsortedSearchResultList.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    return finalResult;
  }

  async loadSearchPageHTMLData() {
    // getting result from imdb page by http request
    const result = await getRequest(IMDB_TITLE_SEARCH_URL, {
      q: this.queryName,
      exact: this.exactMatch,
      s: "nm",
    });

    // parse page content for jquery like
    this.searchPageHTMLData = result.data;
    this.searchPageCheerio = loadCheerio(this.searchPageHTMLData);
  }

  get originalResultList(): IFoundedPersonDetails[] {
    const $ = this.searchPageCheerio;

    const isType1 = !!$(".find-name-result").length;

    if (isType1) {
      return this.originalResultListType1;
    }
    return this.originalResultListType2;
  }

  get originalResultListType1(): IFoundedPersonDetails[] {
    const cacheDataManager =
      this.resolverCacheManager.load("originalResultList");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IFoundedPersonDetails[];
    }

    const result: IFoundedPersonDetails[] = [];
    const $ = this.searchPageCheerio;

    $(".find-name-result").each((i, el) => {
      const sourceUrl = convertIMDBPathToIMDBUrl(
        $(el).find("a").first().attr("href")
      );

      result.push({
        matchScore: 20 - i > 0 ? 20 - i : 1,
        name: formatHTMLText(
          $(el).find(".ipc-metadata-list-summary-item__t").first().text()
        ),
        source: {
          sourceType: Source.IMDB,
          sourceUrl,
          sourceId: extractIMDBIdFromUrl(sourceUrl, "nm"),
        },
        thumbnailImageUrl: $(el).find("img").first().attr("src") ?? "",
        url: sourceUrl,
      });
    });

    return cacheDataManager.cacheAndReturnData(result);
  }

  get originalResultListType2(): IFoundedPersonDetails[] {
    const cacheDataManager =
      this.resolverCacheManager.load("originalResultList");
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as IFoundedPersonDetails[];
    }

    const result: IFoundedPersonDetails[] = [];
    const $ = this.searchPageCheerio;

    $("tr.findResult").each((i, el) => {
      const sourceUrl = convertIMDBPathToIMDBUrl(
        $(el).find("a").first().attr("href")
      );

      result.push({
        matchScore: 20 - i > 0 ? 20 - i : 1,
        name: formatHTMLText($(el).find(".result_text a").first().text()),
        source: {
          sourceType: Source.IMDB,
          sourceUrl,
          sourceId: extractIMDBIdFromUrl(sourceUrl, "nm"),
        },
        thumbnailImageUrl: $(el).find("img").first().attr("src") ?? "",
        url: sourceUrl,
      });
    });

    return cacheDataManager.cacheAndReturnData(result);
  }
}
