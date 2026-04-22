import type { CSSProperties } from 'react';

import type { LogEntry, PostEntry, BookEntry, DrawingEntry } from './types';
import styles from './Log.module.css';

function stagger(index: number): CSSProperties {
  return { '--stagger': index } as CSSProperties;
}

function PostVariant({ entry }: { entry: PostEntry }) {
  return (
    <>
      <div className={styles.postTopRow}>
        <span className={styles.postTag}>{entry.tag}</span>
        <span className={styles.postMeta}>
          {entry.readTime} · {entry.date}
        </span>
      </div>
      <h2 className={styles.postTitle}>{entry.title}</h2>
      <p className={styles.postExcerpt}>{entry.excerpt}</p>
    </>
  );
}

function BookVariant({ entry }: { entry: BookEntry }) {
  return (
    <>
      <div className={styles.bookTopRow}>
        <span className={styles.bookLabel}>Book</span>
        <span className={styles.bookDate}>{entry.date}</span>
      </div>
      <p className={styles.bookQuote}>&ldquo;{entry.quote}&rdquo;</p>
      <div className={styles.bookTitleRow}>
        <span className={styles.bookTitle}>{entry.title}</span>
        <span className={styles.bookAuthor}>&mdash; {entry.author}</span>
      </div>
      <p className={styles.bookThought}>{entry.thought}</p>
    </>
  );
}

function DrawingVariant({ entry }: { entry: DrawingEntry }) {
  return (
    <>
      <div className={styles.drawingTopRow}>
        <span className={styles.drawingLabel}>Drawing</span>
        <span className={styles.drawingDate}>{entry.date}</span>
      </div>
      <div className={styles.drawingCanvas}>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden>
          {entry.sketchLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#3A2510"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}
        </svg>
      </div>
      <p className={styles.drawingTitle}>{entry.title}</p>
    </>
  );
}

const VARIANT_CLASS: Record<LogEntry['type'], string> = {
  post: styles.postCard,
  book: styles.bookCard,
  drawing: styles.drawingCard,
};

type LogCardProps = {
  entry: LogEntry;
  index: number;
};

export default function LogCard({ entry, index }: LogCardProps) {
  const variantClass = VARIANT_CLASS[entry.type];
  const inlineStyle =
    entry.type === 'drawing'
      ? { ...stagger(index), backgroundColor: entry.bg }
      : stagger(index);

  return (
    <article className={`${styles.card} ${variantClass}`} style={inlineStyle}>
      {entry.type === 'post' && <PostVariant entry={entry} />}
      {entry.type === 'book' && <BookVariant entry={entry} />}
      {entry.type === 'drawing' && <DrawingVariant entry={entry} />}
    </article>
  );
}
