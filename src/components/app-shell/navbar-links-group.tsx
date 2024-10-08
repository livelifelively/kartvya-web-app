import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './navbar-links-group.module.css';
import { useRouter } from 'next/router';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const router = useRouter();
  const [opened, setOpened] = useState(initiallyOpened || false);

  // Determine if the current link matches the page URL
  const isActive = link && router.pathname === link;

  const items = (hasLinks ? links : []).map((val) => (
    <Text
      className={classes.link}
      key={val.label}
      onClick={(event) => {
        router.push(val.link);
        event.preventDefault();
      }}
    >
      {val.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        className={`${classes.control} ${isActive ? classes.active : ''}`} // Add active class if link matches
        onClick={(event) => {
          if (link) {
            router.push(link);
            event.preventDefault();
          } else {
            setOpened((o) => !o);
          }
        }}
        pl="xl"
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="outline" size={28} autoContrast className={classes.outlineIcon}>
              <Icon style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
            <ThemeIcon variant="filled" size={28} autoContrast className={classes.filledIcon}>
              <Icon style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
