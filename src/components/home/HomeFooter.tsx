'use client';

import { FiLinkedin, FiGithub, FiFileText } from 'react-icons/fi';
import type { ReactNode } from 'react';

import ButtonLink from '@/components/common/ButtonLink/ButtonLink';
import styles from './HomeFooter.module.css';

const LINKS: { href: string; label: string; icon: ReactNode; external: boolean }[] = [
  {
    href: 'https://linkedin.com/in/zainab-kashif-193b26218',
    label: 'LinkedIn',
    icon: <FiLinkedin size={16} aria-hidden />,
    external: true,
  },
  {
    href: 'https://github.com/MoonChild2121',
    label: 'GitHub',
    icon: <FiGithub size={16} aria-hidden />,
    external: true,
  },
  {
    href: '/cv',
    label: 'Read CV',
    icon: <FiFileText size={16} aria-hidden />,
    external: false,
  },
];

export default function HomeFooter() {
  return (
    <footer className={styles.footer} aria-label="Home footer">
      <div className={styles.inner}>
        <div className={styles.copy}>&copy; 2026 Zainab Kashif &mdash; Built with intent.</div>
        <ul className={styles.links} aria-label="Footer links">
          {LINKS.map(link => (
            <li key={link.label}>
              <ButtonLink
                href={link.href}
                variant="ghost"
                external={link.external}
                aria-label={link.label}
              >
                <span className={styles.linkIcon}>{link.icon}</span>
                <span className={styles.linkLabel}>{link.label}</span>
              </ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

