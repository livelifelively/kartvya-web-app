import type { Meta, StoryObj } from '@storybook/react';
import UserSubjectsSidebar from './user-subjects-sidebar';
import { Box } from '@mantine/core';

const meta = {
  title: 'User/UserSubjectsSidebar',
  component: UserSubjectsSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box style={{ width: '350px', border: '1px solid #eee', borderRadius: '8px' }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    subjects: {
      control: 'object',
    },
  },
} satisfies Meta<typeof UserSubjectsSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subjects: [
      { name: 'Environment', id: 'env-01' },
      { name: 'Education', id: 'edu-01' },
      { name: 'Healthcare', id: 'health-01' },
    ],
  },
};

export const ManySubjects: Story = {
  args: {
    subjects: [
      { name: 'Environment', id: 'env-01' },
      { name: 'Education', id: 'edu-01' },
      { name: 'Healthcare', id: 'health-01' },
      { name: 'Agriculture', id: 'ag-01' },
      { name: 'Economy', id: 'eco-01' },
      { name: 'Infrastructure', id: 'infra-01' },
      { name: 'Technology', id: 'tech-01' },
      { name: 'Foreign Policy', id: 'fp-01' },
    ],
  },
};

export const LongSubjectNames: Story = {
  args: {
    subjects: [
      { name: 'Environmental Conservation and Sustainability', id: 'env-01' },
      { name: 'Higher Education and Academic Research', id: 'edu-01' },
      { name: 'Healthcare Reform and Medical Innovation', id: 'health-01' },
    ],
  },
};

export const NoSubjects: Story = {
  args: {
    subjects: [],
  },
};
