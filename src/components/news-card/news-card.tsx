import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './news-card.module.css';

const mockdata = {
  image:
    'https://staticimg.amarujala.com/assets/images/2022/04/17/janani-suraksha-yojana_1650174950.jpeg?w=674&dpr=1.0',
  title:
    'Union Government allocates ₹2,116.19 crores to promote in hospital deliveries. Aims To reduce maternal and neonatal mortality',
  description:
    'The Union Government has allocated ₹2,116.19 crores to promote in-hospital deliveries and reduce maternal and neonatal mortality. ₹1,709.23 crores will go to Low Performing States like Assam, Bihar, and Uttar Pradesh under the Janani Suraksha Yojana in FY 2023-24. Utilization rates have improved to 83%. The scheme provides financial incentives ranging from ₹600 to ₹1400 to encourage hospital deliveries. Over 1 million Accredited Social Health Activists (ASHAs) have been appointed to support safer childbirths.',
  badges: [
    { label: 'Ministry of Health & Family Welfare' },
    { label: 'Department of Health and Family Welfare' },
    { label: 'Smt. Anupriya Patel' },
    { label: 'Shri Pradeep Kumar Singh' },
  ],
  location: {
    name: 'New Delhi',
  },
  date: 'July 26, 2024',
};

export function NewsCard() {
  const { image, title, description, badges, location, date } = mockdata;
  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} size="xs">
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          {/* <Badge size="sm" variant="light">
            {country}
          </Badge> */}
        </Group>
        <Text fz="xs" mt="xs">
          {`${location.name}, ${date}`}
        </Text>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        {/* <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text> */}
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      {/* <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group> */}
    </Card>
  );
}
