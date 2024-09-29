import React, { useEffect, useState } from 'react';
import { Box, Text, Alert, Skeleton, Grid, useMantineTheme } from '@mantine/core';
import classes from './link-preview.module.css'; // Import the CSS module

export interface LinkPreviewData {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

interface LinkPreviewProps {
  url: string;
  fetcher: (url: string) => Promise<LinkPreviewData>;
  fallback: React.ReactNode;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, fetcher, fallback }) => {
  const [preview, setPreview] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useMantineTheme();

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const data = await fetcher(url);
        setPreview(data);
      } catch (err) {
        setError('Failed to load link preview');
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [url, fetcher]);

  if (loading) {
    return (
      <Box mt="sm">
        <Skeleton height={200} radius="md" />
        <Skeleton height={20} mt="xs" />
        <Skeleton height={20} mt="xs" />
        <Skeleton height={20} mt="xs" />
      </Box>
    );
  }

  if (error) {
    return <Alert color="red">{error}</Alert>;
  }

  if (!preview) {
    return <>{fallback}</>;
  }

  return (
    <Box
      mt="sm"
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.linkPreview}
    >
      {preview.image ? (
        <Grid>
          <Grid.Col span={3}>
            <img
              src={preview.image}
              alt={preview.title || 'Link Preview'}
              className={classes.linkPreviewImage} // Use CSS module for styling
            />
          </Grid.Col>
          <Grid.Col span={9}>
            {preview.title && <Text className={classes.linkPreviewTitle}>{preview.title}</Text>}
            {preview.description && <Text>{preview.description}</Text>}
            {preview.siteName && (
              <Text className={classes.linkPreviewSiteName}>{preview.siteName}</Text>
            )}
            {preview.hostname && (
              <Text className={classes.linkPreviewLink} style={{ color: theme.primaryColor }}>
                {preview.hostname}
              </Text>
            )}
          </Grid.Col>
        </Grid>
      ) : (
        <Box>
          {preview.title && <Text className={classes.linkPreviewTitle}>{preview.title}</Text>}
          {preview.description && <Text>{preview.description}</Text>}
          {preview.siteName && (
            <Text className={classes.linkPreviewSiteName}>{preview.siteName}</Text>
          )}
          {preview.hostname && (
            <Text
              // component="a"
              // href={url}
              // target="_blank"
              // rel="noopener noreferrer"
              className={classes.linkPreviewLink}
            >
              {preview.hostname}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default LinkPreview;
