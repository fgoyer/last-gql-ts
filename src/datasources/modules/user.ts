
export function transformTopAlbums(raw: any) {
  const { topalbums: { album, "@attr": attr } } = raw;
  return {
    albums: album.map((a: any) => ({
      name: a.name,
      playcount: a.playcount,
      mbid: a.mbid || null,
      url: a.url,
      rank: parseInt(a["@attr"].rank, 10),
      artist: { name: a.artist.name, mbid: a.artist.mbid || null, url: a.artist.url },
      images: a.image.map((img: any) => ({ url: img["#text"], size: img.size })),
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

export function transformTopArtists(raw: any) {
    const { topartists: { artist, "@attr": attr } } = raw;
    return {
      artists: artist.map((a: any) => ({
        name: a.name,
        playcount: a.playcount,
        mbid: a.mbid || null,
        url: a.url,
        rank: parseInt(a["@attr"].rank, 10),
        images: a.image.map((img: any) => ({ url: img["#text"], size: img.size })),
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