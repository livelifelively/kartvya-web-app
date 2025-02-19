import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';

export async function authenticateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: any = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return session.user;
  } catch (error) {
    console.error('Failed to authenticate user:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
}
