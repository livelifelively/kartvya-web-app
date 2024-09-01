// import { IconHeart } from '@tabler/icons-react';
import { Card, Text, Group, Anchor, Breadcrumbs, rem } from '@mantine/core';
import { capitalize } from 'lodash';
import classes from './news-card.module.css';

interface NewsCardProps {
  newsData: any;
}

export function NewsCard({ newsData }: NewsCardProps) {
  const { title, description, location, date, civic_domain, government_level } = newsData;
  // const features = badges.map((badge: any) => (
  //   <Badge variant="light" key={badge.label} size="xs">
  //     {badge.label}
  //   </Badge>
  // ));

  const items = [
    { title: capitalize(civic_domain[0]), href: '#' },
    { title: capitalize(government_level), href: '#' },
    { title: 'Ministry of Health & Family Welfare', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} fz="xs" c="indigo">
      {item.title}
    </Anchor>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      {/* <Card.Section>
        <Image src={image} alt={title} h={{ sm: 180, md: 500 }} />
      </Card.Section> */}

      {/* <Card.Section className={classes.section}>
        <Group justify="apart"></Group>
      </Card.Section> */}

      <Card.Section className={classes.section}>
        <Breadcrumbs separator="&middot;" separatorMargin={4} mb="xs">
          {items}
        </Breadcrumbs>
        <Group justify="apart">
          <Text fz="xl" fw={500}>
            {title}
          </Text>
          {/* <Badge size="sm" variant="light">
            {country}
          </Badge> */}
        </Group>
        <Text fz="xs" mt="xs">
          {`${location.name}, ${date}`}
        </Text>
        <Text fz={rem('15px')} mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text c="dimmed" fz="sm">
          Sources:
        </Text>
        <Group gap={7} mt={5} fz="sm">
          Question hour
        </Group>
      </Card.Section>
    </Card>
  );
}
