import React, { useEffect, useState } from 'react';
import { Box, Text, Alert, Skeleton, Grid, useMantineTheme } from '@mantine/core';
import classes from './url-preview.module.css'; // Import the CSS module

export interface URLPreviewData {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

interface URLPreviewProps {
  url: string;
  fetcher: (url: string) => Promise<URLPreviewData>;
  fallback: React.ReactNode;
}

const URLPreview: React.FC<URLPreviewProps> = ({ url, fetcher, fallback }) => {
  const [preview, setPreview] = useState<URLPreviewData | null>(null);
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
      <Grid>
        <Grid.Col span={3}>
          <Skeleton height={200} radius="md" />
        </Grid.Col>
        <Grid.Col span={9}>
          <Skeleton height={20} mt="xs" />
          <Skeleton height={20} mt="xs" />
          <Skeleton height={20} mt="xs" />
          <Skeleton height={20} mt="xs" />
        </Grid.Col>
      </Grid>
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
      className={classes.urlPreview}
    >
      {preview.image ? (
        <Grid>
          <Grid.Col span={3}>
            <img
              src={preview.image}
              alt={preview.title || 'Link Preview'}
              className={classes.urlPreviewImage} // Use CSS module for styling
            />
          </Grid.Col>
          <Grid.Col span={9}>
            {preview.title && <Text className={classes.urlPreviewTitle}>{preview.title}</Text>}
            {preview.description && <Text>{preview.description}</Text>}
            {preview.siteName && (
              <Text className={classes.urlPreviewSiteName}>{preview.siteName}</Text>
            )}
            {preview.hostname && (
              <Text className={classes.urlPreviewLink} style={{ color: theme.primaryColor }}>
                {preview.hostname}
              </Text>
            )}
          </Grid.Col>
        </Grid>
      ) : (
        <Box>
          {preview.title && <Text className={classes.urlPreviewTitle}>{preview.title}</Text>}
          {preview.description && <Text>{preview.description}</Text>}
          {preview.siteName && (
            <Text className={classes.urlPreviewSiteName}>{preview.siteName}</Text>
          )}
          {preview.hostname && (
            <Text
              // component="a"
              // href={url}
              // target="_blank"
              // rel="noopener noreferrer"
              className={classes.urlPreviewLink}
            >
              {preview.hostname}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default URLPreview;
