import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './SignInButton.module.scss';

export function SignInButton() {
  const session = useSession();

  function handleSigIn() {
    signIn('github');
  }

  function handleSignOut() {
    signOut();
  }

  return session.data ? (
    <button type="button" className={styles.signInButton} onClick={handleSignOut}>
      <FaGithub color="#04D361" />
      {session.data.user?.name}
      <FiX color="#737380" />
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={handleSigIn}>
      <FaGithub color="#EBA417" />
      Sign in with GitHub
    </button>
  );
}
