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

  return (
    <a
      href={link.href}
      target={isMailto ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={styles.row}
      style={{ '--stagger': index } as CSSProperties}
    >
      <span className={styles.rowIcon}>
        <ContactIcon name={link.icon} />
      </span>

      <div className={styles.rowBody}>
        <span className={styles.rowLabel}>{link.label}</span>
        <span className={styles.rowValue}>{link.value}</span>
        <span className={styles.rowDesc}>{link.description}</span>
      </div>

      <span className={styles.rowArrow}>&rarr;</span>
    </a>
  );
}
