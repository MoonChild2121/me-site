import { useMemo } from 'react';

import styles from './SiteNav.module.css';

export function useNavStyles() {
  return useMemo(
    () => ({
      header: styles.header,
      nav: styles.nav,
      bar: styles.bar,
      brand: styles.brand,
      brandActive: styles.brandActive,
      center: styles.center,
      spacer: styles.spacer,
      link: styles.link,
      linkActive: styles.linkActive,
    }),
    []
  );
}
