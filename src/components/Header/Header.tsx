import { LogoImg } from '@/assets/images/LogoImg';
import { ActiveLink } from '@/components/ActiveLink/ActiveLink';
import { SignInButton } from '@/components/SignInButton/SignInButton';

import styles from './Header.module.scss';
import Link from 'next/link';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <LogoImg />
        </Link>

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
