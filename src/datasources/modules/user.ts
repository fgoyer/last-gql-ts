import type {
  LastFmTopAlbumsResponse,
  LastFmTopArtistsResponse,
  TopAlbumsResult,
  TopArtistsResult,
} from "../types.js";

export function transformTopAlbums(raw: LastFmTopAlbumsResponse): TopAlbumsResult {
  const { topalbums: { album, "@attr": attr } } = raw;
  return {
    albums: album.map((a) => ({
      name: a.name,
      playcount: a.playcount,
      mbid: a.mbid || null,
      url: a.url,
      rank: parseInt(a["@attr"].rank, 10),
      artist: { name: a.artist.name, mbid: a.artist.mbid || null, url: a.artist.url },
      images: a.image.map((img) => ({ url: img["#text"], size: img.size })),
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

export function transformTopArtists(raw: LastFmTopArtistsResponse): TopArtistsResult {
  const { topartists: { artist, "@attr": attr } } = raw;
  return {
    artists: artist.map((a) => ({
      name: a.name,
      playcount: a.playcount,
      mbid: a.mbid || null,
      url: a.url,
      rank: parseInt(a["@attr"].rank, 10),
      images: a.image.map((img) => ({ url: img["#text"], size: img.size })),
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
