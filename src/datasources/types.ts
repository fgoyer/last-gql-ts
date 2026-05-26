// Raw shapes returned by the Last.fm REST API
export interface LastFmImage {
  "#text": string;
  size: string;
}

export interface LastFmPageAttr {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface LastFmRawArtistRef {
  name: string;
  mbid: string;
  url: string;
}

export interface LastFmRawAlbum {
  name: string;
  playcount: string;
  mbid: string;
  url: string;
  "@attr": { rank: string };
  artist: LastFmRawArtistRef;
  image: LastFmImage[];
}

export interface LastFmTopAlbumsResponse {
  topalbums: {
    album: LastFmRawAlbum[];
    "@attr": LastFmPageAttr;
  };
}

export interface LastFmRawArtist {
  name: string;
  playcount: string;
  mbid: string;
  url: string;
  "@attr": { rank: string };
  image: LastFmImage[];
}

export interface LastFmTopArtistsResponse {
  topartists: {
    artist: LastFmRawArtist[];
    "@attr": LastFmPageAttr;
  };
}

// Output shapes returned to GraphQL resolvers — mirror the SDL types
export interface MediaImage {
  url: string;
  size: string;
}

export interface Artist {
  name: string;
  mbid: string | null;
  url: string;
}

export interface PaginationMeta {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface Album {
  name: string;
  playcount: string;
  mbid: string | null;
  url: string;
  rank: number;
  artist: Artist;
  images: MediaImage[];
}

export interface TopArtist {
  name: string;
  playcount: string;
  mbid: string | null;
  url: string;
  rank: number;
  images: MediaImage[];
}

export interface TopAlbumsResult {
  albums: Album[];
  meta: PaginationMeta;
}

export interface TopArtistsResult {
  artists: TopArtist[];
  meta: PaginationMeta;
}
