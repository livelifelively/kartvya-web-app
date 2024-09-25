import {
  ColorSchemeScript,
  MantineProvider,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Head from 'next/head';
import AuthPageWrapper from '../auth/auth-page-wrapper';
import { AppProps } from 'next/app';
import { ThemeType, useThemeContext } from '@/theme';
import { NextComponentType, NextPageContext } from 'next';

export type CustomAppProps = AppProps & {
  themeName: ThemeType;
};

export type AuthComponentType = NextComponentType<NextPageContext, any, any> & {
  auth?: boolean;
};

export default function CustomMantineProvider({ children }: any) {
  const { theme, colorScheme } = useThemeContext();

  return (
    <MantineProvider theme={theme.theme} defaultColorScheme={colorScheme}>
      {children}
      <ColorSchemeScript forceColorScheme={colorScheme} />
    </MantineProvider>
  );
}
