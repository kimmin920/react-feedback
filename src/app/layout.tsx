import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import type { Metadata } from 'next';

import Header from '../components/ui/header';
import { TooltipProvider } from '@/components/ui/tooltip';
import Providers from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='sticky top-0 bg-background text-foreground'>
        <Providers>
          <TooltipProvider>
            <main className='flex flex-col items-center'>{children}</main>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
