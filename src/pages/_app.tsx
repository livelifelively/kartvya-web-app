import '@mantine/core/styles.css';
import './global.css';
// import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { SessionProvider } from 'next-auth/react';
import { useTheme } from '../theme';

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const theme = useTheme();
  return (
    <SessionProvider>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications position="top-right" />
        <Head>
          <title>kartvya</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}
