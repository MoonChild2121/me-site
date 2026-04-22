import type { HTMLAttributes } from 'react';

import styles from './Card.module.css';

type CardVariant = 'surface' | 'elevated' | 'glass' | 'dark';
type CardPadding = 'sm' | 'md' | 'lg' | 'none';

type CardProps = HTMLAttributes<HTMLElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  radiusLg?: boolean;
  as?: 'div' | 'article' | 'section';
  className?: string;
};

const PAD_CLASS: Record<Exclude<CardPadding, 'none'>, string> = {
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

export default function Card({
  variant = 'surface',
  padding = 'md',
  interactive = false,
  radiusLg = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  const cls = [
    styles.card,
    styles[variant],
    padding !== 'none' ? PAD_CLASS[padding] : '',
    interactive ? styles.interactive : '',
    radiusLg ? styles.radiusLg : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
