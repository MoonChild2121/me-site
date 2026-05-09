'use client';

import publicationImage from '@/assets/work/publication.png';

import { PUBLICATIONS } from '../constants';
import WorkTabShell from '../primitives/WorkTabShell';
import { workStaggerProps } from '../primitives/workStaggerProps';
import shared from '../WorkDashboard.module.css';
import styles from './PublicationsTab.module.css';
import PublicationItem from './PublicationItem';

export default function PublicationsTab() {
  return (
    <WorkTabShell aria-label="Publications" sectionClassName={styles.pubSection}>
      <div className={styles.pubLayout} aria-label="Publications layout">
        <div className={styles.pubContent}>
          <div className={shared.list}>
            {PUBLICATIONS.map((pub, i) => (
              <PublicationItem key={`${pub.title}-${pub.year}`} pub={pub} index={i} />
            ))}
          </div>
        </div>

        <div {...workStaggerProps(PUBLICATIONS.length, styles.pubMedia)} aria-label="Publication image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.pubImage}
            src={publicationImage.src}
            alt="Publication cover screenshot"
            loading="lazy"
          />
        </div>
      </div>
    </WorkTabShell>
  );
}
