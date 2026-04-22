'use client';

import { useState } from 'react';

import { LOG_TAGS, LOG_ENTRIES } from './constants';
import LogCard from './LogCard';
import styles from './Log.module.css';

export default function Log() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [animKey, setAnimKey] = useState(0);

  const filtered =
    activeFilter === 'all' ? LOG_ENTRIES : LOG_ENTRIES.filter(e => e.type === activeFilter);

  function handleFilter(tag: string) {
    setActiveFilter(tag);
    setAnimKey(k => k + 1);
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>log</h1>
          <span className={styles.year}>{new Date().getFullYear()}</span>
        </div>
        <p className={styles.subtitle}>
          things I&rsquo;m reading, thinking about, building, and drawing. no particular order.
        </p>
      </header>

      <div className={styles.filters} role="group" aria-label="Filter entries">
        {LOG_TAGS.map(t => (
          <button
            key={t}
            type="button"
            className={`${styles.filterPill} ${activeFilter === t ? styles.filterPillActive : ''}`}
            aria-pressed={activeFilter === t}
            onClick={() => handleFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.feed} key={animKey}>
        {filtered.map((entry, i) => (
          <LogCard key={entry.id} entry={entry} index={i} />
        ))}
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerNote}>updated whenever</span>
        <span className={styles.footerCount}>
          {filtered.length} {activeFilter === 'all' ? 'entries' : `${activeFilter}s`}
        </span>
      </footer>
    </div>
  );
}
