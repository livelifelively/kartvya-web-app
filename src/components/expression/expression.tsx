import React from 'react';
import { Text, Avatar, Group, Paper, Box, ActionIcon, Flex, useMantineTheme } from '@mantine/core';
import { IconBookmark, IconMessageDots, IconShare3 } from '@tabler/icons-react';
import SupportOpposeButtons from '../support-oppose/support-oppose'; // Assuming this component is implemented
import { formatDistanceToNow, format } from 'date-fns';
import classes from './expression.module.css'; // Use your CSS module for styling

export interface Expression {
  id: string;
  parentId?: string | null;
  text: string;
  images?: string[];
  videos?: string[];
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  supportCount: number;
  opposeCount: number;
  commentCount: number;
  shareCount: number;
  bookmarkCount: number;
  childExpressions?: Expression[];
  quote?: {
    type: 'link' | 'expression' | 'news'; // Type of the quoted content
    content: string | Expression; // The actual content of the quote
  };
}

interface ExpressionItemProps {
  expression: Expression;
}

const ExpressionItem: React.FC<ExpressionItemProps> = ({ expression }) => {
  const theme = useMantineTheme();

  return (
    <Paper withBorder className={classes.expression}>
      <Group gap="xs">
        <Avatar src={expression.author.avatarUrl} alt={expression.author.name} radius="xl" />
        <Box>
          <Text fz="sm" fw="bold">
            {expression.author.name}
          </Text>
          <Text fz="xs" c="dimmed" title={format(new Date(expression.createdAt), 'PPpp')}>
            {formatDistanceToNow(new Date(expression.createdAt), {
              addSuffix: true,
              includeSeconds: true,
            }).replace(/^about /, '')}
          </Text>
        </Box>
      </Group>
      <Box className={classes.body}>
        <Text>{expression.text}</Text>
        {expression.images && expression.images.length > 0 && (
          <Flex mt="md" gap="sm">
            {expression.images.map((image, index) => (
              <img
                src={image}
                alt={`Expression image ${index + 1}`}
                key={index}
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
            ))}
          </Flex>
        )}
        {expression.videos && expression.videos.length > 0 && (
          <Flex mt="md" gap="sm">
            {expression.videos.map((video, index) => (
              <video key={index} controls style={{ maxWidth: '100%', borderRadius: '8px' }}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </Flex>
        )}
        {expression.quote && (
          <Box mt="md" className={classes.quote}>
            {expression.quote.type === 'link' && (
              <Text
                component="a"
                href={expression.quote.content as string}
                target="_blank"
                rel="noopener noreferrer"
              >
                {expression.quote.content as String}
              </Text>
            )}
            {expression.quote.type === 'expression' && (
              <ExpressionItem expression={expression.quote.content as Expression} />
            )}
            {expression.quote.type === 'news' && (
              <Text>{expression.quote.content as String}</Text> // Assuming content is a string for news
            )}
          </Box>
        )}
      </Box>
      <Flex
        mt="md"
        pt="xs"
        style={{ borderTop: '1px solid #e5e5e5' }}
        justify="space-between"
        direction="row"
        wrap="nowrap"
      >
        <SupportOpposeButtons
          initialSupportCount={expression.supportCount}
          initialOpposeCount={expression.opposeCount}
        />
        <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
          <ActionIcon variant="transparent" radius="md" size={32} c={theme.primaryColor}>
            <IconMessageDots className={classes.like} stroke={1.2} />
          </ActionIcon>
          <Text ta="center" fz="xs">
            {expression.commentCount}
          </Text>
        </Flex>
        <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
          <ActionIcon variant="transparent" radius="md" size={32} c={theme.primaryColor}>
            <IconShare3 className={classes.like} stroke={1.2} />
          </ActionIcon>
          <Text ta="center" fz="xs">
            {expression.shareCount}
          </Text>
        </Flex>
        <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
          <ActionIcon variant="transparent" radius="md" size={32} c={theme.primaryColor}>
            <IconBookmark className={classes.like} stroke={1.2} />
          </ActionIcon>
          <Text ta="center" fz="xs">
            {expression.bookmarkCount}
          </Text>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default ExpressionItem;
