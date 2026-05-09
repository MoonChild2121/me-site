import contactBg from '@/assets/contact/contactBg.png';
import PageHero from '@/components/common/PageHero/PageHero';
import Stack from '@/components/common/Stack/Stack';
import { CONTACT_LINKS } from './constants';
import ContactRow from './ContactRow';
import styles from './Contact.module.css';
import { staggerStyle } from '@/utils/motion';

const BACKDROP_SIDES = [
  {
    key: 'left',
    paneClass: styles.botanicalBackdropPane,
    imgClass: styles.botanicalBackdropImg,
  },
  {
    key: 'right',
    paneClass: `${styles.botanicalBackdropPane} ${styles.botanicalBackdropPaneMirror}`,
    imgClass: `${styles.botanicalBackdropImg} ${styles.botanicalBackdropImgMirror}`,
  },
] as const;

export default function Contact() {
  return (
    <div className={styles.wrap}>
      <div className={styles.botanicalBackdrop} aria-hidden>
        {BACKDROP_SIDES.map((side) => (
          <div key={side.key} className={side.paneClass}>
            <img
              className={side.imgClass}
              src={contactBg.src}
              alt=""
              width={contactBg.width}
              height={contactBg.height}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className={styles.middle}>
        <div className={styles.content}>
          <PageHero
            className={styles.stagger}
            style={staggerStyle(0)}
            kicker="Contact"
            title="say hello."
            subtitle={
              <>
                Open to interesting conversations, side projects, collaborations, or just a good book
                recommendation.
              </>
            }
          />

          <Stack gap="stackSm">
            {CONTACT_LINKS.map((link, i) => (
              <ContactRow key={link.label} link={link} index={i + 1} />
            ))}
          </Stack>

          <footer
            className={`${styles.footer} ${styles.stagger}`}
            style={staggerStyle(CONTACT_LINKS.length + 1)}
          >
            <span className={styles.footerLocation}>based in Lahore, Pakistan</span>
            <span className={styles.footerNote}>Usually replies fast</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
