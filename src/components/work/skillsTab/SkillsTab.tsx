'use client';

import { SKILL_GROUPS } from '../constants';
import WorkTabShell from '../primitives/WorkTabShell';
import styles from './SkillsTab.module.css';
import SkillGroupCard from './SkillGroupCard';

export default function SkillsTab() {
  return (
    <WorkTabShell aria-label="Skills">
      <div className={styles.skillsGrid}>
        {SKILL_GROUPS.map((group, i) => (
          <SkillGroupCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </WorkTabShell>
  );
}
