import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export const successNotification = ({
  title,
  message,
  autoClose = 5000,
}: {
  title: string;
  message: string;
  autoClose?: any;
}) => {
  notifications.show({
    color: 'green',
    icon: <IconCheck />,
    title,
    message,
    autoClose,
  });
};
