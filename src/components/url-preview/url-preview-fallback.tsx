import React from 'react';
import { Text, Anchor, Center } from '@mantine/core';

interface URLPreviewFallbackProps {
  url: string;
}

const URLPreviewFallback: React.FC<URLPreviewFallbackProps> = ({ url }) => {
  return (
    <Center>
      <Text size="sm">
        Unable to load link preview.
        <Anchor href={url} target="_blank" rel="noopener noreferrer" color="blue" ml="sm">
          {url}
        </Anchor>
      </Text>
    </Center>
  );
};

export default URLPreviewFallback;
