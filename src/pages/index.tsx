import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsCard } from '@/components/news/news';
import { Box } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <ResponsiveAppShell>
        <Box mb="md">
          <NewsCard />
        </Box>
        <Box mb="md">
          <NewsCard />
        </Box>
        <Box mb="md">
          <NewsCard />
        </Box>
        <Box mb="md">
          <NewsCard />
        </Box>
        <Box mb="md">
          <NewsCard />
        </Box>
      </ResponsiveAppShell>
    </>
  );
}
