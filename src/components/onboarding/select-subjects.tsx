import { useState } from 'react';
import { Box, Checkbox, Grid, Group, Text, Title } from '@mantine/core';
import classes from './onboarding.module.css';
import { SubjectGroup } from './state/all-subjects-groups.data';

export function SelectSubjects({ allSubjectsGroups }: { allSubjectsGroups: SubjectGroup[] }) {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      {allSubjectsGroups.map((item) => (
        <Box mb={32}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            {item.name}
          </Title>
          <Grid>
            {item.linked_domains.map((domain) => (
              <Grid.Col span={{ lg: 3, md: 4, sm: 6 }}>
                <Checkbox.Card className={classes.root} radius="md" value={domain} key={domain}>
                  <Group wrap="nowrap" align="flex-start" justify="stretch" style={{ alignItems: 'center' }}>
                    <Checkbox.Indicator />
                    <Box>
                      <Text className={classes.label}>{domain.split('-').join(' ')}</Text>
                    </Box>
                  </Group>
                </Checkbox.Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      ))}
    </Checkbox.Group>
  );
}
