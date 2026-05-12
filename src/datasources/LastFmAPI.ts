import { RESTDataSource } from "@apollo/datasource-rest";

// Maps our clean GraphQL enum values to Last.fm's API period strings
const PERIOD_MAP: Record<string, string> = {
  OVERALL: "overall",
  SEVEN_DAY: "7day",
  ONE_MONTH: "1month",
  THREE_MONTH: "3month",
  SIX_MONTH: "6month",
  TWELVE_MONTH: "12month",
};

export class LastFmAPI extends RESTDataSource {
  private apiKey: string;

  constructor(apiKey: string, baseURL: string) {
    super();
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  // Base params sent with every Last.fm request
  private baseParams() {
    return {
      api_key: this.apiKey,
      format: "json",
    };
  }

  async getUserTopAlbums(
    user: string,
    period = "OVERALL",
    limit = 10,
    page = 1
  ) {
    const response = await this.get("", {
      params: {
        ...this.baseParams(),
        method: "user.getTopAlbums",
        user,
        period: PERIOD_MAP[period] ?? "overall",
        limit: String(limit),
        page: String(page),
      },
    });

    return this.transformTopAlbums(response);
  }

  // Transforms Last.fm's raw REST response into our clean GraphQL shape
  private transformTopAlbums(raw: any) {
    const { topalbums } = raw;
    const { album, "@attr": attr } = topalbums;

    return {
      albums: album.map((a: any) => ({
        name: a.name,
        playcount: a.playcount,
        mbid: a.mbid || null,
        url: a.url,
        rank: parseInt(a["@attr"].rank, 10),
        artist: {
          name: a.artist.name,
          mbid: a.artist.mbid || null,
          url: a.artist.url,
        },
        images: a.image.map((img: any) => ({
          url: img["#text"],
          size: img.size,
        })),
      })),
      meta: {
        user: attr.user,
        totalPages: attr.totalPages,
        page: attr.page,
        perPage: attr.perPage,
        total: attr.total,
      },
    };
  }
}