import type { CSSProperties } from 'react';

import type { ContactLink } from './types';
import ContactIcon from './ContactIcon';
import styles from './Contact.module.css';

type ContactRowProps = {
  link: ContactLink;
  index: number;
};

export default function ContactRow({ link, index }: ContactRowProps) {
  const isMailto = link.href.startsWith('mailto');

  const iconClass =
    link.icon === 'email'
      ? styles.rowIconEmail
      : link.icon === 'linkedin'
        ? styles.rowIconLinkedin
        : styles.rowIconGithub;

  const toneClass =
    link.icon === 'email'
      ? styles.rowToneEmail
      : link.icon === 'linkedin'
        ? styles.rowToneLinkedin
        : styles.rowToneGithub;

  return (
    <a
      href={link.href}
      target={isMailto ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={`${styles.row} ${toneClass}`}
      style={{ '--stagger': index } as CSSProperties}
      aria-label={`${link.label}: ${link.value}`}
    >
      <div className={styles.rowBody}>
        <span className={styles.rowValue}>{link.value}</span>
        <span className={styles.rowDesc}>{link.description}</span>
      </div>

      <span className={`${styles.rowIcon} ${iconClass}`} aria-hidden>
        <ContactIcon name={link.icon} />
      </span>
    </a>
  );
}
