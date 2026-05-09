'use client';

import { useHomeStyles } from './useHomeStyles';
import { revealDelay } from '@/utils/motion';
import Link from 'next/link';
import { LOG_ENTRIES } from '@/components/log/constants';
import type { LogEntry } from '@/components/log/types';
import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import nameFlower from '@/assets/home/name_flower.png';
import HomeFooter from './HomeFooter';
import ButtonLink from '@/components/common/ButtonLink/ButtonLink';
import Pill from '@/components/common/Pill/Pill';

const ENTRY_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC'
});

const SKILL_PILLS: Array<{
  label: string;
  x: string;
  y: string;
  s: string;
  d: string;
  c: string;
}> = [
  { label: 'Design Systems', x: '20%', y: '16%', s: '1.06', d: '0s', c: 'var(--brand-plum)' },
  { label: 'Next.js', x: '11%', y: '26%', s: '1.04', d: '0.35s', c: 'var(--brand-amber)' },
  { label: 'TypeScript', x: '9%', y: '36%', s: '1.02', d: '0.7s', c: 'var(--brand-lilac)' },
  { label: 'React', x: '5%', y: '48%', s: '1.02', d: '1.05s', c: 'var(--brand-sand)' },
  { label: 'Performance', x: '10%', y: '60%', s: '1.02', d: '1.4s', c: 'var(--brand-plum)' },
  { label: 'Accessibility', x: '13%', y: '72%', s: '1.04', d: '1.75s', c: 'var(--brand-amber)' },

  { label: 'CSS Modules', x: '80%', y: '16%', s: '1.06', d: '0.2s', c: 'var(--brand-lilac)' },
  { label: 'Interaction', x: '89%', y: '26%', s: '1.04', d: '0.55s', c: 'var(--brand-plum)' },
  { label: 'State Systems', x: '93%', y: '36%', s: '1.02', d: '0.9s', c: 'var(--brand-sand)' },
  { label: 'APIs', x: '96%', y: '48%', s: '1.02', d: '1.25s', c: 'var(--brand-amber)' },
  { label: 'Quality', x: '90%', y: '60%', s: '1.02', d: '1.6s', c: 'var(--brand-lilac)' },
  { label: 'Tooling', x: '86%', y: '72%', s: '1.04', d: '1.95s', c: 'var(--brand-plum)' },
];

const MARQUEE_CHUNK =
  'READING \u2014 DEEP WORK\u2003\u2022\u2003THINKING \u2014 STATE SIMPLICITY\u2003\u2022\u2003BUILDING \u2014 PERSONAL DASHBOARD\u2003\u2022\u2003EXPLORING \u2014 INTERACTION PATTERNS\u2003\u2022\u2003';

const MARQUEE_TEXT = MARQUEE_CHUNK + MARQUEE_CHUNK;

export default function Home() {
  const s = useHomeStyles();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const roundFlowerUrl = new URL('../../assets/home/roundFlower.svg', import.meta.url).toString();

  const formatEntryDate = (date: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const d = new Date(`${date}T00:00:00Z`);
      if (!Number.isNaN(d.getTime())) return ENTRY_DATE_FORMATTER.format(d);
    }
    return date;
  };

  const getTypeLabel = (type: LogEntry['type']) => type.toUpperCase();

  const getEntryPreview = (entry: LogEntry) => {
    if (entry.type === 'post') return entry.excerpt;
    if (entry.type === 'book') return entry.quote;
    return `Sketch lines: ${entry.sketchLines.length}`;
  };

  const homepageEntries = (['post', 'book', 'drawing'] as const)
    .map(type => LOG_ENTRIES.find(e => e.type === type))
    .filter((e): e is LogEntry => Boolean(e));

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
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px 14% 0px' }
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

    const scrollContainer =
      root.closest<HTMLElement>('main.app-main') ??
      document.querySelector<HTMLElement>('main.app-main');

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    update();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', onScroll);
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className={s.page}>
      <section className={`${s.intro} ${s.fadeSection}`} data-fade-section aria-label="Introduction">
        <div className={s.skillPills} aria-hidden>
          {SKILL_PILLS.map(p => (
            <Pill
              key={p.label}
              as="span"
              variant="tag"
              className={s.skillPill}
              style={
                {
                  ['--pill-x' as never]: p.x,
                  ['--pill-y' as never]: p.y,
                  ['--pill-s' as never]: p.s,
                  ['--pill-d' as never]: p.d,
                  ['--pill-tint' as never]: p.c,
                } as CSSProperties
              }
            >
              {p.label}
            </Pill>
          ))}
        </div>

        <div className={s.hero}>
          <div className={s.left}>
            <div
              className={`${s.kicker} ${s.reveal}`}
              data-reveal
              style={revealDelay(0)}
            >
              <span className={s.kickerRole}>Frontend Engineer</span>
              <span className={s.kickerDot} aria-hidden>
                ·
              </span>
              <span className={s.kickerLocation}>Lahore, PK</span>
            </div>

            <div className={s.nameStack}>
              <div className={s.nameRow} aria-label="Name">
                <h1 className={s.heading}>
                  <span
                    className={`${s.line} ${s.reveal}`}
                    data-reveal
                    style={revealDelay(90)}
                  >
                    Zainab
                  </span>
                  <span
                    className={`${s.line} ${s.reveal}`}
                    data-reveal
                    style={revealDelay(160)}
                  >
                    Kashif.
                  </span>
                </h1>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={`${s.nameFlower} ${s.reveal}`}
                  data-reveal
                  style={revealDelay(190)}
                  src={nameFlower.src}
                  alt=""
                  aria-hidden
                />
              </div>

              <p
                className={`${s.body} ${s.nameBody} ${s.reveal}`}
                data-reveal
                style={revealDelay(230)}
              >
                I build interfaces for a living: <span className={s.italic}>structured</span>,{' '}
                <span className={s.italic}>considered</span>, and built to hold up. Outside of that
                I read obsessively, draw occasionally, and write things down.
              </p>
            </div>

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
            style={revealDelay(0)}
          >
            <header className={s.choiceHeader}>
              <h2 className={s.choiceHeading}>Explore my work</h2>
              <p className={s.choiceSubheading}>
                Where I keep my experience, projects, and the systems I&apos;ve helped build.
              </p>
            </header>

            <div className={s.choiceButtons}>
              <ButtonLink href="/work" variant="outline" className={s.choiceCta}>
                View Work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.entries} ${s.fadeSection}`} data-fade-section aria-label="Entries">
        <div
          className={`${s.headlineCarousel} ${s.reveal}`}
          data-reveal
          style={revealDelay(0)}
          aria-label="Highlights"
        >
          <div className={s.headlineTrack} role="presentation" aria-hidden>
            <div className={s.headlineRow}>{MARQUEE_TEXT}</div>
            <div className={s.headlineRow}>{MARQUEE_TEXT}</div>
          </div>
        </div>

        <div className={s.entriesMain}>
          <header
            className={`${s.entriesHeader} ${s.reveal}`}
            data-reveal
            style={revealDelay(80)}
          >
            <h2 className={s.entriesTitle}>Recent Entries</h2>
          </header>

          <div className={s.entriesList}>
            {homepageEntries.map((entry, idx) => (
              <Link
                key={entry.id}
                href={`/log#${entry.id}`}
                className={`${s.entryCard} ${s.reveal}`}
                data-reveal
                style={revealDelay(120 + idx * 70)}
              >
                <Pill as="span" variant="status" className={s.entryTypePill}>{getTypeLabel(entry.type)}</Pill>
                <div className={s.entryTitle}>{entry.title}</div>
                <div className={s.entryPreview}>{getEntryPreview(entry)}</div>
                <div className={s.entryMeta}>
                  <span className={s.entryDate}>{formatEntryDate(entry.date)}</span>
                </div>
              </Link>
            ))}
          </div>

          <footer
            className={`${s.entriesFooter} ${s.reveal}`}
            data-reveal
            style={revealDelay(280)}
          >
            <ButtonLink href="/log" variant="outline" className={s.entriesLink}>
              View all entries
            </ButtonLink>
          </footer>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}