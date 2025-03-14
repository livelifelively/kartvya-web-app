import React from 'react';
import { Avatar, Text, Group, Box, ActionIcon, Flex, Menu, Button, Card } from '@mantine/core';
import { IconShare, IconEdit, IconDotsVertical } from '@tabler/icons-react';

interface UserNameSidebarProps {
  userName: string;
  userHandle: string;
  profileImageUrl?: string;
  onShareProfile?: () => void;
  onEditProfile?: () => void;
  onClick?: () => void;
}

function UserNameSidebar({
  userName,
  userHandle,
  profileImageUrl,
  //   onShareProfile,
  //   onEditProfile,
  //   onClick,
}: UserNameSidebarProps) {
  return (
    <Card
      className="user-profile-snippet"
      //   onClick={onClick} // Apply onClick to the entire snippet container
      //   style={{ cursor: onClick ? 'pointer' : 'default', padding: 10, paddingLeft: 32 }} // Indicate clickability if onClick is provided
      style={{ padding: 10 }}
    >
      <Flex justify="space-between" align="start">
        <Group wrap="nowrap" align="center" display="flex" gap={10} style={{ alignItems: 'flex-start' }}>
          <Avatar radius="sm" size={50} src={profileImageUrl} alt={userName} />
          <Box>
            <Text fw={500} size="sm">
              {userName}
            </Text>
            <Text c="dimmed" size="xs">
              @{userHandle}
            </Text>
          </Box>
        </Group>
        {/* TODO: ADD FEATURES WHEN YOU REALLY NEED THEM */}
        {/* <Menu shadow="md">
          <Menu.Target>
            <ActionIcon variant="transparent">
              <IconDotsVertical size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconEdit size={16} />}>Edit</Menu.Item>
            <Menu.Item leftSection={<IconShare size={16} />}>Share</Menu.Item>
          </Menu.Dropdown>
        </Menu> */}
      </Flex>
    </Card>
  );
}

export default UserNameSidebar;
