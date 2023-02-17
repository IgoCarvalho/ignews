import { query as q } from 'faunadb';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { fauna, userByEmailQuery } from '@/services/fauna';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const userEmail = session.user?.email ?? '';

        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select('ref', q.Get(userByEmailQuery(userEmail)))
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
    signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const userByEmailQuery = q.Match(q.Index('user_by_email'), q.Casefold(user.email));
      const usersCollection = q.Collection('Users');

      try {
        fauna.query(
          q.If(
            q.Not(q.Exists(userByEmailQuery)),
            q.Create(usersCollection, { data: { email: user.email } }),
            q.Get(userByEmailQuery)
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
