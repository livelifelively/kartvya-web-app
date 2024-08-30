import { Tabs, Text } from '@mantine/core';
import classes from './bottom-mobile-tabs.module.css';

export function BottomMobileTabs() {
  return (
    <Tabs
      inverted
      defaultValue="first"
      onChange={(value) => console.log(value)}
      classNames={classes}
    >
      <Tabs.List grow justify="center">
        <Tabs.Tab value="first">
          <Text ta="center" fz="sm">
            Union
          </Text>
          <Text ta="center" fz="xs">
            Government
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value="second">
          <Text ta="center" fz="sm">
            State
          </Text>
          <Text ta="center" fz="xs">
            Government
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value="third">Citizens</Tabs.Tab>
        <Tabs.Tab value="forth">Profile</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
