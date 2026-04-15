import { useMemo } from 'react';

import styles from './SearchBar.module.css';

export function useSearchBarStyles() {
  return useMemo(
    () => ({
      root: styles.root,
      iconWrap: styles.iconWrap,
      divider: styles.divider,
      input: styles.input,
    }),
    []
  );
}

