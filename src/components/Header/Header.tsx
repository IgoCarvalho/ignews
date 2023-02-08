import Image from 'next/image';

import styles from './Header.module.scss';

import logoImg from '@/assets/images/logo.svg';
import { SignInButton } from '../SignInButton/SignInButton';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoImg} alt="ig.news" />

        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
