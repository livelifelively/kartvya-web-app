import { Button, darken, useMantineTheme } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { useColorScheme } from '@mantine/hooks';

import { GoogleIcon } from './google-icon';
import { TwitterIcon } from './twitter';
import { GithubIcon } from './github-icon';

/* eslint-disable-next-line */
export interface SocialButtonsProps {}

export function GoogleButton(props: any) {
  return (
    <Button leftIcon={<GoogleIcon />} variant="default" fullWidth {...props}>
      Continue with Google
    </Button>
  );
}

export function TwitterButton(props: any) {
  return (
    <Button
      leftIcon={<TwitterIcon size="1rem" color="#fff" />}
      styles={{
        root: {
          backgroundColor: '#00ACEE',
          color: '#fff',
          '&:not([data-disabled]):hover': {
            backgroundColor: darken('#00ACEE', 0.1),
          },
        },
      }}
      variant="default"
      fullWidth
      {...props}
    >
      Continue with Twitter
    </Button>
  );
}

export function GithubButton(props: any) {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();

  return (
    <Button
      leftIcon={<GithubIcon size="1rem" color="#fff" />}
      style={{
        backgroundColor: theme.colors.dark[colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:not([data-disabled]):hover': {
          backgroundColor: theme.colors.dark[colorScheme === 'dark' ? 9 : 6],
        },
      }}
      // variant="default"
      fullWidth
      {...props}
    >
      Continue with Github
    </Button>
  );
}

export function LinkedinButton(props: any) {
  return (
    <Button
      leftSection={<IconBrandLinkedin size={30} color="#fff" />}
      styles={{
        root: {
          backgroundColor: '#0077b5',
          '&:not([dataDisabled]):hover': {
            backgroundColor: darken('#0077b5', 0.1),
          },
        },
      }}
      fullWidth
      {...props}
    >
      Continue with Linkedin
    </Button>
  );
}
