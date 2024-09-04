import '@mantine/core/styles.css';
import './global.css';
// import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { SessionProvider } from 'next-auth/react';
import { useTheme } from '../theme';
import AuthPageWrapper from '@/components/auth/auth-page-wrapper';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: any;
  pageProps: any;
}) {
  const theme = useTheme();
  return (
    <SessionProvider session={session}>
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
        {Component.auth ? (
          <AuthPageWrapper>
            <Component {...pageProps} />
          </AuthPageWrapper>
        ) : (
          <Component {...pageProps} />
        )}
      </MantineProvider>
    </SessionProvider>
  );
}
