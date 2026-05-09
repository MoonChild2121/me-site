import type { CSSProperties, ReactNode } from 'react';

import styles from './PageHero.module.css';

export type PageHeroProps = {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function PageHero({ kicker, title, subtitle, className, style }: PageHeroProps) {
  return (
    <header className={[styles.root, className].filter(Boolean).join(' ')} style={style}>
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
