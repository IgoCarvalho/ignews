import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Roboto } from '@next/font/google';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700', '900'] });

import { Header } from '@/components/Header/Header';

import '@/styles/global.scss';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <style>
          {`
            html {
              font-family: ${roboto.style.fontFamily};
            }
          `}
        </style>

        <title>ignews</title>
      </Head>

      <Header />

      <Component {...pageProps} />
    </SessionProvider>
  );
}
