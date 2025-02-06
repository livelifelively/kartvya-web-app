export async function createGraphQLClient() {
  const { GraphQLClient } = await import('graphql-request');

  // kartvya-2
  const endpoint = process.env.AUTH_DGRAPH_GRAPHQL_ENDPOINT;
  const apiKey = process.env.AUTH_DGRAPH_GRAPHQL_KEY;

  return new GraphQLClient(endpoint as string, {
    headers: {
      Authorization: apiKey as string,
    },
  });
}
