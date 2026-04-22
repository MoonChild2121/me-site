import type { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

import styles from './ButtonLink.module.css';

type ButtonLinkVariant = 'outline' | 'small' | 'ghost';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonLinkVariant;
  href: string;
  external?: boolean;
  className?: string;
};

export default function ButtonLink({
  variant = 'outline',
  href,
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cls = [styles.btn, styles[variant], className ?? ''].filter(Boolean).join(' ');

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link className={cls} href={href} {...rest}>
      {children}
    </Link>
  );
}
