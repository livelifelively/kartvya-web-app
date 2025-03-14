import '@mantine/core/styles.css';

import React, { useEffect } from 'react';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { useMantineColorScheme } from '@mantine/core';
import { DEFAULT_THEME, ThemeProvider } from '../src/theme';
import CustomMantineProvider from '../src/components/mantine-provider/mantine-provider';

export const parameters = {
  layout: 'fullscreen',
  options: {
    showPanel: false,
  },
};

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) => setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => (
    <ThemeProvider themeType={DEFAULT_THEME}>
      <CustomMantineProvider>{renderStory()}</CustomMantineProvider>
    </ThemeProvider>
  ),
];
