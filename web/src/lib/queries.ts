export const TOP_ARTISTS_QUERY = `
  query GetTopArtists($user: String!, $period: Period) {
    userTopArtists(user: $user, period: $period) {
      artists {
        name
        playcount
        rank
        url
        images { url size }
      }
      meta { total page perPage totalPages user }
    }
  }
`;

export const TOP_ALBUMS_QUERY = `
  query GetTopAlbums($user: String!, $period: Period) {
    userTopAlbums(user: $user, period: $period) {
      albums {
        name
        playcount
        rank
        url
        artist { name url }
        images { url size }
      }
      meta { total page perPage totalPages user }
    }
  }
`;
