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
import { IconUsers, IconScale, IconBuildingBank } from '@tabler/icons-react';
import { NoSideBarsAppShell } from '@/components/app-shell/no-sidebars-app-shell';
import classes from './about.module.css';

interface AboutProps {
  featuresData: any;
}

export function About({ featuresData }: AboutProps) {
  const theme = useMantineTheme();

  const features = featuresData.map((feature: any) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon size={rem(50)} stroke={2} color={theme.colors.yellow[8]} />
      <Title order={2} fz="lg" fw={600} className={classes.cardTitle} mt="md">
        {feature.title}
      </Title>
      <Text fz="sm" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <NoSideBarsAppShell title="About Us - Qbeela">
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Geo-enabled digital platform for{' '}
          <Text component="span" variant="text" color="brandBlue" inherit>
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
        <SimpleGrid cols={3} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
    </NoSideBarsAppShell>
  );
}
