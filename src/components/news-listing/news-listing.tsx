import { Box } from '@mantine/core';
import { NewsCard } from '../news-card/news-card';

export function NewsListing() {
  return (
    <>
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
    </>
  );
}
