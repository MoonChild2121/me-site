import type { CSSProperties } from 'react';
import Link from 'next/link';
import { FiBriefcase, FiExternalLink } from 'react-icons/fi';

import { EXPERIENCES, PUBLICATIONS } from '../constants';
import type { SectionId } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './OverviewTab.module.css';

const currentRole = EXPERIENCES.find(e => e.group === 'current');
const pub = PUBLICATIONS[0];

export default function OverviewTab({ goToSection }: { goToSection: (id: SectionId) => void }) {
  return (
    <section className={styles.section} aria-label="Overview">
      <div className={styles.flow}>
        {/* Bio */}
        <div className={`${styles.bioBlock} ${shared.stagger}`} style={staggerStyle(0)}>
          <p className={styles.bioPrimary}>
            I build production Next.js applications with a focus on structure, performance, and long-term
            maintainability.
          </p>
          <p className={styles.bioSecondary}>
            My background in machine learning and research shapes how I reason about systems,
            trade-offs, and clarity.
          </p>
        </div>

        {/* Currently + Published side by side */}
        <div className={styles.cardRow}>
          {currentRole ? (
            <button
              type="button"
              className={`${styles.miniCard} ${shared.stagger}`}
              style={staggerStyle(1)}
              onClick={() => goToSection('experience')}
            >
              <div className={styles.blockLabel}>Currently</div>
              <div className={styles.miniTitle}>
                {currentRole.title}
                <span className={styles.roleCompany}> — {currentRole.company}</span>
              </div>
              <div className={styles.pubMeta}>{currentRole.location} · {currentRole.dateRange}</div>
            </button>
          ) : null}

          {pub ? (
            <button
              type="button"
              className={`${styles.miniCard} ${shared.stagger}`}
              style={staggerStyle(2)}
              onClick={() => goToSection('publications')}
            >
              <div className={styles.blockLabel}>Published</div>
              <div className={styles.miniTitle}>{pub.venue}, {pub.year}</div>
              <div className={styles.pubMeta}>Published Author · Peer-Reviewed</div>
            </button>
          ) : null}
        </div>

        {/* Contact CTA */}
        <div className={`${styles.ctaBlock} ${shared.stagger}`} style={staggerStyle(3)}>
          <p className={styles.ctaHeadline}>Want to get in touch?</p>
          <p className={styles.ctaSub}>
            I'm open to conversations, collaborations, or just a hello.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
}
