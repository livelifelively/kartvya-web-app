import { Box, Chip, Group, Title } from '@mantine/core';
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
    <Box>
      {allSubjectsGroups
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item: SubjectGroup) => (
          <Box mb={24} key={item.id}>
            <Title mb={8} size="h4" style={{ textTransform: 'uppercase' }}>
              {item.name}
            </Title>
            <Chip.Group value={selectedSubjects} onChange={onSelectedSubjectsChanged} multiple>
              <Group mt="xs">
                {item.linked_domains
                  .sort((a, b) => a.localeCompare(b))
                  .map((domain: string) => (
                    <Chip key={domain} value={domain} variant="outline" style={{ textTransform: 'capitalize' }}>
                      {domain.split('-').join(' ')}
                    </Chip>
                  ))}
              </Group>
            </Chip.Group>
          </Box>
        ))}
    </Box>
  );
}
