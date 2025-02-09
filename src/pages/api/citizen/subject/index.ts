import { createGraphQLClient } from '@/be-components/dgraph-client/graphql-client';
import { authenticateUser } from '@/be-components/auth';
import { upsertCitizenProfile } from '@/be-components/citizen-profile';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = await authenticateUser(req, res);
    const profileId = await upsertCitizenProfile(user);
    const response = await saveSubjects(req, res, profileId);
    res.status(200).json(response);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function saveSubjects(req: NextApiRequest, res: NextApiResponse, profileId: string) {
  try {
    const { subjects } = req.body;
    const graphQLClient = await createGraphQLClient();

    const subjectsNameIds = subjects.map((val: string) => {
      return { name_id: val };
    });

    const mutation = `
      mutation UpdateCitizenProfile($profileId: [ID!]!, $subjects: [_Public_Policy_Domain_Ref!]!) {
        update_Citizen_Profile_(input: {
          filter: { id: $profileId }
          set: {
            policy_domains: $subjects
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
      profileId,
      subjects: subjectsNameIds,
    };

    const response = await graphQLClient.request(mutation, variables);
    return response;
  } catch (error) {
    console.error('Failed to save subjects:', error);
    res.status(500).json({ error: 'Failed to save subjects' });
  }
}
