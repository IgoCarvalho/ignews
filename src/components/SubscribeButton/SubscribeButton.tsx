import { signIn, useSession } from 'next-auth/react';
import { FormEvent } from 'react';

import styles from './SubscribeButton.module.scss';

export function SubscribeButton() {
  const session = useSession();

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    if (!session.data?.user) {
      event.preventDefault();
      signIn('github');
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
