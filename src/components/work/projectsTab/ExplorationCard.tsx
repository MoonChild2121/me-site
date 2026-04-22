'use client';

import type { CSSProperties } from 'react';

import type { ExplorationProject } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './ProjectsTab.module.css';

type ExplorationCardProps = {
  project: ExplorationProject;
  index: number;
};

export default function ExplorationCard({ project, index }: ExplorationCardProps) {
  return (
    <article
      className={`${styles.explorationItem} ${shared.stagger}`}
      style={staggerStyle(index) as CSSProperties}
    >
      <header className={styles.explorationHeader}>
        <div className={styles.explorationTitle}>{project.title}</div>
        <div className={styles.explorationMeta}>{project.meta}</div>
      </header>
      <div className={styles.explorationDesc}>{project.description}</div>

      <details className={styles.explorationDetails}>
        <summary className={styles.explorationSummary}>Key points</summary>
        <ul className={styles.explorationPoints}>
          {project.keyPoints.map(k => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </details>
    </article>
  );
}

