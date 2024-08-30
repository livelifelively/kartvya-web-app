import { Tabs } from '@mantine/core';

export function BottomMobileTabs() {
  return (
    <Tabs defaultValue="first" onChange={(value) => console.log(value)}>
      <Tabs.List grow justify="center">
        <Tabs.Tab value="first">Union</Tabs.Tab>
        <Tabs.Tab value="second">State</Tabs.Tab>
        <Tabs.Tab value="third">Citizens</Tabs.Tab>
        <Tabs.Tab value="forth">Profile</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
