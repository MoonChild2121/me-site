'use client';

import { usePathname } from 'next/navigation';

import SiteFooter from './SiteFooter/SiteFooter';

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname === '/work' || pathname?.startsWith('/work/')) return null;

  return <SiteFooter />;
}

