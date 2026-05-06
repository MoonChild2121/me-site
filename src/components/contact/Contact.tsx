import type { CSSProperties } from 'react';

import { CONTACT_LINKS } from './constants';
import ContactRow from './ContactRow';
import styles from './Contact.module.css';

function stagger(i: number): CSSProperties {
  return { '--stagger': i } as CSSProperties;
}

export default function Contact() {
  return (
    <div className={styles.wrap}>
      <div className={styles.middle}>
        <div className={styles.content}>
          <header className={`${styles.header} ${styles.stagger}`} style={stagger(0)}>
            <p className={styles.kicker}>Contact</p>
            <h1 className={styles.title}>say hello.</h1>
            <p className={styles.subtitle}>
              Open to interesting conversations, side projects, collaborations, or just a good book
              recommendation.
            </p>
          </header>

          <div className={styles.rows}>
            {CONTACT_LINKS.map((link, i) => (
              <ContactRow key={link.label} link={link} index={i + 1} />
            ))}
          </div>

          <footer className={`${styles.footer} ${styles.stagger}`} style={stagger(CONTACT_LINKS.length + 1)}>
            <span className={styles.footerLocation}>based in Lahore, Pakistan</span>
            <span className={styles.footerNote}>Usually replies fast</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
