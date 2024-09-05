import {
  Container,
  Text,
  Group,
  rem,
  Card,
  SimpleGrid,
  Title,
  Button,
  useMantineTheme,
  ActionIcon,
} from '@mantine/core';
import { IconUsers, IconScale, IconBuildingBank, IconTimeline } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { NoSideBarsAppShell } from '@/components/app-shell/no-sidebars-app-shell';
import classes from './about.module.css';

const featuresData = [
  {
    title: 'Non-Partisan Institutional Information',
    description:
      'Institutions centric information that is beyond political headlines. Enables citizens to focus on governance and social impact.',
    icon: IconScale,
  },
  {
    title: 'Citizens and Policy Subjects Centric',
    description:
      'We empower citizens with actionable citizen centric information on all the government policy subjects like health, defence. We are building systems to enable citizens to collaborate with other citizens, governments and other stakeholders to improve state of living.',
    icon: IconUsers,
  },
  {
    title: 'Know your Governments at All Levels',
    description:
      'Know what is happening in your local government, state and national governments. Understand how government organisations work on their own and in collaboration with other departments',
    icon: IconBuildingBank,
  },
  {
    title: 'Past, Present and Future',
    description:
      'Know performance on different policy subjects as per availability of public data. Timelines to track progress, current status and trends for the future.',
    icon: IconTimeline,
  },
];

export function About() {
  const theme = useMantineTheme();

  const features = featuresData.map((feature: any) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <ActionIcon size={rem(50)} variant="transparent" aria-label="Danger variant">
        <feature.icon size="sm" stroke={2} className={classes.cardIcon} />
      </ActionIcon>
      {/* <IconTimeline stroke={2} size={rem('20px')} className={classes.cardIcon} /> */}
      {/* <feature.icon size="sm" stroke={2} className={classes.cardIcon} /> */}
      <Title order={2} fz="xl" fw={600} className={classes.cardTitle} mt="md">
        {feature.title}
      </Title>
      <Text mt="sm">{feature.description}</Text>
    </Card>
  ));

  return (
    <>
      <Container className={classes.inner}>
        <h1 className={classes.title}>
          Geo-enabled knowledge graph and social network for{' '}
          <Text component="span" variant="text" c={theme.primaryColor} inherit>
            Citizen Collaboration
          </Text>
        </h1>

        {/* <List withPadding className={classes.description}>
          <List.Item>
            Delivers apolitical, institutional and verifiable information on civic subjects.
          </List.Item>
          <List.Item>
            Provides tools for meaningful and impact oriented collaboration among citizens.
          </List.Item>
          <List.Item>
            Aims for being instrumental in bringing greater accountibility, transparency and citizen
            participation in democratic governance.
          </List.Item>
          <List.Item>
            Inspired by{' '}
            <Anchor component="span" variant="text" c={theme.primaryColor} inherit>
              Ladder of Citizen Participation, by Sherry Arnstein
            </Anchor>
          </List.Item>
        </List> */}

        <Text className={classes.description}>
          Delivers apolitical, institutional and verifiable information on civic subjects. Provides
          tools for meaningful and impact oriented collaboration among citizens. Aims for being
          instrumental in bringing greater accountibility, transparency and citizen participation in
          democratic governance.
        </Text>

        <Group className={classes.controls}>
          <Button size="lg" onClick={() => signIn()}>
            Join Kartvya
          </Button>
        </Group>
      </Container>
      <Container>
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 'sm', md: 'xl' }}
          mt={{ base: 30, md: 50 }}
        >
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
}
