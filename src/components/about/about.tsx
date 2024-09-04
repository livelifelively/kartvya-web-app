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
} from '@mantine/core';
// import { IconUsers, IconScale, IconBuildingBank } from '@tabler/icons-react';
import { NoSideBarsAppShell } from '@/components/app-shell/no-sidebars-app-shell';
import classes from './about.module.css';

interface AboutProps {
  featuresData: any;
}

export function About({ featuresData }: AboutProps) {
  const theme = useMantineTheme();

  const features = featuresData.map((feature: any) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon size={rem(50)} stroke={2} className={classes.cardIcon} />
      <Title order={2} fz="xl" fw={600} className={classes.cardTitle} mt="md">
        {feature.title}
      </Title>
      <Text mt="sm">{feature.description}</Text>
    </Card>
  ));

  return (
    <NoSideBarsAppShell title="About Us - Kartvya">
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Geo-enabled knowledge and social graph for{' '}
          <Text component="span" variant="text" c={theme.primaryColor} inherit>
            Citizen Collaboration
          </Text>
        </h1>

        <Text className={classes.description} color="dimmed">
          Delivers apolitical and institutional information. Provides tools for meaningful and
          impact oriented collaboration among citizens. Aims for being instrumental in bringing
          greater accountibility, transparency and citizen participation in governance.
        </Text>

        <Group className={classes.controls}>
          <Button size="lg">Get Started</Button>
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
    </NoSideBarsAppShell>
  );
}
