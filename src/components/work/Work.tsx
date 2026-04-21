'use client';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

import posScreenshot from '@/assets/pos.png';
import publicationImage from '@/assets/publication.png';
import {
  SECTIONS,
  SECTION_INDEX,
  EXPLORATIONS,
  FEATURED_PROJECT,
  PUBLICATIONS,
  SKILL_GROUPS,
  EDUCATION,
  COURSES,
  type SectionId,
} from './constants';
import { useWorkDashboardStyles } from './useWorkDashboardStyles';
import OverviewTab from './overviewTab/OverviewTab';
import ExperienceTab from './experienceTab/ExperienceTab';

function staggerStyle(index: number): CSSProperties {
  return { '--stagger': index } as CSSProperties;
}

export default function Work() {
  const s = useWorkDashboardStyles();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, []);

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
    transition === 'leaving' ? s.sectionLeaving : transition === 'entering' ? s.sectionEntering : '';

  const activeLabel = SECTIONS[activeIndex]?.label ?? 'Work';
  const isOverview = activeSection === 'overview';

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewTab goToSection={goToSection} />;

      case 'experience':
        return <ExperienceTab query="" />;

      case 'projects':
        return (
          <section className={s.section} aria-label="Projects">
            <div className={s.sectionBody}>
              <div className={s.projectsFlow} aria-label="Projects content">
                <section className={`${s.featuredProject} ${s.stagger}`} style={staggerStyle(0)} aria-label="Featured project">
                  <header className={s.featuredHeader}>
                    <div className={s.featuredKicker}>Featured System</div>
                    <div className={s.featuredTitle}>{FEATURED_PROJECT.title}</div>
                    <div className={s.featuredMeta}>{FEATURED_PROJECT.meta}</div>
                  </header>

                  <div className={s.featuredOverview}>{FEATURED_PROJECT.overview}</div>

                  <div className={s.featuredMain}>
                    <div className={s.featuredBlocks}>
                      <section className={`${s.featuredBlock} ${s.stagger}`} style={staggerStyle(1)} aria-label="What I built">
                        <div className={s.blockLabel}>What I Built</div>
                        <ul className={s.blockList}>
                          {FEATURED_PROJECT.whatIBuilt.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>

                      <section className={`${s.featuredBlock} ${s.stagger}`} style={staggerStyle(2)} aria-label="System thinking">
                        <div className={s.blockLabel}>System Thinking</div>
                        <ul className={s.blockList}>
                          {FEATURED_PROJECT.systemThinking.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>

                      <section className={`${s.featuredBlock} ${s.stagger}`} style={staggerStyle(3)} aria-label="Highlights">
                        <div className={s.blockLabel}>Highlights</div>
                        <ul className={s.blockList}>
                          {FEATURED_PROJECT.highlights.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    <div className={`${s.featuredMedia} ${s.stagger}`} style={staggerStyle(2)} aria-label="Featured project image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={s.featuredImage}
                        src={posScreenshot.src}
                        alt="Custom POS system interface screenshot"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>

                <section className={`${s.explorations} ${s.stagger}`} style={staggerStyle(5)} aria-label="Explorations">
                  <header className={s.explorationsHeader}>
                    <div className={s.explorationsTitle}>Explorations</div>
                    <div className={s.explorationsIntro}>
                      Smaller projects exploring different systems, models, and problem spaces.
                    </div>
                  </header>

                  <div className={s.explorationList} aria-label="Exploration projects">
                    {EXPLORATIONS.map((p, i) => (
                      <article key={p.title} className={`${s.explorationItem} ${s.stagger}`} style={staggerStyle(6 + i)}>
                        <header className={s.explorationHeader}>
                          <div className={s.explorationTitle}>{p.title}</div>
                          <div className={s.explorationMeta}>{p.meta}</div>
                        </header>
                        <div className={s.explorationDesc}>{p.description}</div>

                        <details className={s.explorationDetails}>
                          <summary className={s.explorationSummary}>Key points</summary>
                          <ul className={s.explorationPoints}>
                            {p.keyPoints.map(k => (
                              <li key={k}>{k}</li>
                            ))}
                          </ul>
                        </details>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </section>
        );

      case 'publications':
        return (
          <section className={s.pubSection} aria-label="Publications">
            <div className={s.sectionBody}>
              <div className={s.pubLayout} aria-label="Publications layout">
                <div className={s.pubContent}>
                  <div className={s.list}>
                    {PUBLICATIONS.map((pub, i) => (
                      <article
                        key={`${pub.title}-${pub.year}`}
                        className={`${s.item} ${s.stagger}`}
                        style={staggerStyle(i)}
                      >
                        <header className={s.itemHeader}>
                          <div className={s.itemTitle}>{pub.title}</div>
                          <div className={s.itemMeta}>
                            {pub.venue} — {pub.year}
                          </div>
                        </header>
                        {pub.summary ? <div className={s.body}>{pub.summary}</div> : null}
                        {pub.highlights?.length ? (
                          <ul className={s.bullets}>
                            {pub.highlights.map(h => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        ) : null}
                        {pub.url ? (
                          <a
                            className={s.pubLink}
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Publication
                          </a>
                        ) : (
                          <span className={s.pubLink}>View Publication</span>
                        )}
                      </article>
                    ))}
                  </div>
                </div>

                <div
                  className={`${s.pubMedia} ${s.stagger}`}
                  style={staggerStyle(PUBLICATIONS.length)}
                  aria-label="Publication image"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={s.pubImage} src={publicationImage.src} alt="Publication cover screenshot" loading="lazy" />
                </div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section className={s.section} aria-label="Skills">
            <div className={s.sectionBody}>
              <div className={s.skillsGrid}>
                {SKILL_GROUPS.map((group, i) => (
                  <div key={group.title} className={`${s.skillCard} ${s.stagger}`} style={staggerStyle(i)}>
                    <div className={s.skillCardHeader}>
                      <div className={s.skillCardTitle}>{group.title}</div>
                      <div className={s.skillCardSubtitle}>{group.subtitle}</div>
                    </div>
                    <div className={s.skillCardTags}>
                      {group.tags.map(tag => (
                        <span key={tag} className={s.skillTag}>{tag}</span>
                      ))}
                    </div>
                    <div className={s.skillCardBody}>{group.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'education': {
        let idx = 0;
        return (
          <section className={s.section} aria-label="Education">
            <div className={s.sectionBody}>
              <div className={s.list}>
                {EDUCATION.map((item, eduIdx) => (
                  <article
                    key={item.title}
                    className={`${s.item} ${eduIdx === 0 ? s.eduPrimary : ''} ${s.stagger}`}
                    style={staggerStyle(idx++)}
                  >
                    <header className={s.itemHeader}>
                      <div className={s.itemTitle}>{item.title}</div>
                      <div className={s.itemMeta}>{item.summary}</div>
                    </header>
                    <div className={s.body}>{item.meta}</div>
                  </article>
                ))}
              </div>

              <div className={`${s.cfWrap} ${s.stagger}`} style={staggerStyle(idx++)} aria-label="Courses">
                <section className={s.cfBlock} aria-label="Courses">
                  <div className={s.cfLabel}>Courses</div>
                  <ul className={s.courseList} aria-label="Courses list">
                    {COURSES.map(course => (
                      <li key={`${course.name}-${course.provider}`} className={s.courseItem}>
                        <div className={s.courseTopRow}>
                          <div className={s.courseName}>{course.name}</div>
                          <div className={s.courseProvider}>{course.provider}</div>
                        </div>
                        {course.focus ? <div className={s.courseFocus}>{course.focus}</div> : null}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={s.layout}>
      <aside className={s.sidebar}>
        <nav className={s.sidebarNav} aria-label="Work sections">
          {SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                className={active ? `${s.sidebarLink} ${s.sidebarLinkActive}` : s.sidebarLink}
                aria-current={active ? 'true' : undefined}
                onClick={() => goToSection(id)}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className={`${s.main} ${s.pageEnter}`}>
        <div className={s.topControls} aria-label="Work controls">
          <div className={s.controlsRow}>
            <div className={s.activeTitle} aria-label="Active section">
              {activeLabel}
            </div>
            <div className={s.controlsActions}>
              <a className={s.buttonLink} href="/zainab-cv.pdf" download>
                <span aria-hidden>
                  <FiDownload size={16} aria-hidden />
                </span>
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>

        <div className={s.screen} aria-label="Work content">
          <div ref={contentRef} className={s.screenScroller}>
            <div className={`${s.sectionFrame} ${isOverview ? s.sectionFrameCenter : ''} ${sectionTransitionClass}`}>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
