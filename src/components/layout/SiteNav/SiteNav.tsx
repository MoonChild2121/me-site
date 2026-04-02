'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useNavStyles } from './useNavStyles';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/contact', label: 'Contact' },
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
            Zainab Kashif
          </Link>
          <ul className={s.center}>
            {navLinks.map(({ href, label }) => {
              const active =
                pathname === href || pathname?.startsWith(`${href}/`);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={active ? `${s.link} ${s.linkActive}` : s.link}
                  >
                    {label}
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
