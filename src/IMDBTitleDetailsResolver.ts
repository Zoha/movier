import cheerio, { CheerioAPI } from "cheerio";
import axios from "axios";
import { Genre, Language, Source } from "./enums";
import { ISourceDetails, ITitle, ITitleDetailsResolver } from "./interfaces";
import { camelCase } from "change-case";

export class IMDBTitleDetailsResolver implements ITitleDetailsResolver {
  private url: string;
  private mainPageHTMLData = "";
  private releaseInfoPageHTMLData = "";

  // cheerio loaded instances
  private mainPageCheerio!: CheerioAPI;
  private releaseInfoPageCheerio!: CheerioAPI;

  constructor(url: string) {
    this.url = url;
  }

  async getDetails(): Promise<ITitle | undefined> {
    await Promise.all([
      this.getMainPageHTMLData(),
      this.getReleaseInfoPageHTMLData(),
    ]);

    return this.generateReturnDetailsData();
  }

  async getMainPageHTMLData() {
    const apiResult = await axios.get(this.url);
    this.mainPageHTMLData = apiResult.data;
    this.mainPageCheerio = cheerio.load(this.mainPageHTMLData);
  }

  async getReleaseInfoPageHTMLData() {
    const releaseInfoPageUrl = new URL(this.url);
    releaseInfoPageUrl.pathname =
      releaseInfoPageUrl.pathname.replace(/\/$/, "") + "/releaseinfo";
    const apiResult = await axios.get(releaseInfoPageUrl.href);
    this.releaseInfoPageHTMLData = apiResult.data;
    this.releaseInfoPageCheerio = cheerio.load(this.releaseInfoPageHTMLData);
  }

  generateReturnDetailsData() {
    const res: Partial<ITitle> = {
      detailsLang: Language.English,
      mainSource: this.mainSourceDetails,
      allSources: this.allSources,
      name: this.name,
      worldWideName: this.worldWideName,
      otherNames: this.allUniqueNames,
      titleYear: this.titleYear,
      genres: this.genres,
      // directors: IPersonDetails[];
      // writers: IWriterDetails[];
      // mainType: TitleMainType;
      // plot: string;
      // casts: ICastDetails[];
    };

    console.log(res);
    return undefined;
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
    // extract source id from url
    if (!this.url) {
      return "";
    }
    return this.url
      .replace(/\/$/, "")
      .split("/")
      .filter((i) => /^tt\d+/.test(i))
      .slice(-1)[0];
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
        title: $this.find("td").first().text().toLowerCase(),
        name: $this.find("td").last().text().toLowerCase(),
      });
    });
    return allNames;
  }

  get allUniqueNames(): string[] {
    return [...new Set(this.allNames.map((i) => i.name))];
  }

  get nameInMainPage(): string {
    const $ = this.mainPageCheerio;
    return $("h1").first().text() || "";
  }

  get worldWideName(): string {
    return (
      this.allNames.find((i) => i.title.toLowerCase().includes("world-wide"))
        ?.name || ""
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
    $("[data-testid=genres] a").each(function () {
      originalIMDBGenres.push($(this).find("span").first()?.text?.() || "");
    });

    const genreEnumValues = Object.values(Genre);

    return originalIMDBGenres
      .map((genre) => camelCase(genre))
      .filter((oGenre) => genreEnumValues.includes(oGenre as Genre)) as Genre[];
  }
}
