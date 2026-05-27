import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { UrqlProvider } from '@/lib/urql';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'Last.fm Stats',
  description: 'View your Last.fm top artists and albums',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-950 text-white">
        <UrqlProvider>{children}</UrqlProvider>
      </body>
    </html>
  );
}
