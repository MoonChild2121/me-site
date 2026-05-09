'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AppMainScroll() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelector('main.app-main')?.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
