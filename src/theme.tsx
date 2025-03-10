import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getCookie, setCookie } from 'cookies-next';

import {
  createTheme,
  MantineColorsTuple,
  MantineThemeOverride,
  MantineTheme,
  CSSVariablesResolver,
} from '@mantine/core';

// we are implementing dark and light as separate themes.
// it suits our overall objective of having multiple themes from which user may choose from.
// but in case this gives issues and we want only 2 themes, one for dark, one for light, in that case do check "virtual color" in mantine
// virtual colors allow for themes

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

type KartvyaTheme = {
  colorScheme: 'light' | 'dark';
  name: String;
  theme: MantineThemeOverride;
  resolver: CSSVariablesResolver;
};

const lightTheme: KartvyaTheme = {
  colorScheme: 'light',
  name: 'light-default',
  // https://mantine.dev/styles/css-variables/#css-variables-resolver
  resolver: (theme: MantineTheme) => ({
    variables: {
      '--mantine-color-hover-background': theme.colors.gray[0],
    },
    light: {
      '--mantine-color-anchor': theme.colors.brandBlue[6],
    },
    dark: {},
  }),
  theme: createTheme({
    colors: {
      brandBlue,
    },
    primaryColor: 'brandBlue',
    primaryShade: 6,
    autoContrast: true,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    other: {},
    components: {
      Button: {
        // can have a css module to apply classes here
        // classNames: darkDefaultClasses,
        styles: (theme: any, params: any) => ({
          root: {
            // ...(params.variant === 'danger' && {
            //   backgroundColor: theme.colors.red[9],
            //   color: theme.colors.red[0],
            // }),
          },
        }),
        vars: (theme: any, props: any) => {
          return {
            // https://mantine.dev/styles/styles-api/
            root: {
              ...(props.variant === 'outline' && {
                '--mantine-color-brandBlue-outline': theme.colors.brandBlue[6],
              }),
            },
          };
        },
      },
    },
  }),
};

const darkTheme: KartvyaTheme = {
  colorScheme: 'dark',
  name: 'dark-default',
  // https://mantine.dev/styles/css-variables/#css-variables-resolver
  resolver: (theme: MantineTheme) => ({
    variables: {
      '--mantine-color-hover-background': theme.colors.dark[6],
    },
    light: {},
    dark: {
      '--mantine-color-anchor': theme.colors.brandYellow[6],
      '--mantine-color-brandYellow-outline': theme.colors.brandYellow[6],
      '--mantine-color-text': theme.white,
      '--mantine-color-dimmed': theme.colors.gray[5],
    },
  }),
  theme: createTheme({
    colors: {
      brandYellow,
    },
    primaryColor: 'brandYellow',
    primaryShade: 6,
    autoContrast: true,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    other: {},
    components: {
      Button: {
        // https://mantine.dev/styles/styles-api/
        vars: (theme: any, props: any) => {
          return {
            root: {
              ...(props.variant === 'outline' && {
                '--mantine-color-brandYellow-outline': theme.colors.brandYellow[6],
              }),
            },
          };
        },
      },
    },
  }),
};

export const themes = {
  'light-default': lightTheme,
  'dark-default': darkTheme,
};

export const DEFAULT_THEME: ThemeType = 'dark-default';

// Define the shape of the context value
const defaultValue = {
  colorScheme: themes[DEFAULT_THEME].colorScheme,
  theme: themes[DEFAULT_THEME],
  toggleTheme: (value: ThemeType) => {},
};

const ThemeContext = createContext(defaultValue);

interface ThemeProviderProps {
  themeType?: ThemeType;
  children: ReactNode;
}

export type ThemeType = 'light-default' | 'dark-default';

export function ThemeProvider({ children, themeType = DEFAULT_THEME }: ThemeProviderProps) {
  const [theme, setTheme] = useState(themes[themeType]);

  const toggleTheme = (value: ThemeType) => {
    const nextTheme = themes[value];

    setTheme(nextTheme);
    setCookie('app-theme-name', value, { maxAge: 60 * 60 * 24 * 30, sameSite: 'strict' });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme: theme.colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
