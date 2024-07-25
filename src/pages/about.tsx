import { createStyles, Container, Text, Group, rem, Card, SimpleGrid, Title, Button } from '@mantine/core';
import { IconUsers, IconScale, IconBuildingBank } from '@tabler/icons-react';
import { NoSideBarsAppShell } from '@/qbeela/ui';

const useStyles = createStyles((theme: any) => ({
  inner: {
    position: 'relative',
    paddingTop: rem(80),
    paddingBottom: rem(100),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },

  card: {
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.colors.yellow[8],
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

const featuresData = [
  {
    title: 'Non-Partisan Institutional Information',
    description:
      'Institutions centric information that is beyond political headlines. Enables citizens to focus on governance and social impact.',
    icon: IconScale,
  },
  {
    title: 'Citizens and Community Centric',
    description:
      'We empower citizens with actionable citizen centric information. We are building systems to enable citizens to have collaboration with other citizens, governments and other stakeholders',
    icon: IconUsers,
  },
  {
    title: 'Covers Governments at All Levels',
    description:
      'Know what is happening in your local government, state and national governments. Understand how government organisations work on their own and in collaboration with other departments',
    icon: IconBuildingBank,
  },
];

export function About() {
  const { classes, theme } = useStyles();

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
          Delivers apolitical and institutional information. Provides tools for meaningful and impact oriented
          collaboration among citizens. Aims for being instrumental in bringing greater accountibility, transparency and
          citizen participation in governance.
        </Text>

        <Group className={classes.controls}>
          <Button size="lg">Get Started</Button>
        </Group>
      </Container>
      <Container>
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    </NoSideBarsAppShell>
  );
}

export default About;
