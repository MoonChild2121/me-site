import type { CSSProperties } from 'react';

import { staggerStyle } from '@/utils/motion';

import shared from '../WorkDashboard.module.css';

export function workStaggerProps(index: number, ...classNames: Array<string | undefined | false>): {
  className: string;
  style: CSSProperties;
} {
  const extra = classNames.filter(Boolean) as string[];
  return {
    className: [shared.stagger, ...extra].join(' '),
    style: staggerStyle(index),
  };
}
