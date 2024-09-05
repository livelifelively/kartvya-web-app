import NextAuth, { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';

// import Providers from 'next-auth/providers';
import LinkedInProvider, { LinkedInProfile } from 'next-auth/providers/linkedin';
import { DgraphAdapter } from '@/be-components/dgraph-next-auth-adapter';
// import { DgraphAdapter } from '@auth/dgraph-adapter';

const jwt = require('jsonwebtoken');

// #TODO: Read documentation
// https://authjs.dev/concepts/session-strategies
// https://datatracker.ietf.org/meeting/105/materials/slides-105-oauth-sessa-json-web-token-jwt-profile-for-oauth-20-access-tokens-02-00

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_AUTH_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_AUTH_SECRET as string,
      authorization: {
        params: {
          scope: 'openid profile email',
          redirect_uri: `${process.env.NEXTAUTH_URL}/callback/linkedin`,
        },
      },
      client: { token_endpoint_auth_method: 'client_secret_post' },
      issuer: 'https://www.linkedin.com',
      profile: (profile: LinkedInProfile) => {
        const toSave: any = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          issuer: profile.iss,
          email_verified: profile.email_verified,
          // emailVerified: profile.email_verified === 'true' ? new Date().toISOString() : null,
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
        // token.accessToken
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
      const key = process.env.VERIFICATION_KEY || '';
      return jwt.sign(token, key, { algorithm: 'HS256' });
    },
    async decode({ token }) {
      const key = process.env.VERIFICATION_KEY || '';
      return jwt.verify(token, key, { algorithms: ['HS256'] });
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    newUser: '/citizen/know',
  },
  debug: process.env.NODE_ENV === 'development',
} as NextAuthOptions);
