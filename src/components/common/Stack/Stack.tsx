import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Stack.module.css';

export type StackGap =
  | 'none'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'stackSm'
  | 'stackMd'
  | 'stack2xl'
  | 'clusterSm'
  | 'clusterMd'
  | 'clusterLg'
  | 'paddingMd';

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  direction?: 'column' | 'row';
  gap?: StackGap;
  wrap?: boolean;
  align?: 'start' | 'center' | 'stretch' | 'baseline';
  justify?: 'start' | 'between';
};

const GAP_CLASS: Record<Exclude<StackGap, 'none'>, string> = {
  '2xs': styles.gap2xs,
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
  stackSm: styles.gapStackSm,
  stackMd: styles.gapStackMd,
  stack2xl: styles.gapStack2xl,
  clusterSm: styles.gapClusterSm,
  clusterMd: styles.gapClusterMd,
  clusterLg: styles.gapClusterLg,
  paddingMd: styles.gapPaddingMd,
};

export default function Stack({
  direction = 'column',
  gap = 'none',
  wrap,
  align,
  justify,
  className,
  children,
  ...rest
}: StackProps) {
  const cls = [
    styles.root,
    direction === 'row' ? styles.row : styles.col,
    gap !== 'none' ? GAP_CLASS[gap] : undefined,
    wrap ? styles.wrap : undefined,
    align === 'start' ? styles.alignStart : undefined,
    align === 'center' ? styles.alignCenter : undefined,
    align === 'stretch' ? styles.alignStretch : undefined,
    align === 'baseline' ? styles.alignBaseline : undefined,
    justify === 'between' ? styles.justifyBetween : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
