'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import PeriodSelector from '@/components/PeriodSelector';
import TabNav from '@/components/TabNav';
import ArtistList from '@/components/ArtistList';
import AlbumList from '@/components/AlbumList';
import type { Period } from '@/types/lastfm';

type Tab = 'artists' | 'albums';

export default function Home() {
  const [username, setUsername] = useState('');
  const [period, setPeriod] = useState<Period>('OVERALL');
  const [tab, setTab] = useState<Tab>('artists');

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-red-500">Last.fm</span> Stats
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Look up top artists and albums for any Last.fm user.
        </p>
      </header>

      <SearchForm onSubmit={setUsername} />

      {username && (
        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-300">
              Stats for <span className="font-semibold text-white">{username}</span>
            </span>
          </div>
          <PeriodSelector value={period} onSelect={setPeriod} />
          <TabNav active={tab} onSelect={setTab} />
          <div className="pt-1">
            {tab === 'artists' && <ArtistList username={username} period={period} />}
            {tab === 'albums' && <AlbumList username={username} period={period} />}
          </div>
        </div>
      )}
    </main>
  );
}
