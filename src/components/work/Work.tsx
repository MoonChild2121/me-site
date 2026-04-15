'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { FiBriefcase, FiChevronRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

import { useWorkDashboardStyles } from './useWorkDashboardStyles';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import {
  SECTIONS,
  SECTION_INDEX,
  EXPERIENCES,
  PROJECTS,
  PUBLICATIONS,
  SKILL_GROUPS,
  EDUCATION,
  ADDITIONAL,
  type SectionId,
} from './constants';

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

  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter(exp =>
      matchesQuery([exp.role, exp.company, exp.dateRange, ...exp.highlights].join(' '), normalizedQuery)
    );
  }, [normalizedQuery]);

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
        return (
          <section className={s.section} aria-label="Overview">
            <div className={`${s.sectionBody} ${s.overviewSectionBody}`}>
              <div className={s.overviewLeft}>
                <div className={s.overviewIntroWrap}>
                  <div className={s.stackTight}>
                    <p className={s.summary}>Frontend engineer focused on clear, scalable interface systems.</p>
                    <p className={s.body}>
                      I build production Next.js applications with a focus on structure, performance, and long-term
                      maintainability. My background in machine learning and research shapes how I reason about
                      systems, trade-offs, and clarity.
                    </p>
                  </div>
                </div>

                <div className={`${s.panel} ${s.contactCard}`} aria-label="Contact">
                  <div className={s.panelHeading}>Contact</div>
                  <div className={s.contactStack}>
                    <a className={s.contactRow} href="tel:+923060040951">
                      <span className={s.iconBadge} aria-hidden>
                        <FiPhone size={16} aria-hidden />
                      </span>
                      <span className={s.contactRowText}>+92 306 0040951</span>
                    </a>
                    <a className={s.contactRow} href="mailto:zkashif.bscs21seecs@seecs.edu.pk">
                      <span className={s.iconBadge} aria-hidden>
                        <FiMail size={16} aria-hidden />
                      </span>
                      <span className={s.contactRowText}>zkashif.bscs21seecs@seecs.edu.pk</span>
                    </a>
                    <a
                      className={s.contactRow}
                      href="https://linkedin.com/in/zainab-kashif-193b26218"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className={s.iconBadge} aria-hidden>
                        <FiLinkedin size={16} aria-hidden />
                      </span>
                      <span className={s.contactRowText}>LinkedIn</span>
                    </a>
                    <a className={s.contactRow} href="https://github.com/MoonChild2121" target="_blank" rel="noreferrer">
                      <span className={s.iconBadge} aria-hidden>
                        <FiGithub size={16} aria-hidden />
                      </span>
                      <span className={s.contactRowText}>GitHub</span>
                    </a>

                    <Link className={s.contactCta} href="/contact">
                      Or directly email me here!
                    </Link>
                  </div>
                </div>
              </div>

              <div className={s.overviewRightStack}>
                <div className={s.highlightsGrid} aria-label="Highlights">
                  <button
                    type="button"
                    className={`${s.highlightTile} ${s.highlightTileButton}`}
                    onClick={() => goToSection('experience')}
                  >
                    <div className={s.highlightLine}>
                      <span>Associate Frontend Engineer - Carbonteq</span>
                      <span className={s.highlightLineEnd}>
                        <span className={s.currentPill} aria-label="Current role" title="Current role">
                          <FiBriefcase size={14} aria-hidden />
                        </span>
                        <span className={s.highlightChevron} aria-hidden>
                          <FiChevronRight size={18} aria-hidden />
                        </span>
                      </span>
                    </div>
                  </button>
                  <div className={s.highlightTile}>Next.js production systems</div>
                  <button
                    type="button"
                    className={`${s.highlightTile} ${s.highlightTileButton}`}
                    onClick={() => goToSection('projects')}
                  >
                    <div className={s.highlightLine}>
                      <span>Design systems + UI architecture</span>
                      <span className={s.highlightChevron} aria-hidden>
                        <FiChevronRight size={18} aria-hidden />
                      </span>
                    </div>
                  </button>
                  <div className={s.highlightTile}>Performance + accessibility focus</div>
                  <div className={s.highlightTile}>ML / AI background</div>
                  <button
                    type="button"
                    className={`${s.highlightTile} ${s.highlightTileButton}`}
                    onClick={() => goToSection('publications')}
                  >
                    <div className={s.highlightLine}>
                      <span>IEEE publication (2025)</span>
                      <span className={s.highlightChevron} aria-hidden>
                        <FiChevronRight size={18} aria-hidden />
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      case 'experience':
        return (
          <section className={s.section} aria-label="Experience">
            <div className={s.sectionBody}>
              {filteredExperiences.length === 0 ? (
                <div className={s.emptyState}>No experience entries match your search.</div>
              ) : (
                <div className={s.list}>
                  {filteredExperiences.map(exp => (
                    <article key={`${exp.company}-${exp.role}-${exp.dateRange}`} className={s.item}>
                      <header className={s.itemHeader}>
                        <div className={s.itemTitle}>{exp.role}</div>
                        <div className={s.itemMeta}>{exp.dateRange}</div>
                      </header>
                      <ul className={s.bullets}>
                        {exp.highlights.map(h => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

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

