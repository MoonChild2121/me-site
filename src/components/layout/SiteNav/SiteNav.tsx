'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useNavStyles } from './useNavStyles';

const navLinks = [
  {
    href: '/work',
    label: 'Work',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    href: '/log',
    label: 'Log',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function SiteNav() {
  const pathname = usePathname();
  const s = useNavStyles();
  const isHome = pathname === '/';

  return (
    <header className={s.header}>
      <nav className={s.nav} aria-label="Main">
        <div className={s.bar}>
          <Link
            href="/"
            className={
              isHome ? `${s.brand} ${s.brandActive}` : s.brand
            }
          >
            ZK
          </Link>
          <ul className={s.center}>
            {navLinks.map(({ href, label, icon }) => {
              const active =
                pathname === href || pathname?.startsWith(`${href}/`);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={active ? `${s.link} ${s.linkActive}` : s.link}
                    aria-label={label}
                  >
                    <span className={s.linkIcon}>{icon}</span>
                    <span className={s.linkLabel}>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={s.spacer} aria-hidden />
        </div>
      </nav>
    </header>
  );
}
