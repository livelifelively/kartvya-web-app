import { Badge, Box, Flex, Indicator } from '@mantine/core';

export function SubjectBadges() {
  return (
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
  );
}
