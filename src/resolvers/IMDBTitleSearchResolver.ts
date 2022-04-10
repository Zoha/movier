import { IMDB_TITLE_SEARCH_URL } from "../constants";
import { IFoundedTitleDetails, ITitleSearchResolver } from "../interfaces";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";
import { load as loadCheerio, CheerioAPI } from "cheerio";
import axios from "axios";
import { formatHTMLText } from "../utils/formatHTMLText";
import { Source, TitleMainType } from "../enums";
import { convertIMDBPathToIMDBUrl } from "../utils/convertIMDBPathToIMDBUrl";
import { SearchTitleByNameOptions } from "../titleSearchers";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";

export class IMDBTitleSearchResolver implements ITitleSearchResolver {
  private queryName: string;
  private exactMatch: boolean;
  private specificType?: TitleMainType;
  private searchPageHTMLData!: string;

  private resolverCacheManager = new ResolverCacheManager();

  // cheerio instances
  private searchPageCheerio!: CheerioAPI;

  constructor(
    queryName: string,
    {
      exactMatch = false,
      specificType,
    }: Omit<SearchTitleByNameOptions, "sourceType"> = {}
  ) {
    this.queryName = queryName;
    this.exactMatch = exactMatch;
    this.specificType = specificType;
  }

  async getResult(): Promise<IFoundedTitleDetails[]> {
    await this.loadSearchPageHTMLData();
    const allTypesResultList = this.originalResultList;

    // do sort and filters
    const finalResult = allTypesResultList
      .filter((i) =>
        //  filter specific types
        this.specificType ? i.titleType === this.specificType : true
      )
      .sort((a, b) => b.matchScore - a.matchScore);

    return finalResult;
  }

  async loadSearchPageHTMLData() {
    const { nameWithoutYear } = this.nameWithoutYearAndRequestedYearFromQuery;
    // getting result from imdb page by http request
    const result = await axios({
      method: "get",
      url: IMDB_TITLE_SEARCH_URL,
      params: {
        q: nameWithoutYear,
        exact: this.exactMatch,
        s: "tt",
        ref: "fn_tt_ex",
      },
    });

    // parse page content for jquery like
    this.searchPageHTMLData = result.data;
    this.searchPageCheerio = loadCheerio(this.searchPageHTMLData);
  }

  get nameWithoutYearAndRequestedYearFromQuery(): {
    nameWithoutYear: string;
    requestedYear: number | null;
  } {
    const cacheDataManager = this.resolverCacheManager.load(
      "getNameWithoutYearAndRequestedYearFromQuery"
    );
    if (cacheDataManager.hasData) {
      return cacheDataManager.data as {
        nameWithoutYear: string;
        requestedYear: number | null;
      };
    }
    const queryName = this.queryName;
    const nameExecDetails = /(.+)\s(\d{4})\s*$/.exec(queryName);
    let nameWithoutYear: string,
      requestedYear: number | null = null;
    nameWithoutYear = queryName;
    if (Array.isArray(nameExecDetails)) {
      nameWithoutYear = nameExecDetails[1];
      requestedYear = Number(nameExecDetails[2]);
    }
    return { nameWithoutYear, requestedYear };
  }

  get originalResultList(): IFoundedTitleDetails[] {
    const moviesList: IFoundedTitleDetails[] = [];
    const { nameWithoutYear, requestedYear } =
      this.nameWithoutYearAndRequestedYearFromQuery;
    const $ = this.searchPageCheerio;

    // find rows of result (jquery like) and push it with proper format to result list
    $("table.findList")
      .first()
      .find("tr")
      .each(function (index) {
        // exclude vars from result row
        const $this = $(this);
        const $movieTexts = $this.find("td:eq(1)");
        const text = formatHTMLText($movieTexts.text());
        const name = formatHTMLText($movieTexts.find("a").text());
        const aka = formatHTMLText(/aka\s"(.+)"/.exec(text)?.[1]);
        const titleType = /(.*episode.*)\s*$/i.test(text)
          ? TitleMainType.SeriesEpisode
          : /(.*series.*)\s*$/i.test(text)
          ? TitleMainType.Series
          : TitleMainType.Movie;
        const titleYear = Number(/(\d{4})/.exec(text)?.[1] || "");
        const url = convertIMDBPathToIMDBUrl(
          $movieTexts.find("a").attr("href")
        );

        // calculate match score - for sorting results
        let matchScore = 0;
        if (index < 4) {
          matchScore += 6 - index * 2;
        }
        if (name === nameWithoutYear || aka === nameWithoutYear) {
          matchScore += 4;
        }
        if (titleYear && requestedYear === titleYear) {
          matchScore += 4;
        }
        if ([TitleMainType.Movie, TitleMainType.Series].includes(titleType)) {
          matchScore += 3;
        }

        // push to the final list
        moviesList.push({
          source: {
            sourceId: extractIMDBIdFromUrl(url, "tt"),
            sourceType: Source.IMDB,
            sourceUrl: url,
          },
          name,
          aka,
          titleYear,
          url,
          titleType,
          matchScore,
          thumbnailImageUrl:
            $this.find("td").eq(0).find("img").first().attr("src") ?? "",
        });
      });

    return moviesList;
  }
}
