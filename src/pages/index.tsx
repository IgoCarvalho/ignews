import { GetStaticProps } from 'next';
import Head from 'next/head';

import { AvatarImg } from '@/assets/images/AvatarImg';
import { SubscribeButton } from '@/components/SubscribeButton/SubscribeButton';
import { stripe, SUBSCRIPTION_PRICE_ID } from '@/services/stripe';

import styles from '@/styles/Home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ignews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>

          <h1>
            News about <br /> the <span>React</span> world
          </h1>

          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>

        <AvatarImg />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(SUBSCRIPTION_PRICE_ID);

  const usdFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const product = {
    priceId: price.id,
    amount: usdFormatter.format(Number(price.unit_amount) / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
