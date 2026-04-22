'use client';

import type { CSSProperties } from 'react';

import type { SkillGroup } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './SkillsTab.module.css';

type SkillGroupCardProps = {
  group: SkillGroup;
  index: number;
};

export default function SkillGroupCard({ group, index }: SkillGroupCardProps) {
  return (
    <div
      className={`${styles.skillCard} ${shared.stagger}`}
      style={staggerStyle(index) as CSSProperties}
    >
      <div className={styles.skillCardHeader}>
        <div className={styles.skillCardTitle}>{group.title}</div>
        <div className={styles.skillCardSubtitle}>{group.subtitle}</div>
      </div>
      <div className={styles.skillCardTags}>
        {group.tags.map(tag => (
          <span key={tag} className={styles.skillTag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.skillCardBody}>{group.description}</div>
    </div>
  );
}

