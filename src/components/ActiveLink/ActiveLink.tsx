import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
  activeClass: string;
}

export function ActiveLink({ children, activeClass, ...props }: ActiveLinkProps) {
  const { pathname } = useRouter();

  const activeClassName = pathname === props.href ? activeClass : '';

  return (
    <Link className={activeClassName} {...props}>
      {children}
    </Link>
  );
}
