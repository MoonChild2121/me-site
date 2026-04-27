'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import posScreenshot from '@/assets/pos.png';

import { EXPLORATIONS, FEATURED_PROJECT } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './ProjectsTab.module.css';
import ExplorationCard from './ExplorationCard';

export default function ProjectsTab() {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mediaOpen) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMediaOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mediaOpen]);

  return (
    <section className={shared.section} aria-label="Projects">
      <div className={shared.sectionBody}>
        <div className={styles.projectsFlow} aria-label="Projects content">
          <section
            className={`${styles.featuredProject} ${shared.stagger}`}
            style={staggerStyle(0)}
            aria-label="Featured project"
          >
            <header className={styles.featuredHeader}>
              <div className={styles.featuredKicker}>Featured System</div>
              <div className={styles.featuredTitleRow}>
                <div className={styles.featuredTitle}>{FEATURED_PROJECT.title}</div>
                <button
                  type="button"
                  className={styles.mediaCta}
                  onClick={() => setMediaOpen(true)}
                  aria-haspopup="dialog"
                >
                  View interface
                  <span aria-hidden>↗</span>
                </button>
              </div>
              <div className={styles.featuredMeta}>{FEATURED_PROJECT.meta}</div>
            </header>

            <div className={styles.featuredOverview}>{FEATURED_PROJECT.overview}</div>

            <div className={styles.featuredMain}>
              <ul className={styles.blockList} aria-label="What I built">
                {FEATURED_PROJECT.whatIBuilt.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section
            className={`${styles.explorations} ${shared.stagger}`}
            style={staggerStyle(5)}
            aria-label="Explorations"
          >
            <header className={styles.explorationsHeader}>
              <div className={styles.explorationsTitle}>Explorations</div>
              <div className={styles.explorationsIntro}>
                Smaller projects exploring different systems, models, and problem spaces.
              </div>
            </header>

            <div className={styles.explorationList} aria-label="Exploration projects">
              {EXPLORATIONS.map((p, i) => (
                <ExplorationCard key={p.title} project={p} index={6 + i} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {mounted && mediaOpen
        ? createPortal(
        <div
          className={styles.mediaOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Featured project interface screenshot"
          onMouseDown={e => {
            if (e.target === e.currentTarget) setMediaOpen(false);
          }}
        >
          <div className={styles.mediaDialog}>
            <div className={styles.mediaDialogHeader}>
              <div className={styles.mediaDialogTitle}>{FEATURED_PROJECT.title}</div>
              <button
                ref={closeBtnRef}
                type="button"
                className={styles.mediaClose}
                onClick={() => setMediaOpen(false)}
              >
                Close
              </button>
            </div>
            <div className={styles.mediaDialogBody}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.mediaImage}
                src={posScreenshot.src}
                alt="Custom POS system interface screenshot"
                loading="eager"
              />
            </div>
          </div>
        </div>
          ,
          document.body
        )
        : null}
    </section>
  );
}

