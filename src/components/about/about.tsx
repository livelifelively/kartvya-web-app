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
import classes from './about.module.css';

const featuresData = [
  {
    title:
      'Provide Non-Partisan, Institutional Information covering Governments at Union, State and Local levels.',
    description: '',
    // 'Institutional information beyond the news headlines. Enables citizens to know about policy domains, their governance status and performance metrics.',
    icon: IconScale,
  },
  {
    title: 'Enable Citizens to connect and collaborate on Public Services and Government Policies',
    description: '',
    icon: IconUsers,
  },
  {
    title:
      'Personalized feed based on your followed subjects, regions, citizens, organisations and officials',
    description: '',
    icon: IconBuildingBank,
  },
  {
    title:
      'Timelined information on Subjects, Administrative Regions, Public Insitutions and Government Officials.',
    description: '',
    icon: IconTimeline,
  },
];

export function About() {
  const theme = useMantineTheme();

  const features = featuresData.map((feature: any) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <ActionIcon size={rem(50)} variant="transparent" aria-label="Danger variant">
        <feature.icon size={60} stroke={2} className={classes.cardIcon} />
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

        {/* Ladder of citizen participation */}
        {/* https://www.coventry.gov.uk/downloads/file/36484/arnstein_ladder_of_participation */}
        {/* https://historyofsocialwork.org/1969_ENG_Ladderofparticipation/1969,%20Arnstein,%20ladder%20of%20participation,%20original%20text%20OCR%20C.pdf */}

        <Text className={classes.description}>
          Delivers apolitical, institutional and verifiable information on civic subjects. Provides
          tools for meaningful and impact oriented networking and collaboration among citizens. Aims
          for being instrumental in bringing greater accountibility, transparency and citizen
          participation in democratic governance.
          {/* Follow civic subjects like health, defence or finance etc., regions where you vote or care
          about, officials, organisations. Get informed beyond the traditional news headlines. */}
        </Text>

        <Group className={classes.controls}>
          <Button size="lg" onClick={() => signIn()}>
            Join Kartvya
          </Button>
        </Group>
      </Container>
      <Container fluid mt={20}>
        <Title ta="center">Our Objectives</Title>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 4 }}
          spacing={{ base: 'sm' }}
          mt={{ base: 30, md: 50 }}
        >
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
}
