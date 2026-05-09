import type { ContactChannel, ContactLink } from './types';
import ContactIcon from './ContactIcon';
import { staggerStyle } from '@/utils/motion';
import styles from './Contact.module.css';

type ContactRowProps = {
  link: ContactLink;
  index: number;
};

const rowToneClass: Record<ContactChannel, string> = {
  email: styles.rowToneEmail,
  linkedin: styles.rowToneLinkedin,
  github: styles.rowToneGithub,
};

export default function ContactRow({ link, index }: ContactRowProps) {
  const isMailto = link.href.startsWith('mailto');

  return (
    <a
      href={link.href}
      target={isMailto ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={`${styles.row} ${rowToneClass[link.icon]}`}
      style={staggerStyle(index)}
      aria-label={`${link.label}: ${link.value}`}
    >
      <div className={styles.rowBody}>
        <span className={styles.rowValue}>{link.value}</span>
        <span className={styles.rowDesc}>{link.description}</span>
      </div>

      <span className={styles.rowIcon} aria-hidden>
        <ContactIcon name={link.icon} />
      </span>
    </a>
  );
}
