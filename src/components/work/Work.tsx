'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

import SearchBar from '@/components/common/SearchBar/SearchBar';
import {
  SECTIONS,
  SECTION_INDEX,
  PROJECTS,
  PUBLICATIONS,
  SKILL_GROUPS,
  EDUCATION,
  ADDITIONAL,
  type SectionId,
} from './constants';
import { useWorkDashboardStyles } from './useWorkDashboardStyles';
import OverviewTab from './overviewTab/OverviewTab';
import ExperienceTab from './experienceTab/ExperienceTab';

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function matchesQuery(text: string, query: string) {
  if (!query) return true;
  return normalize(text).includes(query);
}

export default function Work() {
  const s = useWorkDashboardStyles();
  const [didInitialEnter, setDidInitialEnter] = useState(false);

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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setDidInitialEnter(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const [query, setQuery] = useState('');
  const normalizedQuery = useMemo(() => normalize(query), [query]);
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

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p =>
      matchesQuery([p.name, p.summary, ...(p.highlights ?? [])].join(' '), normalizedQuery)
    );
  }, [normalizedQuery]);

  const featuredProject = filteredProjects.find(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter(pub =>
      matchesQuery(
        [pub.title, pub.venue, pub.year, pub.summary ?? '', ...(pub.highlights ?? [])].join(' '),
        normalizedQuery
      )
    );
  }, [normalizedQuery]);

  const filteredSkillGroups = useMemo(() => {
    if (!normalizedQuery) return SKILL_GROUPS;
    return SKILL_GROUPS.map(group => ({
      ...group,
      skills: group.skills.filter(skill => matchesQuery(skill, normalizedQuery)),
    })).filter(group => group.skills.length > 0 || matchesQuery(group.label, normalizedQuery));
  }, [normalizedQuery]);

  const filteredEducation = useMemo(() => {
    return EDUCATION.filter(item => matchesQuery([item.title, item.meta, item.summary].join(' '), normalizedQuery));
  }, [normalizedQuery]);

  const filteredAdditional = useMemo(() => {
    return ADDITIONAL.filter(item => matchesQuery([item.title, item.meta, item.summary].join(' '), normalizedQuery));
  }, [normalizedQuery]);

  const sectionTransitionClass =
    transition === 'leaving' ? s.sectionLeaving : transition === 'entering' ? s.sectionEntering : '';

  const activeLabel = SECTIONS[activeIndex]?.label ?? 'Work';
  const isOverview = activeSection === 'overview';

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewTab goToSection={goToSection} />;

      case 'experience':
        return <ExperienceTab query={query} />;

      case 'projects':
        return (
          <section className={s.section} aria-label="Projects">
            <div className={s.sectionBody}>
              {featuredProject ? (
                <div className={s.featuredPanel} aria-label="Featured project">
                  <div className={s.itemHeader}>
                    <div className={s.itemTitle}>Featured — {featuredProject.name}</div>
                  </div>
                  <div className={s.body}>{featuredProject.summary}</div>
                  {featuredProject.highlights?.length ? (
                    <ul className={s.bullets}>
                      {featuredProject.highlights.map(h => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}

              {otherProjects.length === 0 ? (
                <div className={s.emptyState}>No projects match your search.</div>
              ) : (
                <div className={s.list}>
                  {otherProjects.map(p => (
                    <article key={p.name} className={s.item}>
                      <header className={s.itemHeader}>
                        <div className={s.itemTitle}>{p.name}</div>
                      </header>
                      <div className={s.body}>{p.summary}</div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'publications':
        return (
          <section className={s.section} aria-label="Publications">
            <div className={s.sectionBody}>
              {filteredPublications.length === 0 ? (
                <div className={s.emptyState}>No publications match your search.</div>
              ) : (
                <div className={s.list}>
                  {filteredPublications.map(pub => (
                    <article key={`${pub.title}-${pub.year}`} className={s.item}>
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
                      <div className={s.pubLink}>→ View Publication</div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'skills':
        return (
          <section className={s.section} aria-label="Skills">
            <div className={s.sectionBody}>
              {filteredSkillGroups.length === 0 ? (
                <div className={s.emptyState}>No skills match your search.</div>
              ) : (
                <div className={s.list}>
                  {filteredSkillGroups.map(group => (
                    <div key={group.label} className={s.item}>
                      <div className={s.itemHeader}>
                        <div className={s.itemTitle}>{group.label}</div>
                      </div>
                      <div className={s.body}>{group.skills.join(', ')}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'education':
        return (
          <section className={s.section} aria-label="Education">
            <div className={s.sectionBody}>
              {filteredEducation.length === 0 ? (
                <div className={s.emptyState}>No education entries match your search.</div>
              ) : (
                <div className={s.list}>
                  {filteredEducation.map(item => (
                    <article key={item.title} className={s.item}>
                      <header className={s.itemHeader}>
                        <div className={s.itemTitle}>{item.title}</div>
                        <div className={s.itemMeta}>{item.summary}</div>
                      </header>
                      <div className={s.body}>{item.meta}</div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'additional':
        return (
          <section className={s.section} aria-label="Additional">
            <div className={s.sectionBody}>
              {filteredAdditional.length === 0 ? (
                <div className={s.emptyState}>No additional entries match your search.</div>
              ) : (
                <div className={s.list}>
                  {filteredAdditional.map(item => (
                    <article key={item.title} className={s.item}>
                      <header className={s.itemHeader}>
                        <div className={s.itemTitle}>{item.title}</div>
                      </header>
                      <div className={s.body}>{item.meta}</div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

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
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder={`Search ${activeLabel}`}
                ariaLabel={`Search ${activeLabel}`}
              />
            </div>
          </div>
        </div>

        <div className={s.screen} aria-label="Work content">
          <div ref={contentRef} className={s.screenScroller}>
            <div className={`${s.sectionFrame} ${isOverview ? s.sectionFrameCenter : ''} ${sectionTransitionClass}`}>
              <div className={!didInitialEnter ? s.contentEnter : ''}>{renderSection()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
