'use client';

import Link from 'next/link';

import styles from './HomeFooter.module.css';

const LINKS = [
  {
    href: 'https://linkedin.com/in/zainab-kashif-193b26218',
    label: 'LinkedIn',
    external: true,
  },
  {
    href: 'https://github.com/MoonChild2121',
    label: 'GitHub',
    external: true,
  },
  {
    href: '/cv',
    label: 'Read CV',
    external: false,
  },
];

export default function HomeFooter() {
  return (
    <footer className={styles.footer} aria-label="Home footer">
      <div className={styles.copy}>&copy; 2026 Zainab Kashif &mdash; Built with intent.</div>
      <ul className={styles.links} aria-label="Footer links">
        {LINKS.map(link => (
          <li key={link.label}>
            {link.external ? (
              <a className={styles.link} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : (
              <Link className={styles.link} href={link.href}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
}

