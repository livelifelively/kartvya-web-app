import axios from 'axios';

const DGRAPH_GRAPHQL_ENDPOINT = 'YOUR_DGRAPH_GRAPHQL_ENDPOINT';

interface PostCounts {
  supportCount: number;
  opposeCount: number;
}

// Fetch support and oppose counts for a post
export async function getPostCounts(postId: string): Promise<PostCounts> {
  const response = await axios.post(DGRAPH_GRAPHQL_ENDPOINT, {
    query: `
      query {
        getPost(id: "${postId}") {
          supportCount
          opposeCount
        }
      }
    `,
  });

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.getPost;
}

// Update support or oppose count for a post
export async function updatePostCount(
  postId: string,
  action: string,
  increment: number
): Promise<PostCounts> {
  const field = action === 'support' ? 'supportCount' : 'opposeCount';

  const response = await axios.post(DGRAPH_GRAPHQL_ENDPOINT, {
    query: `
      mutation {
        updatePost(input: { filter: { id: ["${postId}"] }, set: { ${field}: ${field} + ${increment} } }) {
          post {
            ${field}
          }
        }
      }
    `,
  });

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.updatePost.post[0];
}
