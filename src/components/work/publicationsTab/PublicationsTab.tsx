'use client';

import publicationImage from '@/assets/publication.png';

import { PUBLICATIONS } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './PublicationsTab.module.css';
import PublicationItem from './PublicationItem';

export default function PublicationsTab() {
  return (
    <section className={styles.pubSection} aria-label="Publications">
      <div className={shared.sectionBody}>
        <div className={styles.pubLayout} aria-label="Publications layout">
          <div className={styles.pubContent}>
            <div className={shared.list}>
              {PUBLICATIONS.map((pub, i) => (
                <PublicationItem key={`${pub.title}-${pub.year}`} pub={pub} index={i} />
              ))}
            </div>
          </div>

          <div
            className={`${styles.pubMedia} ${shared.stagger}`}
            style={staggerStyle(PUBLICATIONS.length)}
            aria-label="Publication image"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.pubImage}
              src={publicationImage.src}
              alt="Publication cover screenshot"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

