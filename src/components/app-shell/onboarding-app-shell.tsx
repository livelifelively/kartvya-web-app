import { AppShell, Container, MantineSize } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

interface ResponsiveAppShellProps {
  children: ReactNode;
  containerSize?: MantineSize;
  asideContent?: ReactNode;
  navbarContent?: ReactNode;
}

export function OnboardingAppShell({
  children,
  containerSize = 'sm',
  asideContent,
  navbarContent,
}: ResponsiveAppShellProps) {
  const [opened] = useDisclosure();
  const navbarHiddenFrom: MantineSize = 'md';
  const asideHiddenFrom: MantineSize = 'md';

  return (
    <AppShell
      header={{ height: { base: 50, md: 60, lg: 70 } }}
      aside={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: asideHiddenFrom,
        collapsed: { mobile: !opened },
      }}
      navbar={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: navbarHiddenFrom,
      }}
      footer={{ height: { base: 60, md: 0 } }}
    >
      {navbarContent && (
        <AppShell.Navbar py="sm" withBorder>
          {navbarContent}
        </AppShell.Navbar>
      )}
      {asideContent && <AppShell.Aside p="md">{asideContent}</AppShell.Aside>}
      <AppShell.Main
        ps={{
          base: '0rem',
          xs: '0rem',
          sm: '0rem',
          md: 'calc(var(--app-shell-padding))',
        }}
        pe={{
          base: '0rem',
          xs: '0rem',
          sm: 'sm',
          md: 'calc(var(--app-shell-padding))',
        }}
        pt="0rem"
      >
        <Container size={containerSize} px={20} h="100vh">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
