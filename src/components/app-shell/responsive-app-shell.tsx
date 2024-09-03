import { AppShell, Container, MantineSize, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

import { BottomMobileTabs } from '../bottom-mobile-tabs/bottom-mobile-tabs';
import { Header } from '../header/header';

interface ResponsiveAppShellProps {
  children: ReactNode;
}

export function ResponsiveAppShell({ children }: ResponsiveAppShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const navbarHiddenFrom: MantineSize = 'md';

  return (
    <AppShell
      header={{ height: { base: 50, md: 60, lg: 70 } }}
      navbar={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: navbarHiddenFrom,
        collapsed: { mobile: !opened },
      }}
      footer={{ height: { base: 60, md: 0 } }}
      padding="md"
    >
      {/* <AppShell.Header>
        <Group h="100%" px="sm" gap="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo size={25} />
        </Group>
      </AppShell.Header> */}
      <AppShell.Header>
        <Header navbarControls={{ opened, toggle, hiddenFrom: navbarHiddenFrom }} />
      </AppShell.Header>
      <AppShell.Navbar p="sm" withBorder={false}>
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
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
        <Container size="sm" px={0}>
          {children}
        </Container>
      </AppShell.Main>
      <AppShell.Footer p="none">
        <BottomMobileTabs />
      </AppShell.Footer>
    </AppShell>
  );
}
