import Head from 'next/head';
import { AppShell, Container, rem } from '@mantine/core';

import { BottomMobileTabs } from '../bottom-mobile-tabs/bottom-mobile-tabs';
import { Header } from '../header/header';
// import ServerOverload from '../error-pages/500';

/* eslint-disable-next-line */
export interface NoSideBarsAppShellProps {
  children: React.ReactNode;
  title: string;
  showFooter?: boolean;
  // footerType?: any;
  // error?: boolean;
}

export function NoSideBarsAppShell({
  children,
  title = 'Welcome to Kartvya!',
  showFooter,
}: NoSideBarsAppShellProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="app">
        <AppShell
          layout="alt"
          header={{ height: { base: 50, md: 60, lg: 70 }, offset: true }}
          footer={{ height: { base: 60 }, offset: true }}
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>
          <AppShell.Main
            ps={{
              base: '0rem',
              xs: '0rem',
              sm: '0rem',
              md: 'calc(var(--app-shell-navbar-offset, 0rem) + var(--app-shell-padding))',
            }}
            pe={{
              base: '0rem',
              xs: '0rem',
              sm: '0rem',
              md: 'calc(var(--app-shell-aside-offset, 0rem) + var(--app-shell-padding))',
            }}
          >
            <Container fluid px={0} pt={rem('20px')} pb={rem(30)}>
              {children}
            </Container>
          </AppShell.Main>
          {showFooter && (
            <AppShell.Footer p="none">
              <BottomMobileTabs />
            </AppShell.Footer>
          )}
        </AppShell>
      </main>
    </>
  );
}

export default NoSideBarsAppShell;
