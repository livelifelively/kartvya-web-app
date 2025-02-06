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
      {allSubjectsGroups.map((item: SubjectGroup) => (
        <Box mb={32} key={item.id}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            {item.name}
          </Title>
          <Chip.Group value={selectedSubjects} onChange={onSelectedSubjectsChanged} multiple>
            <Group mt="xs">
              {item.linked_domains.map((domain: string) => (
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
