import { Source, TitleMainType } from "./enums";
import { IFoundedTitleDetails } from "./interfaces";
import axios from "axios";
import cheerio from "cheerio";
import { IMDB_BASE_URL, IMDB_TITLE_SEARCH_URL } from "./constants";

export async function findTitleWithName(
  queryName: string,
  {
    exactMatch = false,
    specificType,
  }: { exactMatch?: boolean; specificType?: TitleMainType } = {}
): Promise<IFoundedTitleDetails[]> {
  queryName = queryName.toLowerCase();
  // in feature we can add more sources for finding titles
  // for now we just using imdb searcher
  const imdbResult = await searchForTitleInIMDBWithName(queryName, exactMatch);

  // do sort and filters
  const finalResult = imdbResult
    .filter((i) =>
      //  filter specific types
      specificType ? i.titleType === specificType : true
    )
    .sort((a, b) => b.matchScore - a.matchScore);

  return finalResult;
}

async function searchForTitleInIMDBWithName(
  queryName: string,
  exactMatch = false
): Promise<IFoundedTitleDetails[]> {
  const nameExecDetails = /(.+)\s(\d{4})\s*$/.exec(queryName);
  let nameWithoutYear: string, requestedYear: number | null;
  nameWithoutYear = queryName;
  if (Array.isArray(nameExecDetails)) {
    nameWithoutYear = nameExecDetails[1];
    requestedYear = Number(nameExecDetails[2]);
  }

  // getting result from imdb page by http request
  const IMDBPageResult = await axios({
    method: "get",
    url: IMDB_TITLE_SEARCH_URL,
    params: {
      q: nameWithoutYear,
      exact: exactMatch,
      s: "tt",
      ref: "fn_tt_ex",
    },
  });

  // parse page content for jquery like
  const $ = cheerio.load(IMDBPageResult.data);
  const moviesList: IFoundedTitleDetails[] = [];

  // find rows of result (jquery like) and push it with proper format to result list
  $("table.findList")
    .first()
    .find("tr")
    .each(function (index) {
      // exclude vars from result row
      const $this = $(this);
      const $movieTexts = $this.find("td:eq(1)");
      const text = $movieTexts.text().toLowerCase();
      const name = $movieTexts.find("a").text().toLowerCase();
      const aka = /aka\s"(.+)"/.exec(text)?.[1] ?? "";
      const titleType = /(.*episode.*)\s*$/i.test(text)
        ? TitleMainType.SeriesEpisode
        : /(.*series.*)\s*$/i.test(text)
        ? TitleMainType.Series
        : TitleMainType.Movie;
      const titleYear = Number(/(\d{4})/.exec(text)?.[1] || "");
      const url = IMDB_BASE_URL + $movieTexts.find("a").attr("href") ?? "";

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

      // push to the final list
      moviesList.push({
        source: Source.IMDB,
        name,
        aka,
        titleYear,
        url,
        titleType,
        matchScore,
        thumbnailImage:
          $this.find("td").eq(0).find("img").first().attr("src") ?? "",
      });
    });

  return moviesList;
}
