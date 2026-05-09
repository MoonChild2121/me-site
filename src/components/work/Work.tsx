'use client';

import type { ComponentType } from 'react';
import { useCallback, useRef, useState } from 'react';
import {
  FiDownload,
} from 'react-icons/fi';
import workFlower from '@/assets/work/workFlower.png';

import {
  SECTIONS,
  SECTION_INDEX,
  type SectionId,
} from './constants';
import OverviewTab from './overviewTab/OverviewTab';
import ExperienceTab from './experienceTab/ExperienceTab';
import ProjectsTab from './projectsTab/ProjectsTab';
import PublicationsTab from './publicationsTab/PublicationsTab';
import SkillsTab from './skillsTab/SkillsTab';
import EducationTab from './educationTab/EducationTab';
import styles from './WorkDashboard.module.css';

const SECTION_COMPONENTS = {
  overview: OverviewTab,
  experience: ExperienceTab,
  projects: ProjectsTab,
  publications: PublicationsTab,
  skills: SkillsTab,
  education: EducationTab,
} satisfies Record<SectionId, ComponentType>;

export default function Work() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [transition, setTransition] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const contentRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = SECTION_INDEX[activeSection];

  const goToSection = useCallback(
    (id: SectionId) => {
      if (transition !== 'idle') return;
      if (id === activeSection) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        setActiveSection(id);
        if (contentRef.current) contentRef.current.scrollTop = 0;
        return;
      }

      setTransition('leaving');
      setTimeout(() => {
        setActiveSection(id);
        if (contentRef.current) contentRef.current.scrollTop = 0;
        setTransition('entering');
        setTimeout(() => setTransition('idle'), 280);
      }, 220);
    },
    [activeSection, transition]
  );

  const sectionTransitionClass =
    transition === 'leaving'
      ? styles.sectionLeaving
      : transition === 'entering'
        ? styles.sectionEntering
        : '';

  const activeLabel = SECTIONS[activeIndex]?.label ?? 'Work';
  const isOverview = activeSection === 'overview';

  const ActiveSection = SECTION_COMPONENTS[activeSection];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.sidebarNav} aria-label="Work sections">
          {SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                className={active ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink}
                aria-current={active ? 'true' : undefined}
                onClick={() => goToSection(id)}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workFlower.src}
          className={styles.sidebarFlower}
          alt=""
          aria-hidden
        />
      </aside>

      <div className={`${styles.main} ${styles.pageEnter}`}>
        <div className={styles.topControls} aria-label="Work controls">
          <div className={styles.controlsRow}>
            <div className={styles.activeTitle} aria-label="Active section">
              {activeLabel}
            </div>
            <div className={styles.controlsActions}>
              <a className={styles.buttonLink} href="/zainab-cv.pdf" download>
                <span aria-hidden>
                  <FiDownload size={16} aria-hidden />
                </span>
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.screen} aria-label="Work content">
          <div ref={contentRef} className={styles.screenScroller}>
            <div
              className={`${styles.sectionFrame} ${isOverview ? styles.sectionFrameCenter : ''} ${sectionTransitionClass}`}
            >
              <ActiveSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
