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

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

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
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    newUser: '/citizen/know',
  },
  debug: process.env.NODE_ENV === 'development',
} as NextAuthOptions);
