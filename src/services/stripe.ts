import Stripe from 'stripe';

import packageJson from '../../package.json';

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: packageJson.name,
    version: packageJson.version,
  },
});

export const SUBSCRIPTION_PRICE_ID = 'price_1MZdPKF2dcVlCjLZ8bUl9hL0';

export const StripeWebhooks = {
  Completed: 'checkout.session.completed',
  SubscriptionDeleted: 'customer.subscription.deleted',
  SubscriptionUpdated: 'customer.subscription.updated',
};

export function isEventRelevant(hook: string) {
  return Object.values(StripeWebhooks).includes(hook);
}
