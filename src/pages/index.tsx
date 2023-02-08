import Head from 'next/head';
import Image from 'next/image';

import avatarImg from '@/assets/images/avatar.svg';

import styles from '@/styles/Home.module.scss';

export default function Home() {
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
            <span>for $9.90 month</span>
          </p>
        </section>

        <Image src={avatarImg} alt="Girl coding" />
      </main>
    </>
  );
}
