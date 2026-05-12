export const resolvers = {
  Query: {
    userTopAlbums: async (
      _: unknown,
      args: {
        user: string;
        period?: string;
        limit?: number;
        page?: number;
      },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.lastFmAPI.getUserTopAlbums(
        args.user,
        args.period,
        args.limit,
        args.page
      );
    },
  },
};