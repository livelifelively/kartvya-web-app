import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './news-card.module.css';

interface NewsCardProps {
  newsData: any;
}

export function NewsCard({ newsData }: NewsCardProps) {
  const { image, title, description, badges, location, date } = newsData;
  const features = badges.map((badge: any) => (
    <Badge variant="light" key={badge.label} size="xs">
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} h={{ sm: 180, md: 500 }} />
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
