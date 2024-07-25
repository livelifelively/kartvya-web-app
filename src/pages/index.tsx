import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsCard } from '@/components/news/news';
import { Badge, Box, Flex, Indicator } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <ResponsiveAppShell>
        <Box>
          <Flex
            mih={50}
            gap="xs"
            justify="flex-start"
            align="flex-start"
            direction="row"
            // wrap="wrap"
          >
            <Indicator>
              <Badge variant="outline" color="gray" radius="xs">
                Badge
              </Badge>
            </Indicator>
            <Indicator>
              <Badge variant="outline" color="gray" radius="xs">
                Badge
              </Badge>
            </Indicator>
            <Indicator>
              <Badge variant="outline" color="gray" radius="xs">
                Badge
              </Badge>
            </Indicator>
            <Indicator>
              <Badge variant="outline" color="gray" radius="xs">
                Badge
              </Badge>
            </Indicator>
            <Indicator>
              <Badge variant="outline" color="gray" radius="xs">
                Badge
              </Badge>
            </Indicator>
          </Flex>
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
        <Box mb="md">
          <NewsCard />
        </Box>
      </ResponsiveAppShell>
    </>
  );
}
