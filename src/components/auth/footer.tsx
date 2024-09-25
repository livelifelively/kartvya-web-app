import { ActionIcon, Anchor, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export const AuthFooter = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  return (
    <Group>
      <Anchor<'a'>
        onClick={() => {
          router.push('/about');
        }}
        size="sm"
      >
        About Us
      </Anchor>

      <ActionIcon
        variant="light"
        onClick={() => toggleColorScheme()}
        size={30}
        color={colorScheme === 'dark' ? 'yellow.8' : 'brandBlue.5'}
      >
        {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
      </ActionIcon>
    </Group>
  );
};
