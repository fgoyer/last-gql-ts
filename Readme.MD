# 🎵 last-gql-ts

A GraphQL server that wraps the [Last.fm public REST API](https://www.last.fm/api), built with Node.js, TypeScript, and Apollo Server. Originally designed as a backend for a Last.fm Android application (Coming Soon).

---

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **GraphQL Server**: Apollo Server
- **Data Fetching**: Apollo `RESTDataSource`
- **Schema**: Schema-first (SDL)
- **Dev Server**: `tsx watch`

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A Last.fm API account and key — register at [https://www.last.fm/api/account/create](https://www.last.fm/api/account/create)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/last-gql-ts.git
cd last-gql-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
LASTFM_API_KEY=your_api_key_here
LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0
PORT=4000
```

| Variable | Description |
|---|---|
| `LASTFM_API_KEY` | Your Last.fm API key. Get one at [last.fm/api](https://www.last.fm/api/account/create) |
| `LASTFM_BASE_URL` | The Last.fm REST API base URL. Do not change this. |
| `PORT` | The port the GraphQL server will listen on. Defaults to `4000`. |

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

You should see:

```
🚀 Last.fm GraphQL server ready at http://localhost:4000/
```

Open `http://localhost:4000` in your browser to access the Apollo Sandbox explorer.

---

## Project Structure

```
last-gql-ts/
├── src/
│   ├── datasources/
│   │   └── LastFmAPI.ts       # RESTDataSource wrapping the Last.fm REST API
│   ├── schema/
│   │   └── typeDefs.graphql   # GraphQL SDL schema definitions
│   ├── resolvers/
│   │   └── index.ts           # GraphQL resolvers
│   └── index.ts               # Apollo Server entry point
├── .env                       # Local environment variables (git-ignored)
├── .env.example               # Example environment variable template
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript in `/dist` |
| `npm start` | Run the compiled production build |

---

## Supported GraphQL Queries

### `userTopAlbums`

Wraps the [`user.getTopAlbums`](https://www.last.fm/api/show/user.getTopAlbums) Last.fm endpoint.

```graphql
query GetTopAlbums {
  userTopAlbums(user: "rj", period: SEVEN_DAY, limit: 5) {
    meta {
      user
      total
      page
      totalPages
    }
    albums {
      rank
      name
      playcount
      url
      artist {
        name
        url
      }
      images {
        size
        url
      }
    }
  }
}
```

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `user` | `String` | ✅ | The Last.fm username to fetch data for |
| `period` | `Period` | ❌ | Time period. Defaults to `OVERALL` |
| `limit` | `Int` | ❌ | Number of results per page. Defaults to `10` |
| `page` | `Int` | ❌ | Page number. Defaults to `1` |

**`Period` enum values**

| Value | Last.fm period |
|---|---|
| `OVERALL` | All time |
| `SEVEN_DAY` | Last 7 days |
| `ONE_MONTH` | Last month |
| `THREE_MONTH` | Last 3 months |
| `SIX_MONTH` | Last 6 months |
| `TWELVE_MONTH` | Last 12 months |

---

## Last.fm API Reference

Full API documentation: [https://www.last.fm/api](https://www.last.fm/api)

---

## License

MIT