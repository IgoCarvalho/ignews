import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';

import styles from './SubscribeButton.module.scss';

export function SubscribeButton() {
  const session = useSession();
  const router = useRouter();

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    if (!session.data?.user) {
      event.preventDefault();
      signIn('github');
      return;
    }

    if (session.data.activeSubscription) {
      event.preventDefault();
      router.push('/posts');
      return;
    }
  }

  return (
    <form onSubmit={handleSubscribe} action="/api/subscribe" method="POST">
      <button type="submit" className={styles.subscribeButton}>
        Subscribe now
      </button>
    </form>
  );
}
