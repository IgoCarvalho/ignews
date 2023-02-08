import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './SignInButton.module.scss';

export function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04D361" />
      Sign in with GitHub
      <FiX color="#737380" />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#EBA417" />
      Sign in with GitHub
    </button>
  );
}
