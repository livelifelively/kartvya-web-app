import { createGraphQLClient } from '../dgraph-client/graphql-client';
import { queryNodeTypeFilter, createNodeType } from '../dgraph-client/queries';

/**
 * Upsert a citizen profile
 * @param user - The user object
 * @returns The id of the created profile
 */
export async function upsertCitizenProfile(user: any) {
  const graphQLClient = await createGraphQLClient();

  // Check if user has a citizen profile
  const userWithProfile = await queryNodeTypeFilter('User', graphQLClient, { id: { eq: user.id } }, [
    'id',
    'citizen_profile { id }',
  ]);

  if (userWithProfile?.[0]?.citizen_profile?.id) {
    return userWithProfile[0].citizen_profile.id;
  }

  // Create new profile if doesn't exist
  const nodeData = {
    user: { id: user.id },
    node_created_on: new Date().toISOString(),
  };

  const newProfileId = await createNodeType('_Citizen_Profile_', graphQLClient, nodeData);
  return newProfileId;
}

/**
 * Save the regions for a citizen profile
 * @param regions - The regions object
 * @param profileId - The id of the profile
 * @returns The id of the updated profile
 */
export async function saveRegions(regions: any, profileId: string) {
  try {
    const graphQLClient = await createGraphQLClient();

    const mutation = `
          mutation UpdateCitizenProfile($regions: _Citizen_Profile_Regions_Input!) {
            update_Citizen_Profile_(input: {
              filter: { id: { eq: $profileId } }
              set: $regions
            }) {
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
      profileId,
    };

    const response = await graphQLClient.request(mutation, variables);
    return response;
  } catch (error) {
    console.error('Failed to save regions:', error);
    throw error;
  }
}
