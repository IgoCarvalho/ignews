import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { saveSubscription } from '@/services/fauna';
import { isEventRelevant, stripe, StripeWebhooks } from '@/services/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const reqBuff = await buffer(request);
    const stripeSignature = request.headers['stripe-signature'] as string;
    const stripeWebHookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(reqBuff, stripeSignature, stripeWebHookSecret);
    } catch (error) {
      return response.status(400).send(`Webhook Error: ${(error as Error).message}`);
    }

    if (isEventRelevant(event.type)) {
      try {
        switch (event.type) {
          case StripeWebhooks.Completed: {
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            const subscriptionId = checkoutSession.subscription?.toString() as string;
            const customerId = checkoutSession.customer?.toString() as string;

            await saveSubscription(subscriptionId, customerId);
            break;
          }
          default:
            throw new Error('Unhandled event.');
        }
      } catch (error) {
        return response.json({ error: 'Webhook handler failed.' });
      }
    }

    return response.json({ received: true });
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}
