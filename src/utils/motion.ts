import type { CSSProperties } from 'react';

export function staggerStyle(index: number): CSSProperties {
  return { '--stagger': index } as CSSProperties;
}

export function revealDelay(ms: number): CSSProperties {
  return { ['--reveal-delay' as never]: `${ms}ms` } as CSSProperties;
}
