// onboarding/select-regions (get, post)
// onboarding/select-subjects (get, post)

import { createGraphQLClient } from '@/be-components/dgraph-client/graphql-client';
import { queryNodeTypeFilter } from '@/be-components/dgraph-client/queries';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' }); // 405 Method Not Allowed
  }

  const graphQLClient = await createGraphQLClient();

  const states = await queryNodeTypeFilter(
    '_Indian_State_Union_Territory_',
    graphQLClient,
    { name_id: { in: ['in-sut-himachal-pradesh', 'in-sut-punjab'] } },
    [
      `
      name_id
      names {
        name
      }
      active_version {
        region {
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
    ]
  );

  res.status(200).json(states);
}
