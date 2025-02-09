import { authenticateUser } from '@/be-components/auth';
import { saveRegions, upsertCitizenProfile } from '@/be-components/citizen-profile';
import { getRegions } from '@/be-components/regions';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const states = await getRegions();
    res.status(200).json(states);
  } else if (req.method === 'POST') {
    const user = await authenticateUser(req, res);
    const profileId = await upsertCitizenProfile(user);
    const { regions } = req.body;

    await saveRegions(regions, profileId);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
