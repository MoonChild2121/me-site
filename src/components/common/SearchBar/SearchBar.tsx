'use client';

import { FiSearch } from 'react-icons/fi';

import { useSearchBarStyles } from './useSearchBarStyles';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  ariaLabel = 'Search',
}: SearchBarProps) {
  const s = useSearchBarStyles();

  return (
    <div className={s.root}>
      <span className={s.iconWrap} aria-hidden>
        <FiSearch size={16} aria-hidden />
      </span>
      <span className={s.divider} aria-hidden />
      <input
        className={s.input}
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
}

