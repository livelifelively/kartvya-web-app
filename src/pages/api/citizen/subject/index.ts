import { createGraphQLClient } from '@/be-components/dgraph-client/graphql-client';
import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import authOptions from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await saveSubjects(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function saveSubjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: any = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { subjects } = req.body;
    const graphQLClient = await createGraphQLClient();

    const mutation = `
      mutation UpdateCitizenProfile($email: String!, $subjects: [String!]!) {
        update_Citizen_Profile_(input: {
          filter: { user: { email: { eq: $email } } }
          set: {
            policy_domains: [{ name_id_in: $subjects }]
          }
        }) {
          _Citizen_Profile_ {
            id
            policy_domains {
              name_id
            }
          }
        }
      }
    `;

    const variables = {
      email: session.user.email,
      subjects: subjects,
    };

    const response = await graphQLClient.request(mutation, variables);
    res.status(200).json(response);
  } catch (error) {
    console.error('Failed to save subjects:', error);
    res.status(500).json({ error: 'Failed to save subjects' });
  }
}
