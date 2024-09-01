import { Text, Avatar, Group, Paper, Box, ActionIcon, Flex } from '@mantine/core';
import { IconBookmark, IconMessageDots, IconShare3 } from '@tabler/icons-react';
import classes from './expression.module.css';
import SupportOpposeButtons from '../support-oppose/support-oppose';

export function Expression() {
  return (
    <Paper withBorder className={classes.expression}>
      <Group gap="xs">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <Box>
          <Text fz="sm" fw="bold">
            Jacob Warnhalter
          </Text>
          <Text fz="xs" c="dimmed">
            10 minutes ago
          </Text>
        </Box>
      </Group>
      <Box className={classes.body}>
        <Text>
          I use Heroku to host my Node.js application, but MongoDB add-on appears to be too test te
          expensive. I consider switching to Digital Ocean VPS to save some cash.
        </Text>
        <Flex
          mt="md"
          pt="xs"
          style={{ borderTop: '1px solid #e5e5e5' }}
          justify="space-between"
          direction="row"
          wrap="nowrap"
        >
          <SupportOpposeButtons initialSupportCount={34949} initialOpposeCount={896} />

          <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
            <ActionIcon variant="transparent" radius="md" size={32}>
              <IconMessageDots className={classes.like} stroke={1.2} />
            </ActionIcon>
            <Text ta="center" fz="xs">
              456
            </Text>
          </Flex>

          <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
            <ActionIcon variant="transparent" radius="md" size={32}>
              <IconShare3 className={classes.like} stroke={1.2} />
            </ActionIcon>
            <Text ta="center" fz="xs">
              532
            </Text>
          </Flex>

          <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
            <ActionIcon variant="transparent" radius="md" size={32}>
              <IconBookmark className={classes.like} stroke={1.2} />
            </ActionIcon>
            <Text ta="center" fz="xs">
              1.4k
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Paper>
  );
}
