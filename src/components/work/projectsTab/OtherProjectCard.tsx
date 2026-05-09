'use client';

import type { ExplorationProject } from '../constants';
import WorkMetaPills from '../primitives/WorkMetaPills';
import { workStaggerProps } from '../primitives/workStaggerProps';
import styles from './ProjectsTab.module.css';

type OtherProjectCardProps = {
  project: ExplorationProject;
  index: number;
};

export default function OtherProjectCard({ project, index }: OtherProjectCardProps) {
  return (
    <article {...workStaggerProps(index, styles.otherProjectCard)}>
      <div className={styles.otherProjectMain}>
        <header className={styles.otherProjectHeader}>
          <div className={styles.otherProjectTitle}>{project.title}</div>
          <WorkMetaPills meta={project.meta} listClassName={styles.otherProjectTagCell} />
        </header>
        <p className={styles.otherProjectDesc}>{project.description}</p>
        <div className={styles.otherProjectHighlights}>
          <span className={styles.otherProjectHighlightsLabel}>Highlights</span>
          <ul className={styles.otherProjectPointList}>
            {project.keyPoints.map(k => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
