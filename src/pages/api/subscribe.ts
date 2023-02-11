import { query as q, values } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { fauna, userByEmailQuery, usersCollection } from '@/services/fauna';
import { stripe, SUBSCRIPTION_PRICE_ID } from '@/services/stripe';

import { authOptions } from './auth/[...nextauth]';

type FaunaDbUserResponse = values.Document<{
  email: string;
  stripe_customer_id?: string;
}>;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const session = await getServerSession(request, response, authOptions);

    const userEmail = session?.user?.email ?? undefined;

    const user = await fauna.query<FaunaDbUserResponse>(
      q.Get(userByEmailQuery(userEmail as string))
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({ email: userEmail });

      await fauna.query(
        q.Update(q.Ref(usersCollection, user.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: SUBSCRIPTION_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: `${request.headers.origin}/posts/?success=true`,
      cancel_url: `${request.headers.origin}/?canceled=true`,
    });

    response.redirect(303, stripeCheckoutSession.url as string);
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}
