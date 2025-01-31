import { Burger, Button, Group, MantineSize } from '@mantine/core';
import { useSession, signOut, signIn } from 'next-auth/react';

import { Logo } from '../logo/logo';
// import { ColorSchemeToggle } from '../color-scheme-toggle/color-scheme-toggle';

interface HeaderProps {
  navbarControls?: { opened: boolean; toggle: any; hiddenFrom: MantineSize };
}

export function Header({ navbarControls }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <Group h="100%" gap="xs" justify="space-between">
      <Group>
        {navbarControls && (
          <Burger
            opened={navbarControls.opened}
            onClick={navbarControls.toggle}
            hiddenFrom={navbarControls.hiddenFrom || 'md'}
            size="sm"
          />
        )}
        <Logo size={25} />
      </Group>
      <Group>
        {/* <ColorSchemeToggle /> */}
        {session && (
          <Button variant="filled" size="xs" onClick={() => signOut()}>
            Logout
          </Button>
        )}
        {!session && (
          <Button variant="filled" size="xs" onClick={() => signIn()}>
            Login
          </Button>
        )}
      </Group>
    </Group>
  );
}
