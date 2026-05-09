'use client';

import { COURSES, EDUCATION } from '../constants';
import WorkTabShell from '../primitives/WorkTabShell';
import { workStaggerProps } from '../primitives/workStaggerProps';
import shared from '../WorkDashboard.module.css';
import styles from './EducationTab.module.css';

export default function EducationTab() {
  let idx = 0;

  return (
    <WorkTabShell aria-label="Education">
      <div className={shared.list}>
        {EDUCATION.map((item, eduIdx) => {
          const isPrimary = eduIdx === 0;
          const itemTitleClass = isPrimary
            ? `${shared.itemTitle} ${styles.eduPrimaryTitle}`
            : shared.itemTitle;
          const itemMetaClass = isPrimary
            ? `${shared.itemMeta} ${styles.eduPrimaryMeta}`
            : shared.itemMeta;
          const bodyClass = isPrimary
            ? `${shared.body} ${styles.eduPrimaryBody}`
            : shared.body;
          const primaryCardClass = isPrimary ? `${styles.eduPrimary} ${styles.eduPrimaryFirst}` : '';

          return (
            <article
              key={item.title}
              {...workStaggerProps(idx++, shared.item, primaryCardClass || undefined)}
            >
              <header className={shared.itemHeader}>
                <div className={itemTitleClass}>{item.title}</div>
                <div className={itemMetaClass}>{item.summary}</div>
              </header>
              <div className={bodyClass}>{item.meta}</div>
            </article>
          );
        })}
      </div>

      <div {...workStaggerProps(idx++, styles.cfWrap)} aria-label="Courses">
        <section className={styles.cfBlock} aria-label="Courses">
          <div className={styles.cfLabel}>Courses</div>
          <ul className={styles.courseList} aria-label="Courses list">
            {COURSES.map(course => (
              <li key={`${course.name}-${course.provider}`} className={styles.courseItem}>
                <div className={styles.courseTopRow}>
                  <div className={styles.courseName}>{course.name}</div>
                  <div className={styles.courseProvider}>{course.provider}</div>
                </div>
                {course.focus ? <div className={styles.courseFocus}>{course.focus}</div> : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </WorkTabShell>
  );
}
