import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export const errorNotification = ({
  title,
  message,
  autoClose = 6000,
}: {
  title: string;
  message: string;
  autoClose?: any;
}) => {
  notifications.show({
    color: 'red',
    icon: <IconX />,
    title,
    message,
    autoClose,
  });
};
