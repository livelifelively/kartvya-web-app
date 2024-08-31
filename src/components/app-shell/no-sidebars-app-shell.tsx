import Head from 'next/head';
import { AppShell as AppShellCore, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import ServerOverload from '../error-pages/500';

/* eslint-disable-next-line */
export interface NoSideBarsAppShellProps {
  children: React.ReactNode;
  title: string;
  // footerType?: any;
  // error?: boolean;
}

export function NoSideBarsAppShell({
  children,
  title = 'Welcome to Kartvya!',
}: NoSideBarsAppShellProps) {
  // if (error) {
  //   return <ServerOverload />;
  // }
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="app">
        <AppShellCore
          styles={(theme: any) => ({
            body: {
              // backgroundColor: theme.colorScheme === 'dark' ? 'rgb(0, 0, 0)' : theme.white,
              paddingBottom: rem(50),
            },
            main: {
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              // [theme.fn.largerThan('md')]: {
              //   paddingLeft: `calc(${theme.spacing.xl} * 1.5)`,
              //   paddingRight: `calc(${theme.spacing.xl} * 1.5)`,
              // },
              paddingTop: theme.spacing.xl,
              minHeight: 'unset',
            },
            root: {
              // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.brandBlue[0],
              // minHeight: '100vh',
            },
          })}
          layout="alt"
          header={{ height: 60 }}
        >
          <AppShellCore.Header>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div>Logo</div>
          </AppShellCore.Header>
          {children}
        </AppShellCore>
      </main>
    </>
  );
}

export default NoSideBarsAppShell;
