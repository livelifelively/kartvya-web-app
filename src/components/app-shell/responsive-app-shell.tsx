import { AppShell, Burger, Container, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { Logo } from '../logo/logo';
import { BottomMobileTabs } from '../bottom-mobile-tabs/bottom-mobile-tabs';

interface ResponsiveAppShellProps {
  children: ReactNode;
}

export function ResponsiveAppShell({ children }: ResponsiveAppShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 50, md: 60, lg: 70 } }}
      navbar={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{ height: { base: 60, md: 0 } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="sm" gap="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo size={25} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="sm" withBorder={false}>
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
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
