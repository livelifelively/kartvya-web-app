import { useThemeContext, themes } from '@/theme';
import { ActionIcon, Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
// import { useColorScheme } from '../color-scheme-context/color-scheme-context';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const { theme, colorScheme, toggleTheme } = useThemeContext();

  return (
    <ActionIcon
      variant="filled"
      onClick={() => {
        if (theme.name === 'light-default') {
          toggleTheme('dark-default');
          const newTheme = themes['dark-default'];
          setColorScheme(newTheme.colorScheme);
        } else if (theme.name === 'dark-default') {
          toggleTheme('light-default');
          const newTheme = themes['light-default'];
          setColorScheme(newTheme.colorScheme);
        }
      }}
      size={30}
      color={colorScheme === 'dark' ? 'brandYellow.6' : 'brandBlue.6'}
    >
      {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
    </ActionIcon>
  );
}
