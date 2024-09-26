// pages/api/preview.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
const cheerio = require('cheerio');

interface LinkPreview {
  title: string;
  description: string;
  image: string;
  url: string;
}

const getLinkPreview = async (url: string): Promise<LinkPreview> => {
  try {
    const response = await axios.get(url);

    if (response.headers['content-type']?.includes('text/html')) {
      const $ = cheerio.load(response.data);

      const title = $('meta[property="og:title"]').attr('content') || 'No title found';
      const description =
        $('meta[property="og:description"]').attr('content') || 'No description found';
      const image = $('meta[property="og:image"]').attr('content') || 'No image found';

      return { title, description, image, url };
    } else {
      throw new Error('Response is not HTML');
    }
  } catch (error) {
    throw new Error(`Failed to fetch link preview: ${error}`);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' }); // 405 Method Not Allowed
  }

  const { url } = req.query;

  // Ensure the URL is a string
  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Decode the URL
    const decodedUrl = decodeURIComponent(url);
    const preview = await getLinkPreview(decodedUrl);
    res.status(200).json(preview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch link preview', error });
  }
}
