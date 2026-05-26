import type { LastFmAPI } from "../datasources/LastFmAPI.js";
import type { TopAlbumsResult, TopArtistsResult } from "../datasources/types.js";

interface DataSources {
  lastFmAPI: LastFmAPI;
}

export const resolvers = {
  Query: {
    userTopAlbums: (
      _: unknown,
      args: { user: string; period?: string; limit?: number; page?: number },
      { dataSources }: { dataSources: DataSources }
    ): Promise<TopAlbumsResult> => {
      return dataSources.lastFmAPI.getUserTopAlbums(
        args.user, args.period ?? "overall", args.limit, args.page
      );
    },
    userTopArtists: (
      _: unknown,
      args: { user: string; period?: string; limit?: number; page?: number },
      { dataSources }: { dataSources: DataSources }
    ): Promise<TopArtistsResult> => {
      return dataSources.lastFmAPI.getUserTopArtists(
        args.user, args.period ?? "overall", args.limit, args.page
      );
    },
  },
};
