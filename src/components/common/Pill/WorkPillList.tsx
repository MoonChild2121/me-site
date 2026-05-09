import type { HTMLAttributes } from 'react';

import styles from './Pill.module.css';

type WorkPillListProps = HTMLAttributes<HTMLUListElement>;

export default function WorkPillList({ className, children, ...rest }: WorkPillListProps) {
  return (
    <ul className={[styles.workList, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </ul>
  );
}
