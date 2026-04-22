'use client';

import { COURSES, EDUCATION } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './EducationTab.module.css';

export default function EducationTab() {
  let idx = 0;

  return (
    <section className={shared.section} aria-label="Education">
      <div className={shared.sectionBody}>
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
            const primaryCardClass = isPrimary
              ? `${styles.eduPrimary} ${styles.eduPrimaryFirst}`
              : '';

            return (
              <article
                key={item.title}
                className={`${shared.item} ${primaryCardClass} ${shared.stagger}`}
                style={staggerStyle(idx++)}
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

        <div className={`${styles.cfWrap} ${shared.stagger}`} style={staggerStyle(idx++)} aria-label="Courses">
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
      </div>
    </section>
  );
}

