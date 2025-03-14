import type { Meta, StoryObj } from '@storybook/react';
import UserProfileSnippet from './user-name-sidebar';
import { Box } from '@mantine/core';

const meta = {
  title: 'User/UserProfileSnippet',
  component: UserProfileSnippet,
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
    userName: { control: 'text' },
    userHandle: { control: 'text' },
    profileImageUrl: { control: 'text' },
    status: { control: 'text' },
    onShareProfile: { action: 'shared profile' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof UserProfileSnippet>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base example with just required props
export const Basic: Story = {
  args: {
    userName: 'John Doe',
    userHandle: 'johndoe',
    status: 'Citizen Journalist',
  },
};

// With profile image
export const WithProfileImage: Story = {
  args: {
    ...Basic.args,
    profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
    status: 'Political Analyst',
  },
};

// With share button
export const WithShareButton: Story = {
  args: {
    ...WithProfileImage.args,
    onShareProfile: () => console.log('Profile shared'),
  },
};

// Interactive (with onClick)
export const Interactive: Story = {
  args: {
    ...WithProfileImage.args,
    onClick: () => console.log('Profile clicked'),
  },
};

// Complete example with all props
export const Complete: Story = {
  args: {
    ...WithProfileImage.args,
    onShareProfile: () => console.log('Profile shared'),
    onClick: () => console.log('Profile clicked'),
  },
};

// Female user example
export const FemaleUser: Story = {
  args: {
    userName: 'Jane Smith',
    userHandle: 'janesmith',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    status: 'Volunteer',
    onShareProfile: () => console.log('Profile shared'),
    onClick: () => console.log('Profile clicked'),
  },
};

// Long username example
export const LongUsername: Story = {
  args: {
    userName: 'Alexandra Richardson Williamson',
    userHandle: 'alexrichardsonwilliamson',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop',
    status: 'Political Analyst',
    onShareProfile: () => console.log('Profile shared'),
  },
};

// Long status example
export const LongStatus: Story = {
  args: {
    userName: 'Michael Johnson',
    userHandle: 'mjohnson',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    status: 'Senior Political Correspondent and Community Organizer for Environmental Advocacy Group',
    onShareProfile: () => console.log('Profile shared'),
  },
};
