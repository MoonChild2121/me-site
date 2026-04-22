import type { CSSProperties } from 'react';

export function staggerStyle(index: number): CSSProperties {
  return { '--stagger': index } as CSSProperties;
}

