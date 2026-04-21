'use client';

import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

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
  ].join(' ');
}

function staggerStyle(index: number): CSSProperties {
  return { '--stagger': index } as CSSProperties;
}

function ExperienceCard({ exp, staggerIndex }: { exp: Experience; staggerIndex: number }) {
  return (
    <article className={`${styles.expCard} ${styles.stagger}`} style={staggerStyle(staggerIndex)}>
      <div className={styles.expCardInner}>
        <div className={styles.expCardTop}>
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
        </div>

        <div className={styles.expCardBottom}>
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

  let globalIdx = 0;

  return (
    <section className={styles.section} aria-label="Experience">
      <div className={styles.sectionBody}>
        <div className={styles.expGroups} aria-label="Experience groups">
          {EXPERIENCE_GROUPS.map(group => {
            const items = byGroup[group.id];
            if (!items.length) return null;

            const needsScroll = items.length > 1;
            const groupIdx = globalIdx++;

            return (
              <div key={group.id} className={`${styles.expGroup} ${styles.stagger}`} style={staggerStyle(groupIdx)}>
                <div className={styles.expGroupLabel}>{group.label}</div>
                <div className={needsScroll ? styles.expCardsScrollable : styles.expCards}>
                  {items.map((exp, cardIdx) => {
                    const key = `${exp.company}-${exp.title}-${exp.dateRange}`;
                    return <ExperienceCard key={key} exp={exp} staggerIndex={groupIdx + cardIdx + 1} />;
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
