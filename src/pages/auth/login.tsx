/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import {
  Paper,
  Group,
  Anchor,
  Container,
  Title,
  Divider,
  Box,
  useMantineColorScheme,
  LoadingOverlay,
  useMantineTheme,
  Text,
} from '@mantine/core';
import { getCsrfToken, getProviders, useSession, signIn, signOut } from 'next-auth/react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import AuthShell from '@/components/app-shell/auth-shell';
import { LinkedinButton } from '@/components/social-buttons/social-buttons';
import Logo from '@/components/logo/logo';
import { SignedInUser } from '@/components/auth/signed-in-user';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}

function Login({ csrfToken, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const theme = useMantineTheme();

  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();

  const isMobileOrSmaller = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <AuthShell title="Login In - Kartvya" showHeader={false} showFooter={false}>
      <Container
        size={isMobileOrSmaller ? 'xl' : 420}
        px={isMobileOrSmaller ? 0 : 'auto'}
        mt={isMobileOrSmaller ? 0 : 20}
      >
        <Paper withBorder shadow="md" p={30} radius="md" style={{ opacity: '0.98' }}>
          <Text ta="center">Welcome to</Text>
          <Title ta="center" size="h4" mb={40}>
            <Logo size="h1" />
          </Title>

          {session && <SignedInUser session={session} signOut={signOut} />}

          {!session && <LoginForm providers={providers} csrfToken={csrfToken} router={router} />}
          <Divider labelPosition="center" mt="xl" mb="xs" />
          <Group>
            <Anchor
              onClick={() => {
                router.push('/about');
              }}
              size="xs"
              // c={colorScheme === 'dark' ? 'brandYellow.6' : 'brandBlue.6'}
            >
              {`About Us`}
            </Anchor>

            {/*
              #FIXME Giving Hydration failed error, if user has changed the theme,
              the system rendered Icon is different from user selected
              Somehow the system level theme is not changing,
              e.g. anchor tags still using previous colors.
            */}
            {/* <ActionIcon
              variant="light"
              onClick={() => toggleColorScheme()}
              size={30}
              color={colorScheme === 'dark' ? 'brandYellow.6' : 'brandBlue.6'}
            >
              {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
            </ActionIcon> */}
          </Group>
        </Paper>
      </Container>
    </AuthShell>
  );
}

const LoginForm = ({ providers }: any) => {
  const [visible] = useDisclosure(false);

  return (
    <Box pos={'relative'}>
      <LoadingOverlay visible={visible} overlayProps={{ blur: 1 }} />
      {providers && providers.linkedin && (
        <LinkedinButton
          onClick={() =>
            signIn(providers.linkedin.id, { callbackUrl: '/citizen/know', redirect: true })
          }
          mb={10}
        />
      )}
    </Box>
  );
};

export default Login;
