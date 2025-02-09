// onboarding/select-regions (get, post)
// onboarding/select-subjects (get, post)

import { createGraphQLClient } from '@/be-components/dgraph-client/graphql-client';
import { queryNodeTypeFilter } from '@/be-components/dgraph-client/queries';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/[...nextauth]';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const states = await getRegions();
    res.status(200).json(states);
  } else if (req.method === 'POST') {
    await saveRegions(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function saveRegions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: any = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { regions } = req.body;
    const graphQLClient = await createGraphQLClient();

    const mutation = `
      mutation UpdateCitizenProfile($regions: _Citizen_Profile_Regions_Input!) {
        update_Citizen_Profile_(input: $regions) {
          _Citizen_Profile_ {
            id
            state_or_union_territories {
              name_id
            }
            districts {
              name_id
            }
            loksabha_constituencies {
              name_id
            }
            vidhansabha_constituencies {
              name_id
            }
          }
        }
      }
    `;

    const variables = {
      regions: {
        state_or_union_territories: [{ name_id: regions.state.name_id }],
        districts: [{ name_id: regions.district.name_id }],
        loksabha_constituencies: [{ name_id: regions.loksabhaConstituency.name_id }],
        vidhansabha_constituencies: [{ name_id: regions.vidhansabhaConstituency.name_id }],
      },
    };

    const response = await graphQLClient.request(mutation, variables);
    res.status(200).json(response);
  } catch (error) {
    console.error('Failed to save regions:', error);
    res.status(500).json({ error: 'Failed to save regions' });
  }
}

async function getRegions() {
  const graphQLClient = await createGraphQLClient();

  const filter = { name_id: { in: ['in-sut-himachal-pradesh', 'in-sut-punjab'] } };

  const states = await queryNodeTypeFilter('_Indian_State_Union_Territory_', graphQLClient, filter, [
    `
      name_id
      names {
        name
      }
      active_version {
        region {
          name_id
          districts {
            name_id
            self {
              name_id
              names {
                name
              }
            }
            loksabha_constituencies {
              name_id
            }
            vidhansabha_constituencies {
              name_id
            }
          }

          loksabha_constituencies {
            name_id
            self {
              name_id
              names {
                name
              }
            }
            vidhansabha_constituencies {
              name_id
            }
          }

          vidhansabha_constituencies {
            name_id
            self {
              name_id
              names {
                name
              }
            }
            loksabha_constituencies {
              name_id
            }
          }
        }
      }
    `,
  ]);

  return states;
}
