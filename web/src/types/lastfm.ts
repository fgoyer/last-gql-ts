export type Period =
  | 'OVERALL'
  | 'SEVEN_DAY'
  | 'ONE_MONTH'
  | 'THREE_MONTH'
  | 'SIX_MONTH'
  | 'TWELVE_MONTH';

export interface MediaImage {
  url: string;
  size: string;
}

export interface Artist {
  name: string;
  mbid?: string;
  url: string;
}

export interface TopArtist {
  name: string;
  playcount: string;
  mbid?: string;
  url: string;
  images: MediaImage[];
  rank: number;
}

export interface Album {
  name: string;
  playcount: string;
  mbid?: string;
  url: string;
  artist: Artist;
  images: MediaImage[];
  rank: number;
}

export interface PaginationMeta {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface TopArtistsResponse {
  userTopArtists: {
    artists: TopArtist[];
    meta: PaginationMeta;
  };
}

export interface TopAlbumsResponse {
  userTopAlbums: {
    albums: Album[];
    meta: PaginationMeta;
  };
}
