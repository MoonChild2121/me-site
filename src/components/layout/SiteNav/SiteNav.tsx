'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBriefcase, FiBookOpen, FiMail } from 'react-icons/fi';

import { useNavStyles } from './useNavStyles';

const navLinks = [
  {
    href: '/work',
    label: 'Work',
    icon: <FiBriefcase size={18} aria-hidden />,
  },
  {
    href: '/log',
    label: 'Log',
    icon: <FiBookOpen size={18} aria-hidden />,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <FiMail size={18} aria-hidden />,
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
          <div className={s.spacer} aria-hidden />
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
        </div>
      </nav>
    </header>
  );
}
