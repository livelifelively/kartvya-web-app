import { createTheme, MantineColorsTuple } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

const brandBlue: MantineColorsTuple = [
  '#eaeaff',
  '#cfd0ff',
  '#9c9cff',
  '#6464ff',
  '#3736fe',
  '#1b19fe',
  '#0000ff',
  '#0000e4',
  '#0000cc',
  '#0000b4',
];

const brandRed: MantineColorsTuple = [
  '#ffe8e8',
  '#ffcfcf',
  '#ff9b9c',
  '#ff6464',
  '#fe3837',
  '#fe1b19',
  '#ff0909',
  '#e40000',
  '#cb0000',
  '#b10000',
];

const brandYellow: MantineColorsTuple = [
  '#ffffe2',
  '#ffffcc',
  '#ffff9b',
  '#ffff64',
  '#ffff39',
  '#ffff1d',
  '#ffff00',
  '#e3e300',
  '#c9c900',
  '#acad00',
];

export function useTheme() {
  const colorScheme = useColorScheme();

  return createTheme({
    colors: {
      brandBlue,
      brandRed,
      brandYellow,
    },
    primaryColor: colorScheme === 'light' ? 'brandBlue' : 'brandYellow',
    primaryShade: 6,
    autoContrast: true,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
  });
}
