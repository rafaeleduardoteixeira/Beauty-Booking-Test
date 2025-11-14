'use client';

import { useEffect, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { SearchIcon } from '@components/atoms/Icons';
import { ISearchInputProps } from './types';

export const SearchInput = ({
  handleSearch,
  className = '',
  accentColor = '#ef4444',
  initialValue = '',
  ...rest
}: ISearchInputProps) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const triggerSearch = () => {
    handleSearch(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerSearch();
    }
  };

  return (
    <div
      className={`flex w-[30vw] items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm ${className}`}
    >
      <input
        type="text"
        value={query}
        className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search a service..."
        {...rest}
      />
      <button
        type="button"
        style={{ backgroundColor: accentColor }}
        className="flex h-9 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-md md:w-10"
        aria-label="Search"
        onClick={triggerSearch}
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
