import { Tabs, Text } from '@mantine/core';
import {
  IconUsers,
  IconMessageDots,
  IconBuildingBank,
  IconAffiliate,
  IconUserScan,
} from '@tabler/icons-react';
import classes from './bottom-mobile-tabs.module.css';

export function BottomMobileTabs() {
  return (
    <Tabs
      inverted
      defaultValue="first"
      onChange={(value) => console.log(value)}
      classNames={classes}
    >
      <Tabs.List grow justify="space-between">
        <Tabs.Tab value="know" ta="center">
          <IconBuildingBank size={20} />
          <Text fz="sm">Know</Text>
          {/* <Text ta="center" fz="xs">
            Source backed news
          </Text> */}
        </Tabs.Tab>
        <Tabs.Tab value="express" ta="center">
          <IconMessageDots size={20} />
          <Text fz="sm">Express</Text>
          {/* <Text ta="center" fz="xs">
            Government
          </Text> */}
        </Tabs.Tab>
        <Tabs.Tab value="collaborate" ta="center">
          <IconAffiliate size={20} />
          <Text fz="sm">Collaborate</Text>
        </Tabs.Tab>
        <Tabs.Tab value="profile" ta="center">
          <IconUserScan size={20} />
          <Text fz="sm">Profile</Text>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
