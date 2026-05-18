
import { RESTDataSource } from "@apollo/datasource-rest";
import { PERIOD_MAP } from "./constants";
import { transformTopAlbums, transformTopArtists } from "./modules/user";

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

  async getUserTopAlbums(user: string, period: string, limit?: number, page?: number) {
    const response = await this.get("", {
      params: {
        ...this.baseParams(), method: "user.getTopAlbums", user, period: PERIOD_MAP[period] ?? "overall", limit: String(limit), page: String(page)
      },
    });
    return transformTopAlbums(response);
  }

  async getUserTopArtists(user: string, period: string, limit?: number, page?: number) {
    const response = await this.get("", {
      params: {
        ...this.baseParams(), method: "user.getTopArtists", user, period: PERIOD_MAP[period] ?? "overall", limit: String(limit), page: String(page)
      },
    });
    return transformTopArtists(response);
  }
}