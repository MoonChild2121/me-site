'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import posScreenshot from '@/assets/work/pos.png';

import { EXPLORATIONS, FEATURED_PROJECT } from '../constants';
import WorkMetaPills from '../primitives/WorkMetaPills';
import WorkTabShell from '../primitives/WorkTabShell';
import { workStaggerProps } from '../primitives/workStaggerProps';
import styles from './ProjectsTab.module.css';
import OtherProjectCard from './OtherProjectCard';

const FEATURED_INLINE_HIGHLIGHT =
  /(Square integration|React Scan|Lighthouse score|UI system)/g;

function featuredLineWithHighlights(text: string) {
  const parts = text.split(FEATURED_INLINE_HIGHLIGHT);
  return parts.map((part, i) => {
    switch (part) {
      case 'Square integration':
      case 'React Scan':
      case 'Lighthouse score':
      case 'UI system':
        return (
          <span key={`${i}-${part}`} className={styles.featuredEmphasis}>
            {part}
          </span>
        );
      default:
        return part;
    }
  });
}

export default function ProjectsTab() {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [portalMounted, setPortalMounted] = useState(false);
  const [overlayEntered, setOverlayEntered] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const mediaOpenRef = useRef(mediaOpen);

  mediaOpenRef.current = mediaOpen;

  useEffect(() => {
    if (!mediaOpen) {
      setOverlayEntered(false);
      return;
    }
    setPortalMounted(true);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayEntered(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [mediaOpen]);

  useEffect(() => {
    if (!mediaOpen || !overlayEntered) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMediaOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mediaOpen, overlayEntered]);

  const closeMediaModal = () => setMediaOpen(false);

  const handleOverlayTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== 'opacity') return;
    if (!mediaOpenRef.current) setPortalMounted(false);
  };

  return (
    <>
      <WorkTabShell aria-label="Projects">
        <div className={styles.projectsFlow} aria-label="Projects content">
          <section {...workStaggerProps(0, styles.featuredProject)} aria-label="Featured project">
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
                </button>
              </div>
              <WorkMetaPills meta={FEATURED_PROJECT.meta} />
            </header>

            <div className={styles.featuredOverview}>{FEATURED_PROJECT.overview}</div>

            <div className={styles.featuredMain}>
              <ul className={styles.blockList} aria-label="What I built">
                {FEATURED_PROJECT.whatIBuilt.map(item => (
                  <li key={item}>{featuredLineWithHighlights(item)}</li>
                ))}
              </ul>
            </div>
          </section>

          <section {...workStaggerProps(5, styles.otherProjects)} aria-label="Other projects">
            <header className={styles.otherProjectsHeader}>
              <div className={styles.otherProjectsTitle}>Other projects</div>
            </header>

            <div className={styles.otherProjectsList} aria-label="Other projects list">
              {EXPLORATIONS.map((p, i) => (
                <OtherProjectCard key={p.title} project={p} index={6 + i} />
              ))}
            </div>
          </section>
        </div>
      </WorkTabShell>

      {portalMounted
        ? createPortal(
        <div
          className={`${styles.mediaOverlay} ${overlayEntered ? styles.mediaOverlayVisible : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Featured project interface screenshot"
          onTransitionEnd={handleOverlayTransitionEnd}
          onMouseDown={e => {
            if (e.target === e.currentTarget) closeMediaModal();
          }}
        >
          <div className={styles.mediaDialog}>
            <div className={styles.mediaDialogHeader}>
              <div className={styles.mediaDialogTitle}>{FEATURED_PROJECT.title}</div>
              <button
                ref={closeBtnRef}
                type="button"
                className={styles.mediaClose}
                onClick={closeMediaModal}
                aria-label="Close dialog"
              >
                <FiX size={22} strokeWidth={2} aria-hidden />
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
    </>
  );
}

