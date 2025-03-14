import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <Logo {...args} />,
};

export const LargeSize: Story = {
  args: {
    size: 'h1',
  },
  render: (args) => <Logo {...args} />,
};

export const SmallSize: Story = {
  args: {
    size: 'h4',
  },
  render: (args) => <Logo {...args} />,
};

export const WithoutHomeLink: Story = {
  args: {
    linksToHome: false,
  },
  render: (args) => <Logo {...args} />,
};

export const WithCustomSize: Story = {
  args: {
    size: 32,
  },
  render: (args) => <Logo {...args} />,
};
