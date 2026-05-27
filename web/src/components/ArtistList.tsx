'use client';

import { useQuery } from 'urql';
import { TOP_ARTISTS_QUERY } from '@/lib/queries';
import type { Period, TopArtistsResponse, MediaImage } from '@/types/lastfm';

interface Props {
  username: string;
  period: Period;
}

function getImageUrl(images: MediaImage[]): string | undefined {
  return (
    images.find((img) => img.size === 'medium')?.url ||
    images.find((img) => img.url)?.url
  );
}

export default function ArtistList({ username, period }: Props) {
  const [{ data, fetching, error }] = useQuery<TopArtistsResponse>({
    query: TOP_ARTISTS_QUERY,
    variables: { user: username, period },
  });

  if (fetching) return <p className="py-8 text-center text-zinc-500 text-sm">Loading…</p>;
  if (error) return <p className="py-8 text-center text-red-400 text-sm">Error: {error.message}</p>;
  if (!data) return null;

  const { artists, meta } = data.userTopArtists;

  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500">{meta.total} artists tracked</p>
      <div className="divide-y divide-zinc-800">
        {artists.map((artist) => {
          const img = getImageUrl(artist.images);
          return (
            <div key={artist.rank} className="flex items-center gap-3 py-3">
              <span className="w-6 text-right text-xs text-zinc-500">{artist.rank}</span>
              {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt="" className="h-10 w-10 rounded-sm object-cover bg-zinc-800" />
              ) : (
                <div className="h-10 w-10 rounded-sm bg-zinc-800" />
              )}
              <a
                href={artist.url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-sm font-medium text-white hover:text-red-400 truncate"
              >
                {artist.name}
              </a>
              <span className="text-xs text-zinc-400 tabular-nums">
                {Number(artist.playcount).toLocaleString()} plays
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
