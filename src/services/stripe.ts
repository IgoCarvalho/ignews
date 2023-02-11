import Stripe from 'stripe';
import { query as q } from 'faunadb';

import packageJson from '../../package.json';

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: packageJson.name,
    version: packageJson.version,
  },
});

export const SUBSCRIPTION_PRICE_ID = 'price_1MZdPKF2dcVlCjLZ8bUl9hL0';

export const userByEmailQuery = (email: string) =>
  q.Match(q.Index('user_by_email'), q.Casefold(email));
export const usersCollection = q.Collection('Users');
