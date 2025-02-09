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
  const userWithProfile = await queryNodeTypeFilter('User', graphQLClient, { email: { eq: user.email } }, [
    'id',
    'citizen_profile { id }',
  ]);

  if (userWithProfile?.[0]?.citizen_profile?.id) {
    return userWithProfile[0].citizen_profile.id;
  }

  // Create new profile if doesn't exist
  const nodeData = {
    user: { email: user.email },
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
export async function saveRegions(
  stateOrUnionTerritories: any,
  districts: any,
  loksabhaConstituencies: any,
  vidhansabhaConstituencies: any,
  profileId: string
) {
  try {
    const graphQLClient = await createGraphQLClient();

    const mutation = `
          mutation UpdateCitizenProfile(
            $profileId: [ID!]!, 
            $state_or_union_territories: [_Indian_State_Union_Territory_Ref], 
            $districts: [_Indian_District_Ref], 
            $loksabha_constituencies: [_Indian_Loksabha_Constituency_Ref], 
            $vidhansabha_constituencies: [_Indian_Vidhansabha_Constituency_Ref]
          ) {
            update_Citizen_Profile_(input: {
              filter: { id: $profileId }
              set: {
                state_or_union_territories: $state_or_union_territories
                districts: $districts
                loksabha_constituencies: $loksabha_constituencies
                vidhansabha_constituencies: $vidhansabha_constituencies
              }
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
      state_or_union_territories: [{ name_id: stateOrUnionTerritories.name_id }],
      districts: [{ name_id: districts.name_id }],
      loksabha_constituencies: [{ name_id: loksabhaConstituencies.name_id }],
      vidhansabha_constituencies: [{ name_id: vidhansabhaConstituencies.name_id }],
      profileId,
    };

    const response = await graphQLClient.request(mutation, variables);
    return response;
  } catch (error) {
    console.error('Failed to save regions:', error);
    throw error;
  }
}
