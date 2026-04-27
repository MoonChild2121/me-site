'use client';

import type { CSSProperties } from 'react';

import type { Publication } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './PublicationsTab.module.css';

type PublicationItemProps = {
  pub: Publication;
  index: number;
};

export default function PublicationItem({ pub, index }: PublicationItemProps) {
  return (
    <article
      className={`${shared.item} ${shared.stagger}`}
      style={staggerStyle(index) as CSSProperties}
    >
      <header className={shared.itemHeader}>
        <div className={shared.itemTitle}>{pub.title}</div>
        <div className={shared.itemMeta}>
          {pub.venue} — {pub.year}
        </div>
      </header>
      {pub.summary ? <div className={shared.body}>{pub.summary}</div> : null}
      {pub.highlights?.length ? (
        <ul className={shared.bullets}>
          {pub.highlights.map(h => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}
      {pub.url ? (
        <a className={styles.pubLink} href={pub.url} target="_blank" rel="noopener noreferrer">
          View Publication
        </a>
      ) : (
        <span className={styles.pubLink}>View Publication</span>
      )}
    </article>
  );
}

