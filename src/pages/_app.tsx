import '@mantine/core/styles.css';
import './global.css';
// import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { SessionProvider } from 'next-auth/react';
import { useTheme } from '../theme';
import AuthPageWrapper from '@/components/auth/auth-page-wrapper';
import {
  ColorScheme,
  ColorSchemeProvider,
} from '@/components/color-scheme-context/color-scheme-context';
import NextApp, { AppContext, AppProps } from 'next/app';
import { useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

function CustomApp(props: AppProps & { colorScheme: ColorScheme }) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const theme = useTheme(colorScheme);

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider defaultColorScheme={colorScheme}>
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
      </ColorSchemeProvider>
    </SessionProvider>
  );
}

CustomApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('kartvya-color-scheme', appContext.ctx) || 'dark',
  };
};

export default CustomApp;

// function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }: {
//   Component: any;
//   pageProps: any;
// }) {
//   const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
//   const theme = useTheme(colorScheme);

//   return (
//     <SessionProvider session={session}>
//       <ColorSchemeProvider defaultColorScheme={colorScheme}>
//         <MantineProvider theme={theme} defaultColorScheme="auto">
//           <Notifications position="top-right" />
//           <Head>
//             <title>kartvya</title>
//             <meta
//               name="viewport"
//               content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
//             />
//             <link rel="shortcut icon" href="/favicon.ico" />
//           </Head>
//           {Component.auth ? (
//             <AuthPageWrapper>
//               <Component {...pageProps} />
//             </AuthPageWrapper>
//           ) : (
//             <Component {...pageProps} />
//           )}
//         </MantineProvider>
//       </ColorSchemeProvider>
//     </SessionProvider>
//   );
// }
