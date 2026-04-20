'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FiCalendar, FiChevronDown, FiMapPin } from 'react-icons/fi';

import {
  EXPERIENCES,
  type Experience,
  type ExperienceGroupId,
} from '../constants';
import styles from './ExperienceTab.module.css';

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function matchesQuery(text: string, query: string) {
  if (!query) return true;
  return normalize(text).includes(query);
}

function experienceSearchText(exp: Experience) {
  return [
    exp.title,
    exp.company,
    exp.dateRange,
    exp.location ?? '',
    exp.summary,
    ...(exp.tags ?? []),
    ...(exp.expanded.overview ?? []),
    ...(exp.expanded.focusAreas ?? []).flatMap(a => [a.label, ...(a.lines ?? [])]),
    ...(exp.expanded.howIWork ?? []),
    ...(exp.expanded.impact ?? []),
  ].join(' ');
}

const KEYWORDS = [
  'Next.js',
  'Lighthouse',
  'code-splitting',
  'lazy loading',
  'accessibility',
  'design systems',
  'SDXL',
  'FLUX',
  'LoRA',
  'LoRAs',
  'LangChain',
  'RAG',
  'MongoDB',
  'REST APIs',
  'pipelines',
  'evaluation',
];

function underlineKeywordOnce(line: string) {
  const hay = line.toLowerCase();
  const keyword = KEYWORDS.find(k => hay.includes(k.toLowerCase()));
  if (!keyword) return line;

  const idx = hay.indexOf(keyword.toLowerCase());
  if (idx < 0) return line;

  return {
    before: line.slice(0, idx),
    keyword: line.slice(idx, idx + keyword.length),
    after: line.slice(idx + keyword.length),
  };
}

function RenderLine({ line }: { line: string }) {
  const parts = underlineKeywordOnce(line);
  if (typeof parts === 'string') return <div className={styles.expLine}>{parts}</div>;
  return (
    <div className={styles.expLine}>
      {parts.before}
      <span className={styles.keyword}>{parts.keyword}</span>
      {parts.after}
    </div>
  );
}

function ExperienceCard({
  exp,
  isOpen,
  onToggle,
}: {
  exp: Experience;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [detailsHeight, setDetailsHeight] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const el = detailsRef.current;
    if (!el) return;

    const update = () => setDetailsHeight(el.scrollHeight);
    update();

    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  const sectionId = `${normalize(exp.company)}-${normalize(exp.title)}-${normalize(exp.dateRange)}`.replaceAll(' ', '-');

  return (
    <article className={isOpen ? `${styles.expCard} ${styles.expCardOpen}` : styles.expCard}>
      <div className={styles.expCardInner}>
        <button
          type="button"
          className={styles.expCardButton}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={sectionId}
        >
          <div className={styles.expHeaderBlock}>
            <div className={styles.expTitle}>
              <span>{exp.title}</span>
              <span className={styles.expCompany}> — {exp.company}</span>
            </div>
            <div className={styles.expMetaStack}>
              <span className={styles.expMetaItem}>
                <FiCalendar size={13} aria-hidden />
                {exp.dateRange}
              </span>
              {exp.location ? (
                <span className={styles.expMetaItem}>
                  <FiMapPin size={13} aria-hidden />
                  {exp.location}
                </span>
              ) : null}
            </div>
          </div>

          <div className={styles.expSummaryLine}>{exp.summary}</div>

          {exp.tags.length ? (
            <div className={styles.tagRow} aria-label="Key areas of work">
              {exp.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </button>

        <button
          type="button"
          className={isOpen ? `${styles.expArrowStrip} ${styles.expArrowStripOpen}` : styles.expArrowStrip}
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse' : 'Expand'}
          tabIndex={-1}
        >
          <FiChevronDown size={18} aria-hidden />
        </button>
      </div>

      <div
        id={sectionId}
        className={styles.expDetailsWrap}
        style={{
          maxHeight: isOpen ? `${detailsHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
        aria-hidden={!isOpen}
      >
        <div ref={detailsRef} className={styles.expDetails}>
          <div className={styles.expSectionsGrid}>
            <div className={styles.expSectionBody}>
              {exp.expanded.overview.map(line => (
                <div key={line} className={styles.expOverviewLine}>{line}</div>
              ))}
            </div>

            <div className={styles.focusAreas}>
              {exp.expanded.focusAreas.map(area => (
                <div key={area.label} className={styles.focusArea}>
                  <div className={styles.focusAreaLabel}>{area.label}</div>
                  <div className={styles.focusAreaBody}>
                    {area.lines.map(line => (
                      <RenderLine key={line} line={line} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <section className={styles.expSection} aria-label="How I Work">
              <div className={styles.expSectionLabel}>How I Work</div>
              <div className={styles.expSectionBody}>
                {exp.expanded.howIWork.map(line => (
                  <div key={line} className={styles.expLine}>{line}</div>
                ))}
              </div>
            </section>

            <section className={styles.expSection} aria-label="Impact">
              <div className={styles.expSectionLabel}>Impact</div>
              <div className={styles.expSectionBody}>
                {exp.expanded.impact.map(line => (
                  <div key={line} className={styles.expLine}>{line}</div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

const EXPERIENCE_GROUPS = [
  { id: 'current' as const, label: 'Current' },
  { id: 'previous' as const, label: 'Previous' },
  { id: 'early' as const, label: 'Early Experience' },
];

export default function ExperienceTab({ query }: { query: string }) {
  const normalizedQuery = useMemo(() => normalize(query), [query]);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return EXPERIENCES.filter(exp => matchesQuery(experienceSearchText(exp), normalizedQuery));
  }, [normalizedQuery]);

  const byGroup = useMemo(() => {
    const groups: Record<ExperienceGroupId, Experience[]> = { current: [], previous: [], early: [] };
    for (const exp of filtered) groups[exp.group].push(exp);
    return groups;
  }, [filtered]);

  if (filtered.length === 0) {
    return (
      <section className={styles.section} aria-label="Experience">
        <div className={styles.sectionBody}>
          <div className={styles.emptyState}>No experience entries match your search.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label="Experience">
      <div className={styles.sectionBody}>
        <div className={styles.expGroups} aria-label="Experience groups">
          {EXPERIENCE_GROUPS.map(group => {
            const items = byGroup[group.id];
            if (!items.length) return null;

            return (
              <div key={group.id} className={styles.expGroup}>
                <div className={styles.expGroupLabel}>{group.label}</div>
                <div className={styles.expCards}>
                  {items.map(exp => {
                    const key = `${exp.company}-${exp.title}-${exp.dateRange}`;
                    return (
                      <ExperienceCard
                        key={key}
                        exp={exp}
                        isOpen={openKey === key}
                        onToggle={() => setOpenKey(prev => (prev === key ? null : key))}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
