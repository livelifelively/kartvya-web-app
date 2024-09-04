import { AppShell, LoadingOverlay } from '@mantine/core';

export function FullScreenLoaderWithAppShell() {
  return (
    <AppShell padding="md">
      <AppShell.Main
        ps={{
          base: '0rem',
          xs: '0rem',
          sm: '0rem',
          md: 'calc(var(--app-shell-navbar-offset, 0rem) + var(--app-shell-padding))',
        }}
        pe={{
          base: '0rem',
          xs: '0rem',
          sm: '0rem',
          md: 'calc(var(--app-shell-aside-offset, 0rem) + var(--app-shell-padding))',
        }}
        pos="relative"
      >
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: 'sm', bg: 'transparent' }}
          loaderProps={{ type: 'bars' }}
        />
      </AppShell.Main>
    </AppShell>
  );
}
