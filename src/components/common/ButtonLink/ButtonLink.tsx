import type { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

import styles from './ButtonLink.module.css';

type ButtonLinkVariant = 'outline' | 'small' | 'ghost';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonLinkVariant;
  chrome?: 'default' | 'work';
  href: string;
  external?: boolean;
  className?: string;
};

export default function ButtonLink({
  variant = 'outline',
  chrome = 'default',
  href,
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cls = [
    styles.btn,
    styles[variant],
    chrome === 'work' && variant === 'outline' ? styles.outlineChromeWork : '',
    className ?? '',
  ].filter(Boolean).join(' ');

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
