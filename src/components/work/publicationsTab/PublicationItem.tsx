'use client';

import Pill from '@/components/common/Pill/Pill';
import WorkPillList from '@/components/common/Pill/WorkPillList';
import proseLists from '@/components/common/ProseLists/ProseLists.module.css';
import type { Publication } from '../constants';
import { workStaggerProps } from '../primitives/workStaggerProps';
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
    <article {...workStaggerProps(index, shared.item, styles.pubCard)}>
      <header className={styles.pubHeader}>
        <div className={styles.pubKicker}>Journal paper</div>

        <h2 className={styles.pubTitle}>{pub.title}</h2>

        <WorkPillList className={styles.pubMetaPills} aria-label="Venue and year">
          <li>
            <Pill as="span" variant="workSentence">
              <VenueLine venue={pub.venue} />
            </Pill>
          </li>
          <li>
            <Pill as="span" variant="workSentence">
              {pub.year}
            </Pill>
          </li>
        </WorkPillList>
      </header>

      {pub.summary ? <div className={styles.pubSummary}>{pub.summary}</div> : null}
      {pub.highlights?.length ? (
        <ul className={`${proseLists.bullets} ${styles.pubBullets}`}>
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
