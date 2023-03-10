import { Client, query as q } from 'faunadb';
import { stripe } from './stripe';

export const fauna = new Client({
  secret: process.env.FAUNA_KEY as string,
});

export const userByEmailQuery = (email: string) =>
  q.Match(q.Index('user_by_email'), q.Casefold(email));

export const userByStripeCustomerIdQuery = (customerId: string) =>
  q.Match(q.Index('user_by_stripe_customer_id'), customerId);

export const subscriptionByIdQuery = (subscriptionId: string) =>
  q.Match(q.Index('subscription_by_id'), subscriptionId);

export const usersCollection = q.Collection('Users');
export const subscriptionsCollection = q.Collection('Subscriptions');

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  isCreating = false
) {
  const userRef = await fauna.query(
    q.Select('ref', q.Get(userByStripeCustomerIdQuery(customerId)))
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  };

  if (isCreating) {
    await fauna.query(q.Create(subscriptionsCollection, { data: subscriptionData }));
  } else {
    await fauna.query(
      q.Replace(q.Select('ref', q.Get(subscriptionByIdQuery(subscriptionId))), {
        data: subscriptionData,
      })
    );
  }
}
