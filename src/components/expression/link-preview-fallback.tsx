import React from 'react';
import { Text, Anchor, Center } from '@mantine/core';

interface LinkPreviewFallbackProps {
  url: string;
}

const LinkPreviewFallback: React.FC<LinkPreviewFallbackProps> = ({ url }) => {
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

export default LinkPreviewFallback;
