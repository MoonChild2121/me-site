'use client';

import Pill from '@/components/common/Pill/Pill';
import type { SkillGroup } from '../constants';
import { workStaggerProps } from '../primitives/workStaggerProps';
import styles from './SkillsTab.module.css';

type SkillGroupCardProps = {
  group: SkillGroup;
  index: number;
};

export default function SkillGroupCard({ group, index }: SkillGroupCardProps) {
  return (
    <div {...workStaggerProps(index, styles.skillCard)}>
      <div className={styles.skillCardHeader}>
        <div className={styles.skillCardTitle}>{group.title}</div>
        <div className={styles.skillCardSubtitle}>{group.subtitle}</div>
      </div>
      <div className={styles.skillCardTags}>
        {group.tags.map(tag => (
          <Pill key={tag} as="span" variant="work">
            {tag}
          </Pill>
        ))}
      </div>
      <div className={styles.skillCardBody}>{group.description}</div>
    </div>
  );
}
