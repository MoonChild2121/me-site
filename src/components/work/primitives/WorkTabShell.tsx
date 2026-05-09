import type { ReactNode } from 'react';

import shared from '../WorkDashboard.module.css';

type WorkTabShellProps = {
  'aria-label': string;
  sectionClassName?: string;
  withSectionBody?: boolean;
  children: ReactNode;
};

export default function WorkTabShell({
  'aria-label': ariaLabel,
  sectionClassName,
  withSectionBody = true,
  children,
}: WorkTabShellProps) {
  return (
    <section className={sectionClassName ?? shared.section} aria-label={ariaLabel}>
      {withSectionBody ? <div className={shared.sectionBody}>{children}</div> : children}
    </section>
  );
}
