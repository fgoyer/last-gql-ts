'use client';

import { Period } from '@/types/lastfm';

const PERIODS: { label: string; value: Period }[] = [
  { label: 'Overall', value: 'OVERALL' },
  { label: '7 days', value: 'SEVEN_DAY' },
  { label: '1 month', value: 'ONE_MONTH' },
  { label: '3 months', value: 'THREE_MONTH' },
  { label: '6 months', value: 'SIX_MONTH' },
  { label: '12 months', value: 'TWELVE_MONTH' },
];

interface Props {
  value: Period;
  onSelect: (period: Period) => void;
}

export default function PeriodSelector({ value, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => onSelect(p.value)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            value === p.value
              ? 'bg-red-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
