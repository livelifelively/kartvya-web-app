import { render as testingLibraryRender } from '@testing-library/react';
import { ThemeProvider, DEFAULT_THEME } from '../theme';
import CustomMantineProvider from '@/components/mantine-provider/mantine-provider';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => {
      return (
        <ThemeProvider themeType={DEFAULT_THEME}>
          <CustomMantineProvider>{children}</CustomMantineProvider>
        </ThemeProvider>
      );
    },
  });
}
