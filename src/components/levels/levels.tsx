import { Container, Text, rem, Card, Title, Grid } from '@mantine/core';
import { NoSideBarsAppShell } from '@/components/app-shell/no-sidebars-app-shell';
import classes from './levels.module.css';

const featuresData = [
  {
    level: 1,
    title: 'Information',
    description:
      'Easy and consistent access to public information on government policies, regulations, and services.',
  },
  {
    level: 2,
    title: 'Feedback',
    description: 'Share opinions and feedback to the government and fellow citizens.',
  },
  {
    level: 3,
    title: 'Consultation',
    description:
      'Governments are officially open to listening to citizens. Participate in public consultations on specific issues or policies.',
  },
  {
    level: 4,
    title: 'Collaboration',
    description:
      'Work with government officials on execution of projects or initiatives to address community needs and achieve common goals.',
  },
  {
    level: 5,
    title: 'Co-Creation',
    description:
      'Engage in open citizen participation with government officials to co-create policies, initiatives, or services that address the needs of the community.',
  },
];

interface LevelsProps {
  featuresData: any;
}

export function Levels({ featuresData }: LevelsProps) {
  const features = featuresData.map((feature: any) => (
    <Grid.Col key={feature.title} span={4}>
      <Card shadow="md" radius="md" className={classes.card} padding="xl">
        {/* <feature.icon size={rem(50)} stroke={2} color={theme.colors.yellow[8]} /> */}
        <Title order={2} fz="lg" fw={600} className={classes.cardTitle} mt="md">
          {feature.level}. {feature.title}
        </Title>
        <Text fz="sm" mt="sm">
          {feature.description}
        </Text>
      </Card>
    </Grid.Col>
  ));

  return (
    <NoSideBarsAppShell title="Kartvya Levels - Kartvya">
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          The Five Levels of{' '}
          <Text component="span" variant="text" color="brandBlue" inherit>
            Citizen Engagement
          </Text>
        </h1>

        <Text className={classes.description} color="dimmed">
          A{' '}
          <Text component="span" variant="text" color="brandBlue" inherit>
            Kartvya Level
          </Text>{' '}
          represents citizens engagement stage on our platform. Each level of engagement builds on
          the previous level, providing citizens with increasing levels of participation and
          decision-making power.
        </Text>

        {/* <Group className={classes.controls}>
          <Button label="Get Started" size="lg" />
        </Group> */}
      </Container>
      <Container>
        <Grid gutter="xl" grow mb={100}>
          {features}
        </Grid>
      </Container>
    </NoSideBarsAppShell>
  );
}
