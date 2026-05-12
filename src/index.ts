import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { resolvers } from "./resolvers/index.js";
import { LastFmAPI } from "./datasources/LastFmAPI.js";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const typeDefs = readFileSync(
  resolve(__dirname, "./schema/typeDefs.graphql"),
  "utf-8"
);

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 4000 },
  context: async () => ({
    dataSources: {
      lastFmAPI: new LastFmAPI(
        process.env.LASTFM_API_KEY!,
        process.env.LASTFM_BASE_URL!
      ),
    },
  }),
});

console.log(`🚀 Last.fm GraphQL server ready at ${url}`);