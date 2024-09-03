/* eslint-disable @typescript-eslint/quotes */
import { Anchor, Avatar, Box, Group, Text } from '@mantine/core';

import classes from './auth.module.css';

interface SignedInUserProps {
  session: any;
  signOut: any;
}

export const SignedInUser = ({ session, signOut }: SignedInUserProps) => (
  <>
    <Text size="sm" fw={700} ta="center" mb={10}>
      Continue as
    </Text>
    <Anchor<'a'> className={classes.user} href="/know">
      <Group style={{}}>
        <Avatar src={session.user?.image} radius="xl" />
        <Box style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {session.user?.name}
          </Text>

          <Text c="dimmed" size="xs">
            {session.user?.email}
          </Text>
        </Box>
      </Group>
    </Anchor>
    <Box style={{ textAlign: 'center' }}>
      <Anchor<'a'> onClick={() => signOut()} size="xs">
        Login to a different account
      </Anchor>
    </Box>
    {/* <Box style={{ textAlign: 'center' }}>
      <Anchor<'a'>
        c="brandBlue"
        onClick={() => {
          signOut();
        }}
        size="xs"
      >
        {`Don't have an account? Register`}
      </Anchor>
    </Box> */}
  </>
);
