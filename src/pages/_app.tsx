import Head from 'next/head';
import type { AppProps } from 'next/app';

import { Roboto } from '@next/font/google';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700', '900'] });

import '@/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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

      <Component {...pageProps} />
    </>
  );
}
