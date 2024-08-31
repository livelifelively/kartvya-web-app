import { Tabs, Text } from '@mantine/core';
import {
  IconMessageDots,
  IconBuildingBank,
  IconAffiliate,
  IconUserScan,
  IconBinoculars,
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
          <IconBuildingBank size={18} />
          <Text fz="xs">Know</Text>
          {/* <Text ta="center" fz="xs">
            Source backed news
          </Text> */}
        </Tabs.Tab>
        <Tabs.Tab value="express" ta="center">
          <IconMessageDots size={18} />
          <Text fz="xs">Express</Text>
          {/* <Text ta="center" fz="xs">
            Government
          </Text> */}
        </Tabs.Tab>
        <Tabs.Tab value="collaborate" ta="center">
          <IconAffiliate size={18} />
          <Text fz="xs">Collaborate</Text>
        </Tabs.Tab>
        <Tabs.Tab value="explore" ta="center">
          <IconBinoculars size={18} />
          <Text fz="xs">Explore</Text>
        </Tabs.Tab>
        <Tabs.Tab value="profile" ta="center">
          <IconUserScan size={18} />
          <Text fz="xs">Profile</Text>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
