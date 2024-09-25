import '@mantine/core/styles.css';
import './global.css';
import Head from 'next/head';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../theme';
import AuthPageWrapper from '@/components/auth/auth-page-wrapper';
import NextApp, { AppContext } from 'next/app';
import { getCookie } from 'cookies-next';

// Extend NextComponentType to include the auth property
import CustomMantineProvider, {
  AuthComponentType,
  CustomAppProps,
} from '@/components/mantine-provider/mantine-provider';

function CustomApp(props: CustomAppProps) {
  const {
    Component,
    themeName,
    pageProps: { session, ...pageProps },
  } = props;
  // const { theme, toggleTheme } = useThemeContext();
  // const mantineTheme = useTheme(theme);

  return (
    <SessionProvider session={session}>
      <ThemeProvider themeType={themeName}>
        <CustomMantineProvider>
          <Notifications position="top-right" />
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
  const themeName = getCookie('app-theme-name', appContext.ctx);
  return {
    ...appProps,
    themeName,
  };
};

export default CustomApp;
