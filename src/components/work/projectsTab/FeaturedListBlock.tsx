'use client';

import type { CSSProperties } from 'react';

import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './ProjectsTab.module.css';

type FeaturedListBlockProps = {
  label: string;
  items: string[];
  index: number;
  ariaLabel: string;
};

export default function FeaturedListBlock({ label, items, index, ariaLabel }: FeaturedListBlockProps) {
  return (
    <section
      className={`${styles.featuredBlock} ${shared.stagger}`}
      style={staggerStyle(index) as CSSProperties}
      aria-label={ariaLabel}
    >
      <div className={styles.blockLabel}>{label}</div>
      <ul className={styles.blockList}>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

