import { NextApiRequest, NextApiResponse } from 'next';
import { getPostCounts, updatePostCount } from '@/be-components/dgraph';
import { verifyToken } from '../../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;
  const token = req.headers.authorization?.split(' ')[1];

  try {
    // Verify the authentication token
    const user = verifyToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'GET':
        await handleGetRequest(postId as string, res);
        break;
      case 'PATCH':
        await handlePatchRequest(postId as string, req.body, res);
        break;
      case 'DELETE':
        await handleDeleteRequest(postId as string, req.body, res);
        break;
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Handle GET request to fetch initial counts
async function handleGetRequest(postId: string, res: NextApiResponse) {
  try {
    const counts = await getPostCounts(postId);
    res.status(200).json(counts);
  } catch (error) {
    console.error('Error fetching post counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Handle PATCH request to update support or oppose count
async function handlePatchRequest(postId: string, body: { action: string }, res: NextApiResponse) {
  const { action } = body;
  if (!['support', 'oppose'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    const updatedCount = await updatePostCount(postId, action, 1);
    res.status(200).json(updatedCount);
  } catch (error) {
    console.error('Error updating post count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Handle DELETE request to remove support or oppose count
async function handleDeleteRequest(postId: string, body: { action: string }, res: NextApiResponse) {
  const { action } = body;
  if (!['support', 'oppose'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    const updatedCount = await updatePostCount(postId, action, -1);
    res.status(200).json(updatedCount);
  } catch (error) {
    console.error('Error updating post count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
