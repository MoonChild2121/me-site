import ButtonLink from '@/components/common/ButtonLink/ButtonLink';
import Stack from '@/components/common/Stack/Stack';
import WorkTabShell from '../primitives/WorkTabShell';
import { workStaggerProps } from '../primitives/workStaggerProps';
import styles from './OverviewTab.module.css';

export default function OverviewTab() {
  return (
    <WorkTabShell aria-label="Overview" withSectionBody={false}>
      <Stack gap="stack2xl" className={styles.flow}>
        <Stack {...workStaggerProps(0, styles.bioBlock)} gap="paddingMd">
          <p className={styles.bioPrimary}>
            I build{' '}
            <span className={styles.bioEmphasis}>production Next.js applications</span>
            {' '}
            with a focus on structure, performance, and long-term maintainability.
          </p>
          <p className={styles.bioSecondary}>
            My background in machine learning and research shapes how I reason about systems,
            trade-offs, and clarity.
          </p>
        </Stack>

        <Stack {...workStaggerProps(1, styles.ctaBlock)} gap="sm">
          <p className={styles.ctaHeadline}>Want to get in touch?</p>
          <p className={styles.ctaSub}>
            I'm open to conversations, collaborations, or just a hello.
          </p>
          <ButtonLink href="/contact" variant="outline" chrome="work" className={styles.ctaLink}>
            Contact me
          </ButtonLink>
        </Stack>
      </Stack>
    </WorkTabShell>
  );
}
