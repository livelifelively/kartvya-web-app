import NextAuth, { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';

// import Providers from 'next-auth/providers';
import LinkedInProvider, { LinkedInProfile } from 'next-auth/providers/linkedin';
import AWS from 'aws-sdk';
import { DgraphAdapter } from '@/be-components/dgraph-next-auth-adapter';
// import { DgraphAdapter } from '@auth/dgraph-adapter';

const jwt = require('jsonwebtoken');

// Initialize AWS Secrets Manager client
const secretsManager = new AWS.SecretsManager({
  region: process.env.AWS_REGION,
});

const getSecretValue = async (SecretId: string): Promise<string> => {
  try {
    const secret = await secretsManager.getSecretValue({ SecretId }).promise();
    return secret.SecretString || '';
  } catch (error) {
    console.error(`Error retrieving secret ${SecretId}:`, error);
    throw new Error(`Failed to retrieve secret ${SecretId}`);
  }
};

// Load RSA keys from AWS Secrets Manager
const loadKeys = async () => {
  const privateKey = await getSecretValue(process.env.PRIVATE_KEY_SECRET_ID || '');
  const publicKey = await getSecretValue(process.env.PUBLIC_KEY_SECRET_ID || '');
  return { privateKey, publicKey };
};

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_AUTH_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_AUTH_SECRET as string,
      authorization: {
        params: { scope: 'openid profile email' },
      },
      client: { token_endpoint_auth_method: 'client_secret_post' },
      issuer: 'https://www.linkedin.com',
      profile: (profile: LinkedInProfile) => {
        const toSave: any = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified === 'true' ? new Date().toISOString() : null,
        };

        return toSave;
      },
      wellKnown: 'https://www.linkedin.com/oauth/.well-known/openid-configuration',
    }),
  ],
  adapter: DgraphAdapter({
    endpoint: process.env.AUTH_DGRAPH_GRAPHQL_ENDPOINT || '',
    authToken: process.env.AUTH_DGRAPH_GRAPHQL_KEY || '',
    // you can omit the following properties if you are running an unsecure schema
    authHeader: process.env.AUTH_HEADER,
    jwtSecret: process.env.AUTH_SECRET,
    jwtAlgorithm: 'HS256',
  }) as Adapter,
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id;
      }

      switch (trigger) {
        case 'signIn':
          console.log('User revisiting');
          break;
        case 'signUp':
          console.log('New User Registered');
          break;
        case 'update':
          console.log('udpate event');
          break;
      }

      return token;
    },
    session: async ({ session, token }) =>
      // session?.user?.id = token.id;
      ({ ...session, token }),
  },
  jwt: {
    // Load keys asynchronously
    async encode({ token }) {
      const { publicKey } = await loadKeys();
      return jwt.sign(token, publicKey, { algorithm: 'HS256' });
    },
    async decode({ token }) {
      const { publicKey } = await loadKeys();
      return jwt.verify(token, publicKey, { algorithms: ['HS256'] });
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/know',
  },
  debug: true,
} as NextAuthOptions);
