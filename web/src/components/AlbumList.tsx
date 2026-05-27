'use client';

import { useQuery } from 'urql';
import { TOP_ALBUMS_QUERY } from '@/lib/queries';
import type { Period, TopAlbumsResponse, MediaImage } from '@/types/lastfm';

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

export default function AlbumList({ username, period }: Props) {
  const [{ data, fetching, error }] = useQuery<TopAlbumsResponse>({
    query: TOP_ALBUMS_QUERY,
    variables: { user: username, period },
  });

  if (fetching) return <p className="py-8 text-center text-zinc-500 text-sm">Loading…</p>;
  if (error) return <p className="py-8 text-center text-red-400 text-sm">Error: {error.message}</p>;
  if (!data) return null;

  const { albums, meta } = data.userTopAlbums;

  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500">{meta.total} albums tracked</p>
      <div className="divide-y divide-zinc-800">
        {albums.map((album) => {
          const img = getImageUrl(album.images);
          return (
            <div key={album.rank} className="flex items-center gap-3 py-3">
              <span className="w-6 text-right text-xs text-zinc-500">{album.rank}</span>
              {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt="" className="h-10 w-10 rounded-sm object-cover bg-zinc-800" />
              ) : (
                <div className="h-10 w-10 rounded-sm bg-zinc-800" />
              )}
              <div className="flex flex-col flex-1 min-w-0">
                <a
                  href={album.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-white hover:text-red-400 truncate"
                >
                  {album.name}
                </a>
                <a
                  href={album.artist.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-zinc-400 hover:text-zinc-200 truncate"
                >
                  {album.artist.name}
                </a>
              </div>
              <span className="text-xs text-zinc-400 tabular-nums">
                {Number(album.playcount).toLocaleString()} plays
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
