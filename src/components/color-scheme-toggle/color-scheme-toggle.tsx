import { useThemeContext, themes } from '@/theme';
import { ActionIcon, Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
// import { useColorScheme } from '../color-scheme-context/color-scheme-context';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  // const { theme, colorScheme, toggleTheme } = useThemeContext();

  return (
    <ActionIcon
      variant="outline"
      onClick={() => {
        if (colorScheme === 'light') {
          setColorScheme('dark')
        } else if (colorScheme === 'dark') {
          setColorScheme('light')
        }
      }}
      size={30}
      // color={theme.theme.primaryColor}
    >
      {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
    </ActionIcon>
  );
}
