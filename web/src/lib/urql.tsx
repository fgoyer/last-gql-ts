'use client';

import { createClient, cacheExchange, fetchExchange, Provider } from 'urql';

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:4000',
  exchanges: [cacheExchange, fetchExchange],
});

export function UrqlProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
