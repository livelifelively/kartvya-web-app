import '@mantine/core/styles.css';

import './global.css';

import Head from 'next/head';
import NextApp, { AppContext } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// import { getCookie } from 'cookies-next';

import { ThemeProvider } from '../theme';
import CustomMantineProvider, { AuthComponentType, CustomAppProps } from '@/components/mantine-provider/mantine-provider';
import AuthPageWrapper from '@/components/auth/auth-page-wrapper';

function CustomApp(props: CustomAppProps) {
  const {
    Component,
    themeName,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <SessionProvider session={session}>
      <ThemeProvider themeType={themeName}>
        <CustomMantineProvider>
          <Head>
            <title>kartvya</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          {(Component as AuthComponentType).auth ? (
            <AuthPageWrapper>
              <Component {...pageProps} />
            </AuthPageWrapper>
          ) : (
            <Component {...pageProps} />
          )}
        </CustomMantineProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

CustomApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  
  // FIXME causing a bug. need to fix to enable theme switching
  // const themeName = getCookie('app-theme-name', appContext.ctx);
  const themeName = 'dark-default';

  return {
    ...appProps,
    themeName,
  };
};

export default CustomApp;