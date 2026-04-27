import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import styles from './Pill.module.css';

type PillVariant = 'filter' | 'status' | 'tag' | 'inverted';

type PillBaseProps = {
  variant?: PillVariant;
  active?: boolean;
  className?: string;
};

type PillButtonProps = PillBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type PillSpanProps = PillBaseProps &
  HTMLAttributes<HTMLSpanElement> & { as: 'span' };

type PillProps = PillButtonProps | PillSpanProps;

export default function Pill(props: PillProps) {
  const {
    variant = 'status',
    active = false,
    className,
    children,
    ...rest
  } = props;

  const cls = [
    styles.pill,
    styles[variant],
    variant === 'filter' && active ? styles.filterActive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (props.as === 'span') {
    const { as: _, variant: _v, active: _a, ...spanProps } = rest as PillSpanProps;
    return (
      <span className={cls} {...spanProps}>
        {children}
      </span>
    );
  }

  const { as: _, variant: _v, active: _a, ...btnProps } = rest as PillButtonProps;
  return (
    <button type="button" className={cls} {...btnProps}>
      {children}
    </button>
  );
}
