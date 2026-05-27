'use client';

type Tab = 'artists' | 'albums';

interface Props {
  active: Tab;
  onSelect: (tab: Tab) => void;
}

const TABS: { label: string; value: Tab }[] = [
  { label: 'Artists', value: 'artists' },
  { label: 'Albums', value: 'albums' },
];

export default function TabNav({ active, onSelect }: Props) {
  return (
    <div className="flex border-b border-zinc-800">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onSelect(tab.value)}
          className={`px-5 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
            active === tab.value
              ? 'border-red-500 text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
      <span
        title="Coming soon"
        className="px-5 py-2 text-sm font-medium text-zinc-600 cursor-not-allowed border-b-2 border-transparent -mb-px"
      >
        Tracks
      </span>
    </div>
  );
}
