import Head from 'next/head';
import { AppShell, Container, Group, rem } from '@mantine/core';
import { Logo } from '../logo/logo';

/* eslint-disable-next-line */
export interface AuthShellProps {
  children: React.ReactNode;
  title: string;
  footerType?: any;
  showHeader?: boolean;
  showFooter?: boolean;
  showBackground?: boolean;
  error?: boolean;
}

export function AuthShell({ children, title = 'Welcome to Kartvya' }: AuthShellProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="app">
        <AppShell layout="alt" header={{ height: { base: 50, md: 60, lg: 70 }, offset: true }}>
          <AppShell.Header>
            <Group h="100%" px="sm" gap="xs">
              {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
              <Logo size={25} />
            </Group>
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
            <Container size="lg" px={0} pt={rem('20px')} pb={rem(30)}>
              {children}
            </Container>
          </AppShell.Main>
        </AppShell>
      </main>
    </>
  );
}

export default AuthShell;
