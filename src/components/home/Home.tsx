'use client';

import { useHomeStyles } from './useHomeStyles';
import Link from 'next/link';
import { RECENT_ENTRIES } from '../../data/entries';
import type { Entry } from '../../types/entry';
import { useEffect, useRef } from 'react';

export default function Home() {
  const s = useHomeStyles();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const flowerUrl = new URL('../../assets/homeFlower.svg', import.meta.url).toString();
  const roundFlowerUrl = new URL('../../assets/roundFlower.svg', import.meta.url).toString();

  const formatEntryDate = (date: string) => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleString('en-US', { month: 'short', day: '2-digit' });
  };

  const getTypeLabel = (type: Entry['type']) => type.toUpperCase();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      nodes.forEach(n => n.classList.add(s.revealVisible));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add(s.revealVisible);
          } else {
            (entry.target as HTMLElement).classList.remove(s.revealVisible);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    nodes.forEach(n => io.observe(n));

    return () => io.disconnect();
  }, [s.revealVisible]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-fade-section]'));
    if (sections.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const flowerEl = root.querySelector<HTMLElement>('[data-choice-flower]');

    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      const fadeZone = vh * 0.45;

      for (const section of sections) {
        const { bottom } = section.getBoundingClientRect();

        if (bottom > fadeZone) {
          section.style.opacity = '1';
        } else if (bottom <= 0) {
          section.style.opacity = '0';
        } else {
          section.style.opacity = String(bottom / fadeZone);
        }
      }

      if (flowerEl) {
        const choiceSection = flowerEl.closest<HTMLElement>('section');
        if (choiceSection) {
          const rect = choiceSection.getBoundingClientRect();
          const centerY = (rect.top + rect.bottom) / 2;
          const distance = Math.min(Math.abs(centerY - vh / 2) / vh, 1);
          const scale = 0.92 + 0.08 * distance;
          const scrollRatio = -rect.top / rect.height;
          const rotation = scrollRatio * 45;
          flowerEl.style.setProperty('--flower-scale', String(scale));
          flowerEl.style.setProperty('--flower-rotate', `${rotation}deg`);
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={rootRef} className={s.page}>
      <section className={`${s.intro} ${s.fadeSection}`} data-fade-section aria-label="Introduction">
        <div className={s.hero}>
          <div className={s.left}>
            <div
              className={`${s.kicker} ${s.reveal}`}
              data-reveal
              style={{ ['--reveal-delay' as never]: '0ms' }}
            >
              Frontend Engineer with a focus on clarity &amp; craft
            </div>

            <h1 className={s.heading}>
              <span
                className={`${s.line} ${s.reveal}`}
                data-reveal
                style={{ ['--reveal-delay' as never]: '90ms' }}
              >
                Thoughtful
              </span>
              <span
                className={`${s.line} ${s.reveal}`}
                data-reveal
                style={{ ['--reveal-delay' as never]: '160ms' }}
              >
                Interfaces,
              </span>
              <span
                className={`${s.line} ${s.italic} ${s.reveal}`}
                data-reveal
                style={{ ['--reveal-delay' as never]: '230ms' }}
              >
                Built to Last.
              </span>
            </h1>

            <p
              className={`${s.body} ${s.reveal}`}
              data-reveal
              style={{ ['--reveal-delay' as never]: '300ms' }}
            >
              I build reliable, well-structured web experiences with an emphasis on usability and
              long-term maintainability. I also document what I learn along the way.
            </p>
          </div>

          <div
            className={`${s.right} ${s.reveal}`}
            data-reveal
            style={{ ['--reveal-delay' as never]: '180ms' }}
            aria-hidden
          >
            <img src={flowerUrl} width={436} height={436} alt="" />
          </div>
        </div>
      </section>

      <section className={`${s.choice} ${s.fadeSection}`} data-fade-section aria-label="Choices">
        <img
          src={roundFlowerUrl}
          className={s.choiceFlower}
          data-choice-flower
          aria-hidden
          alt=""
        />
        <div className={s.choiceContent}>
          <div
            className={`${s.choicePanel} ${s.reveal}`}
            data-reveal
            style={{ ['--reveal-delay' as never]: '0ms' }}
          >
            <header className={s.choiceHeader}>
              <h2 className={s.choiceHeading}>Explore my work and how I think</h2>
              <p className={s.choiceSubheading}>
                A structured overview of my experience, alongside a running log of ideas, notes, and
                experiments.
              </p>
            </header>

            <div className={s.choiceButtons}>
              <Link href="/work" className={s.choiceButton}>
                View Work
              </Link>
              <Link href="/log" className={s.choiceButton}>
                Explore log
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.entries} ${s.fadeSection}`} data-fade-section aria-label="Entries">
        <div
          className={`${s.headlineCarousel} ${s.reveal}`}
          data-reveal
          style={{ ['--reveal-delay' as never]: '0ms' }}
          aria-label="Highlights"
        >
          <div className={s.headlineTrack} role="presentation" aria-hidden>
            <div className={s.headlineRow}>
              {'READING \u2014 DEEP WORK\u2003\u2022\u2003THINKING \u2014 STATE SIMPLICITY\u2003\u2022\u2003BUILDING \u2014 PERSONAL DASHBOARD\u2003\u2022\u2003EXPLORING \u2014 INTERACTION PATTERNS\u2003\u2022\u2003READING \u2014 DEEP WORK\u2003\u2022\u2003THINKING \u2014 STATE SIMPLICITY\u2003\u2022\u2003BUILDING \u2014 PERSONAL DASHBOARD\u2003\u2022\u2003EXPLORING \u2014 INTERACTION PATTERNS\u2003\u2022\u2003'}
            </div>
            <div className={s.headlineRow}>
              {'READING \u2014 DEEP WORK\u2003\u2022\u2003THINKING \u2014 STATE SIMPLICITY\u2003\u2022\u2003BUILDING \u2014 PERSONAL DASHBOARD\u2003\u2022\u2003EXPLORING \u2014 INTERACTION PATTERNS\u2003\u2022\u2003READING \u2014 DEEP WORK\u2003\u2022\u2003THINKING \u2014 STATE SIMPLICITY\u2003\u2022\u2003BUILDING \u2014 PERSONAL DASHBOARD\u2003\u2022\u2003EXPLORING \u2014 INTERACTION PATTERNS\u2003\u2022\u2003'}
            </div>
          </div>
        </div>

        <div className={s.entriesMain}>
          <header
            className={`${s.entriesHeader} ${s.reveal}`}
            data-reveal
            style={{ ['--reveal-delay' as never]: '80ms' }}
          >
            <h2 className={s.entriesTitle}>Recent Entries</h2>
          </header>

          <div className={s.entriesList}>
            {RECENT_ENTRIES.map((entry, idx) => (
              <Link
                key={entry.id}
                href={`/log#${entry.id}`}
                className={`${s.entryCard} ${s.reveal}`}
                data-reveal
                style={{ ['--reveal-delay' as never]: `${120 + idx * 70}ms` }}
              >
                <div className={s.entryTypePill}>{getTypeLabel(entry.type)}</div>
                <div className={s.entryTitle}>{entry.title}</div>
                <div className={s.entryPreview}>{entry.preview}</div>
                <div className={s.entryMeta}>
                  <span className={s.entryDate}>{formatEntryDate(entry.date)}</span>
                </div>
              </Link>
            ))}
          </div>

          <footer
            className={`${s.entriesFooter} ${s.reveal}`}
            data-reveal
            style={{ ['--reveal-delay' as never]: '360ms' }}
          >
            <Link href="/log" className={s.entriesLink}>
              → View all entries
            </Link>
          </footer>
        </div>
      </section>

      <section className={`${s.closing} ${s.fadeSection}`} data-fade-section aria-label="Closing">
        <div className={s.closingInner}>
          <div
            className={`${s.closingText} ${s.reveal}`}
            data-reveal
            style={{ ['--reveal-delay' as never]: '0ms' }}
          >
            An ongoing record of how I think and build.
          </div>
          <div
            className={`${s.closingSignature} ${s.reveal}`}
            data-reveal
            style={{ ['--reveal-delay' as never]: '120ms' }}
          >
            -Zainab Kashif
          </div>
        </div>
      </section>
    </div>
  );
}