import React from 'react';
import { Group, Card, Anchor } from '@mantine/core';

interface Subject {
  name: string;
  id: string;
}

interface UserSubjectsSidebarProps {
  subjects: Subject[];
}

function UserSubjectsSidebar({ subjects }: UserSubjectsSidebarProps) {
  return (
    <Card
      className="sidebar-user-subjects"
      style={{ paddingHorizontal: 16, paddingVertical: 12 }}
      aria-label="User Policy Subjects"
    >
      <Group style={{ gap: 8 }} aria-label="Subject tags">
        {subjects.map((subject) => (
          <Anchor
            key={subject.id}
            underline="never"
            size="xs"
            style={{
              display: 'inline-block',
              color: '#fff',
              fontSize: 11,
              border: '1px solid #E9ECEF',
              borderRadius: 4,
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 2,
              paddingBottom: 2,
            }}
            aria-label={`Subject: ${subject.name}`}
          >
            {subject.name}
          </Anchor>
        ))}
      </Group>
    </Card>
  );
}

export default UserSubjectsSidebar;
