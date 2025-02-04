import { Box, Checkbox, Grid, Group, Text, Title } from '@mantine/core';
import classes from './onboarding.module.css';
import { SubjectGroup } from './state/all-subjects-groups.data';

export function SelectSubjects({
  allSubjectsGroups,
  selectedSubjects,
  onSelectedSubjectsChanged,
}: {
  allSubjectsGroups: SubjectGroup[];
  selectedSubjects: string[];
  onSelectedSubjectsChanged: (selectedSubjects: string[]) => void;
}) {
  return (
    <Checkbox.Group
      value={selectedSubjects}
      onChange={(value) => {
        onSelectedSubjectsChanged(value);
      }}
    >
      {allSubjectsGroups.map((item) => (
        <Box mb={32} key={item.id}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            {item.name}
          </Title>
          <Grid>
            {item.linked_domains.map((domain) => (
              <Grid.Col span={{ lg: 3, md: 4, sm: 6 }} key={domain}>
                <Checkbox.Card className={classes.root} radius="md" value={domain}>
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
