// pages/api/preview.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';
import { URL } from 'url';
import { URLPreviewData } from '@/components/url-preview/url-preview';

const getURLPreview = async (url: string): Promise<URLPreviewData> => {
  try {
    const response = await axios.get(url);

    // Check if the response is HTML
    if (response.headers['content-type']?.includes('text/html')) {
      const $ = cheerio.load(response.data);

      const title = $('meta[property="og:title"]').attr('content') || null;
      const description = $('meta[property="og:description"]').attr('content') || null;
      const image = $('meta[property="og:image"]').attr('content') || null;
      const siteName = $('meta[property="og:site_name"]').attr('content') || null;

      // Extract hostname from the URL
      const hostname = new URL(url).hostname;

      return { title, description, image, siteName, hostname };
    }
    throw new Error('Response is not HTML');
  } catch (error) {
    throw new Error(`Failed to fetch link preview: ${error}`);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' }); // 405 Method Not Allowed
  }

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const preview = await getURLPreview(decodedUrl);
    res.status(200).json(preview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch link preview', error });
  }
}
