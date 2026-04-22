'use client';

import posScreenshot from '@/assets/pos.png';

import { EXPLORATIONS, FEATURED_PROJECT } from '../constants';
import { staggerStyle } from '../staggerStyle';
import shared from '../WorkDashboard.module.css';
import styles from './ProjectsTab.module.css';
import ExplorationCard from './ExplorationCard';
import FeaturedListBlock from './FeaturedListBlock';

export default function ProjectsTab() {
  return (
    <section className={shared.section} aria-label="Projects">
      <div className={shared.sectionBody}>
        <div className={styles.projectsFlow} aria-label="Projects content">
          <section
            className={`${styles.featuredProject} ${shared.stagger}`}
            style={staggerStyle(0)}
            aria-label="Featured project"
          >
            <header className={styles.featuredHeader}>
              <div className={styles.featuredKicker}>Featured System</div>
              <div className={styles.featuredTitle}>{FEATURED_PROJECT.title}</div>
              <div className={styles.featuredMeta}>{FEATURED_PROJECT.meta}</div>
            </header>

            <div className={styles.featuredOverview}>{FEATURED_PROJECT.overview}</div>

            <div className={styles.featuredMain}>
              <div className={styles.featuredBlocks}>
                <FeaturedListBlock
                  label="What I Built"
                  items={FEATURED_PROJECT.whatIBuilt}
                  index={1}
                  ariaLabel="What I built"
                />

                <FeaturedListBlock
                  label="System Thinking"
                  items={FEATURED_PROJECT.systemThinking}
                  index={2}
                  ariaLabel="System thinking"
                />

                <FeaturedListBlock
                  label="Highlights"
                  items={FEATURED_PROJECT.highlights}
                  index={3}
                  ariaLabel="Highlights"
                />
              </div>

              <div
                className={`${styles.featuredMedia} ${shared.stagger}`}
                style={staggerStyle(2)}
                aria-label="Featured project image"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.featuredImage}
                  src={posScreenshot.src}
                  alt="Custom POS system interface screenshot"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section
            className={`${styles.explorations} ${shared.stagger}`}
            style={staggerStyle(5)}
            aria-label="Explorations"
          >
            <header className={styles.explorationsHeader}>
              <div className={styles.explorationsTitle}>Explorations</div>
              <div className={styles.explorationsIntro}>
                Smaller projects exploring different systems, models, and problem spaces.
              </div>
            </header>

            <div className={styles.explorationList} aria-label="Exploration projects">
              {EXPLORATIONS.map((p, i) => (
                <ExplorationCard key={p.title} project={p} index={6 + i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

