import { RESTDataSource } from "@apollo/datasource-rest";
import { PERIOD_MAP } from "./constants.js";
import { transformTopAlbums, transformTopArtists } from "./modules/user.js";
import type {
  LastFmTopAlbumsResponse,
  LastFmTopArtistsResponse,
  TopAlbumsResult,
  TopArtistsResult,
} from "./types.js";

export class LastFmAPI extends RESTDataSource {
  private apiKey: string;

  constructor(apiKey: string, baseURL: string) {
    super();
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  private baseParams(): { api_key: string; format: string } {
    return {
      api_key: this.apiKey,
      format: "json",
    };
  }

  async getUserTopAlbums(user: string, period: string, limit?: number, page?: number): Promise<TopAlbumsResult> {
    const response = await this.get<LastFmTopAlbumsResponse>("", {
      params: {
        ...this.baseParams(), method: "user.getTopAlbums", user, period: PERIOD_MAP[period] ?? "overall", limit: String(limit), page: String(page)
      },
    });
    return transformTopAlbums(response);
  }

  async getUserTopArtists(user: string, period: string, limit?: number, page?: number): Promise<TopArtistsResult> {
    const response = await this.get<LastFmTopArtistsResponse>("", {
      params: {
        ...this.baseParams(), method: "user.getTopArtists", user, period: PERIOD_MAP[period] ?? "overall", limit: String(limit), page: String(page)
      },
    });
    return transformTopArtists(response);
  }
}
