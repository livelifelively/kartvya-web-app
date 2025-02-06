import React from 'react';
import { Box, Button, Text, Title } from '@mantine/core';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Application Error:', error, info);
  }

  render() {
    const {
      children,
      title = 'Something went wrong',
      description = 'An unexpected error occurred',
      actionLabel = 'Reload Page',
      onAction = () => window.location.reload(),
      fallback,
    } = this.props;

    if (this.state.hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Box ta="center" mt={50}>
          <Title order={2} c="red">
            {title}
          </Title>
          <Text c="dimmed" mt={10} mb={20}>
            {description || this.state.error?.message}
          </Text>
          <Button onClick={onAction} variant="filled" color="yellow">
            {actionLabel}
          </Button>
        </Box>
      );
    }

    return children;
  }
}
