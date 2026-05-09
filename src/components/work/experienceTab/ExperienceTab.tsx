'use client';

import { useMemo } from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

import {
  EXPERIENCES,
  type Experience,
  type ExperienceGroupId,
} from '../constants';
import WorkTabShell from '../primitives/WorkTabShell';
import { workStaggerProps } from '../primitives/workStaggerProps';
import Pill from '@/components/common/Pill/Pill';
import styles from './ExperienceTab.module.css';

function ExperienceCard({ exp, staggerIndex }: { exp: Experience; staggerIndex: number }) {
  return (
    <article {...workStaggerProps(staggerIndex, styles.expCard)}>
      <div className={styles.expCardInner}>
        <div className={styles.expCardTop}>
          <div className={styles.expHeaderBlock}>
            <div className={styles.expTitleBlock}>
              <div className={styles.expRole}>{exp.title}</div>
              <div className={styles.expCompany}>{exp.company}</div>
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
                <Pill key={tag} as="span" variant="work">
                  {tag}
                </Pill>
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

export default function ExperienceTab() {
  const byGroup = useMemo(() => {
    const groups: Record<ExperienceGroupId, Experience[]> = { current: [], previous: [], early: [] };
    for (const exp of EXPERIENCES) groups[exp.group].push(exp);
    return groups;
  }, []);

  let globalIdx = 0;

  return (
    <WorkTabShell aria-label="Experience">
      <div className={styles.expGroups} aria-label="Experience groups">
        {EXPERIENCE_GROUPS.map(group => {
          const items = byGroup[group.id];
          if (!items.length) return null;

          const needsScroll = items.length > 1;
          const groupIdx = globalIdx++;

          return (
            <div key={group.id} {...workStaggerProps(groupIdx, styles.expGroup)}>
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
    </WorkTabShell>
  );
}
