import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <Tabs
      inverted
      defaultValue="/citizen/know"
      value={router.asPath as string}
      onChange={(value) => router.push(`${value}`)}
      classNames={classes}
    >
      <Tabs.List grow justify="space-between">
        <Tabs.Tab value="/citizen/know" ta="center">
          <IconBuildingBank size={18} />
          <Text fz="xs">Know</Text>
          {/* <Text ta="center" fz="xs">
            Source backed news
          </Text> */}
        </Tabs.Tab>
        <Tabs.Tab value="/citizen/express" ta="center">
          <IconMessageDots size={18} />
          <Text fz="xs">Express</Text>
          {/* <Text ta="center" fz="xs">
            Government
          </Text> */}
        </Tabs.Tab>
        <Tabs.Tab value="/citizen/collaborate" ta="center">
          <IconAffiliate size={18} />
          <Text fz="xs">Collaborate</Text>
        </Tabs.Tab>
        <Tabs.Tab value="/citizen/explore" ta="center">
          <IconBinoculars size={18} />
          <Text fz="xs">Explore</Text>
        </Tabs.Tab>
        <Tabs.Tab value="/citizen/profile" ta="center">
          <IconUserScan size={18} />
          <Text fz="xs">Profile</Text>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
