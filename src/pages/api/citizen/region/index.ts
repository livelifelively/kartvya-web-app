// onboarding/select-regions (get, post)
// onboarding/select-subjects (get, post)

import { createGraphQLClient } from '@/be-components/dgraph-client/graphql-client';
import { queryNodeTypeFilter } from '@/be-components/dgraph-client/queries';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const states = await getRegions();
    res.status(200).json(states);
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
