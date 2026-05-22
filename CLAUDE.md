# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`last-gql-ts` is a GraphQL server that proxies the [Last.fm public REST API](https://www.last.fm/api). It is built with Apollo Server (v5), TypeScript (ESM), and `@apollo/datasource-rest`. It is intended as a backend for a Last.fm Android application.

## Environment Setup

Copy `.env.example` to `.env` and fill in:

```
LASTFM_API_KEY=your_api_key_here
LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0
PORT=4000
```

A valid `LASTFM_API_KEY` is required for the server to return real data. Register at https://www.last.fm/api/account/create.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server with hot reload (tsx watch)
npm run build      # compile TypeScript → dist/
npm start          # run compiled production build from dist/
```

There are no tests or linters configured yet.

## Architecture

The project follows a **schema-first GraphQL** pattern with three distinct layers:

### 1. Schema (`src/schema/typeDefs.graphql`)
SDL-only — no code generation. The `.graphql` file is loaded at runtime via `readFileSync` in `src/index.ts`. All new types, queries, and mutations are defined here first.

### 2. Resolvers (`src/resolvers/index.ts`)
Thin pass-through layer. Resolvers receive args, call the appropriate `dataSources.lastFmAPI.*` method, and return the result. No transformation logic lives here.

### 3. Data Source (`src/datasources/`)
- `LastFmAPI.ts` — extends `RESTDataSource`. Handles all HTTP calls to `ws.audioscrobbler.com/2.0`. Every request goes to the same base endpoint (`""`) with query params selecting the Last.fm method (e.g. `method: "user.getTopAlbums"`). `api_key` and `format: "json"` are injected via `baseParams()` on every request.
- `constants.ts` — `PERIOD_MAP` translates GraphQL enum values (e.g. `SEVEN_DAY`) to Last.fm period strings (e.g. `"7day"`).
- `modules/user.ts` — pure transform functions (`transformTopAlbums`, `transformTopArtists`) that reshape raw Last.fm REST responses into the shape expected by the GraphQL schema. All response mapping belongs here.

### Adding a new Last.fm endpoint

1. Add types and a query/mutation to `typeDefs.graphql`.
2. Add a transform function in the appropriate `src/datasources/modules/` file (or create a new module file, e.g. `artist.ts`).
3. Add a method to `LastFmAPI.ts` that calls `this.get(...)` with the relevant Last.fm `method` param and passes the response through the transform.
4. Add a resolver in `src/resolvers/index.ts` that delegates to the new data source method.

### Key conventions

- The project uses **ES modules** (`"type": "module"` in `package.json`). Internal imports must use `.js` extensions even for `.ts` source files (e.g. `import { resolvers } from "./resolvers/index.js"`).
- `__dirname` is not available natively in ESM; it is reconstructed using `fileURLToPath(import.meta.url)` — follow this pattern when you need path resolution.
- The `dataSources` context object is typed as `any` in resolvers; when adding resolvers, keep this consistent or tighten types incrementally.
- `moduleResolution: "bundler"` is set in `tsconfig.json`; use `tsx` for running TypeScript directly during development.
