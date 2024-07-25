import { createTheme, MantineColorsTuple } from '@mantine/core';

const brandBlue: MantineColorsTuple = [
  '#eaeaff',
  '#cfd0ff',
  '#9c9cff',
  '#6464ff',
  '#3736fe',
  '#1b19fe',
  '#0909ff',
  '#0000e4',
  '#0000cc',
  '#0000b4',
];

const brandRed: MantineColorsTuple = [
  '#ffebed',
  '#fcd6d9',
  '#f1a9b2',
  '#e87c87',
  '#e05562',
  '#db3c4b',
  '#da2e40',
  '#c22031',
  '#ad192c',
  '#980c23',
];

const brandYellow: MantineColorsTuple = [
  '#fffae0',
  '#fff4ca',
  '#ffe899',
  '#ffdb62',
  '#ffd036',
  '#ffc918',
  '#ffc501',
  '#e3ae00',
  '#ca9a00',
  '#af8500',
];

export const theme = createTheme({
  colors: {
    brandBlue,
    brandRed,
    brandYellow,
  },
  primaryColor: 'brandBlue',
  primaryShade: 5,
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
});
