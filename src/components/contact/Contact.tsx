import { CONTACT_LINKS } from './constants';
import ContactRow from './ContactRow';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p className={styles.kicker}>Contact</p>
        <h1 className={styles.title}>say hello.</h1>
        <p className={styles.subtitle}>
          Open to interesting conversations, side projects, collaborations, or just a good book
          recommendation.
        </p>
      </header>

      <div className={styles.rows}>
        {CONTACT_LINKS.map((link, i) => (
          <ContactRow key={link.label} link={link} index={i} />
        ))}
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerLocation}>based in Lahore, Pakistan</span>
        <span className={styles.footerNote}>Usually replies fast</span>
      </footer>
    </div>
  );
}
