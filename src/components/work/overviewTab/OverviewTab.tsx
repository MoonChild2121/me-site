import type { CSSProperties } from 'react';
import Link from 'next/link';
import { FiBriefcase, FiChevronRight, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

import type { SectionId } from '../constants';
import styles from './OverviewTab.module.css';

function staggerStyle(index: number): CSSProperties {
  return { '--stagger': index } as CSSProperties;
}

export default function OverviewTab({ goToSection }: { goToSection: (id: SectionId) => void }) {
  return (
    <section className={styles.section} aria-label="Overview">
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={`${styles.introWrap} ${styles.stagger}`} style={staggerStyle(0)}>
            <p className={styles.intro}>
              Frontend engineer focused on clear, scalable interface systems. I build production Next.js
              applications with a focus on structure, performance, and long-term maintainability. My background
              in machine learning and research shapes how I reason about systems, trade-offs, and clarity.
            </p>
          </div>

          <div className={`${styles.contactCard} ${styles.stagger}`} style={staggerStyle(1)} aria-label="Contact">
            <div className={styles.contactHeading}>Contact</div>
            <div className={styles.contactStack}>
              <a className={styles.contactRow} href="tel:+923060040951">
                <span className={styles.iconBadge} aria-hidden>
                  <FiPhone size={16} aria-hidden />
                </span>
                <span className={styles.contactRowText}>+92 306 0040951</span>
              </a>
              <a className={styles.contactRow} href="mailto:zkashif.bscs21seecs@seecs.edu.pk">
                <span className={styles.iconBadge} aria-hidden>
                  <FiMail size={16} aria-hidden />
                </span>
                <span className={styles.contactRowText}>zkashif.bscs21seecs@seecs.edu.pk</span>
              </a>
              <a className={styles.contactRow} href="https://linkedin.com/in/zainab-kashif-193b26218" target="_blank" rel="noreferrer">
                <span className={styles.iconBadge} aria-hidden>
                  <FiLinkedin size={16} aria-hidden />
                </span>
                <span className={styles.contactRowText}>LinkedIn</span>
              </a>
              <a className={styles.contactRow} href="https://github.com/MoonChild2121" target="_blank" rel="noreferrer">
                <span className={styles.iconBadge} aria-hidden>
                  <FiGithub size={16} aria-hidden />
                </span>
                <span className={styles.contactRowText}>GitHub</span>
              </a>

              <Link className={styles.contactCta} href="/contact">
                Or directly email me here!
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.rightStack}>
          <div className={styles.highlightsGrid} aria-label="Highlights">
            <button type="button" className={`${styles.tile} ${styles.tileButton} ${styles.stagger}`} style={staggerStyle(2)} onClick={() => goToSection('experience')}>
              <div className={styles.tileLine}>
                <span>Associate Frontend Engineer - Carbonteq</span>
                <span className={styles.tileLineEnd}>
                  <span className={styles.currentPill} aria-label="Current role" title="Current role">
                    <FiBriefcase size={14} aria-hidden />
                  </span>
                  <span className={styles.tileChevron} aria-hidden>
                    <FiChevronRight size={18} aria-hidden />
                  </span>
                </span>
              </div>
            </button>
            <div className={`${styles.tile} ${styles.stagger}`} style={staggerStyle(3)}>Next.js production systems</div>
            <button type="button" className={`${styles.tile} ${styles.tileButton} ${styles.stagger}`} style={staggerStyle(4)} onClick={() => goToSection('projects')}>
              <div className={styles.tileLine}>
                <span>Design systems + UI architecture</span>
                <span className={styles.tileChevron} aria-hidden>
                  <FiChevronRight size={18} aria-hidden />
                </span>
              </div>
            </button>
            <div className={`${styles.tile} ${styles.stagger}`} style={staggerStyle(5)}>Performance + accessibility focus</div>
            <div className={`${styles.tile} ${styles.stagger}`} style={staggerStyle(6)}>ML / AI background</div>
            <button type="button" className={`${styles.tile} ${styles.tileButton} ${styles.stagger}`} style={staggerStyle(7)} onClick={() => goToSection('publications')}>
              <div className={styles.tileLine}>
                <span>IEEE publication (2025)</span>
                <span className={styles.tileChevron} aria-hidden>
                  <FiChevronRight size={18} aria-hidden />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
