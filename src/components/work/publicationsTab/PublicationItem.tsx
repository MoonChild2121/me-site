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

function VenueLine({ venue }: { venue: string }) {
  const i = venue.indexOf('IEEE');
  if (i === -1) {
    return <span className={styles.pubVenue}>{venue}</span>;
  }
  return (
    <span className={styles.pubVenue}>
      {venue.slice(0, i)}
      <span className={styles.pubVenueHighlight}>IEEE</span>
      {venue.slice(i + 4)}
    </span>
  );
}

export default function PublicationItem({ pub, index }: PublicationItemProps) {
  return (
    <article
      className={`${shared.item} ${styles.pubCard} ${shared.stagger}`}
      style={staggerStyle(index) as CSSProperties}
    >
      <header className={styles.pubHeader}>
        <div className={styles.pubKicker}>Journal paper</div>

        <h2 className={styles.pubTitle}>{pub.title}</h2>

        <div className={styles.pubMeta}>
          <VenueLine venue={pub.venue} />
          <span className={styles.pubMetaDot} aria-hidden>
            ·
          </span>
          <span className={styles.pubYear}>{pub.year}</span>
        </div>
      </header>

      {pub.summary ? <div className={styles.pubSummary}>{pub.summary}</div> : null}
      {pub.highlights?.length ? (
        <ul className={`${shared.bullets} ${styles.pubBullets}`}>
          {pub.highlights.map(h => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}

      <div className={styles.pubFooter}>
        {pub.url ? (
          <a className={styles.pubLink} href={pub.url} target="_blank" rel="noopener noreferrer">
            View publication
          </a>
        ) : (
          <span className={styles.pubLinkMuted}>View publication</span>
        )}
      </div>
    </article>
  );
}

