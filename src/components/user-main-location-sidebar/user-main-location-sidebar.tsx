import React from 'react';
import { Text, Group, Flex, Card, Anchor } from '@mantine/core';

interface UserMainLocationSidebarProps {
  state: string;
  stateId: string;
  district: string;
  districtId: string;
  vidhansabha: string;
  vidhansabhaId: string;
  loksabha: string;
  loksabhaId: string;
}

function UserMainLocationSidebar({ mainLocation }: { mainLocation: UserMainLocationSidebarProps }) {
  return (
    <Card className="sidebar-user-main-location" style={{ padding: 10 }} aria-label="User Location Information">
      <Group
        wrap="nowrap"
        align="center"
        display="flex"
        gap={10}
        style={{ flexDirection: 'column', width: '100%', alignContent: 'space-between' }}
      >
        <Flex justify="space-between" style={{ width: '100%' }}>
          <Text size="xs" aria-label="State">
            State
          </Text>
          <Anchor underline="never" size="xs" variant="transparent" aria-label={`State: ${mainLocation.state}`}>
            {mainLocation.state}
          </Anchor>
        </Flex>
        <Flex justify="space-between" style={{ width: '100%' }}>
          <Text size="xs" aria-label="District">
            District
          </Text>
          <Anchor underline="never" size="xs" variant="transparent" aria-label={`District: ${mainLocation.district}`}>
            {mainLocation.district}
          </Anchor>
        </Flex>
        <Flex justify="space-between" style={{ width: '100%' }}>
          <Text size="xs" aria-label="Loksabha">
            Loksabha
          </Text>
          <Anchor underline="never" size="xs" variant="transparent" aria-label={`Loksabha: ${mainLocation.loksabha}`}>
            {mainLocation.loksabha}
          </Anchor>
        </Flex>
        <Flex justify="space-between" style={{ width: '100%' }}>
          <Text size="xs" aria-label="Vidhansabha">
            Vidhansabha
          </Text>
          <Anchor
            underline="never"
            size="xs"
            variant="transparent"
            aria-label={`Vidhansabha: ${mainLocation.vidhansabha}`}
          >
            {mainLocation.vidhansabha}
          </Anchor>
        </Flex>
      </Group>
    </Card>
  );
}

export default UserMainLocationSidebar;
