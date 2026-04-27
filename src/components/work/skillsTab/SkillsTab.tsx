'use client';

import { SKILL_GROUPS } from '../constants';
import shared from '../WorkDashboard.module.css';
import styles from './SkillsTab.module.css';
import SkillGroupCard from './SkillGroupCard';

export default function SkillsTab() {
  return (
    <section className={shared.section} aria-label="Skills">
      <div className={shared.sectionBody}>
        <div className={styles.skillsGrid}>
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroupCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

