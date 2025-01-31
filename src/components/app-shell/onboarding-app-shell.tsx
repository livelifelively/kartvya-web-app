import { AppShell, Container, MantineSize } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

import { BottomMobileTabs } from '../bottom-mobile-tabs/bottom-mobile-tabs';
import { Header } from '../header/header';
import { NavbarNested } from './navbar-nested';

interface ResponsiveAppShellProps {
  children: ReactNode;
  containerSize?: MantineSize;
  asideContent: ReactNode;
  navbarContent: ReactNode;
}

export function OnboardingAppShell({
  children,
  containerSize = 'sm',
  asideContent,
  navbarContent,
}: ResponsiveAppShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const navbarHiddenFrom: MantineSize = 'md';

  return (
    <AppShell
      header={{ height: { base: 50, md: 60, lg: 70 } }}
      aside={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: navbarHiddenFrom,
        collapsed: { mobile: !opened },
      }}
      footer={{ height: { base: 60, md: 0 } }}
    >
      <AppShell.Header px={{ base: 'xs', sm: 'xl' }}>
        <Header navbarControls={{ opened, toggle, hiddenFrom: navbarHiddenFrom }} />
      </AppShell.Header>
      <AppShell.Navbar py="sm" withBorder={true}>
        {navbarContent}
      </AppShell.Navbar>
      <AppShell.Aside p="md">{asideContent}</AppShell.Aside>
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
        <Container size={containerSize} px={0} my="lg">
          {children}
        </Container>
      </AppShell.Main>
      <AppShell.Footer p="none" withBorder={false}>
        <BottomMobileTabs />
      </AppShell.Footer>
    </AppShell>
  );
}
