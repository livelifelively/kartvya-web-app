import type { Meta, StoryObj } from '@storybook/react';
import UserMainLocationSidebar from './user-main-location-sidebar';
import { Box } from '@mantine/core';

const meta = {
  title: 'User/UserMainLocationSidebar',
  component: UserMainLocationSidebar,
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
    mainLocation: {
      control: 'object',
    },
  },
} satisfies Meta<typeof UserMainLocationSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainLocation: {
      state: 'Maharashtra',
      stateId: 'mh-01',
      district: 'Mumbai',
      districtId: 'mu-01',
      vidhansabha: 'Andheri East',
      vidhansabhaId: 'ae-01',
      loksabha: 'Mumbai North West',
      loksabhaId: 'mnw-01',
    },
  },
};

export const DifferentLocation: Story = {
  args: {
    mainLocation: {
      state: 'Karnataka',
      stateId: 'ka-01',
      district: 'Bangalore',
      districtId: 'bg-01',
      vidhansabha: 'Jayanagar',
      vidhansabhaId: 'jn-01',
      loksabha: 'Bangalore South',
      loksabhaId: 'bs-01',
    },
  },
};

export const LongLocationNames: Story = {
  args: {
    mainLocation: {
      state: 'Andhra Pradesh',
      stateId: 'ap-01',
      district: 'Vishakhapatnam',
      districtId: 'vp-01',
      vidhansabha: 'Vishakhapatnam West Central',
      vidhansabhaId: 'vwc-01',
      loksabha: 'Vishakhapatnam Metropolitan Region',
      loksabhaId: 'vmr-01',
    },
  },
};
