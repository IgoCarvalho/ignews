import Image from 'next/image';

import logoImg from '@/assets/images/logo.svg';
import { ActiveLink } from '@/components/ActiveLink/ActiveLink';
import { SignInButton } from '@/components/SignInButton/SignInButton';

import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoImg} alt="ig.news" />

        <nav>
          <ActiveLink activeClass={styles.active} href="/">
            Home
          </ActiveLink>
          <ActiveLink activeClass={styles.active} href="/posts">
            Posts
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
