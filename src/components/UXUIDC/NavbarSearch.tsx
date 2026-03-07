/**
 * NavbarSearch - Unified search (catalog + site) with debounce and dropdown
 * @version 1.0.0
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';

const DEBOUNCE_MS = 300;

interface SearchResult {
  id: string;
  title: string;
  url: string;
  subtitle?: string;
}

interface SearchResponse {
  catalog: SearchResult[];
  site: SearchResult[];
}

interface NavbarSearchProps {
  id?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Mobile: show simplified version (no dropdown, just form) */
  compact?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function NavbarSearch({
  id = 'navbar-search',
  placeholder = 'model or site',
  className = '',
  inputClassName = '',
  compact = false,
}: NavbarSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      if (res.ok && !data.error) {
        setResults({ catalog: data.catalog ?? [], site: data.site ?? [] });
      } else {
        setResults({ catalog: [], site: [] });
      }
    } catch {
      setResults({ catalog: [], site: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchResults(debouncedQuery);
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setResults(null);
      setIsOpen(false);
    }
  }, [debouncedQuery, fetchResults]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allItems: Array<{ type: 'catalog' | 'site'; item: SearchResult }> = [
    ...(results?.catalog ?? []).map((item) => ({ type: 'catalog' as const, item })),
    ...(results?.site ?? []).map((item) => ({ type: 'site' as const, item })),
  ];

  const hasResults = allItems.length > 0;
  const showDropdown = isOpen && (isLoading || hasResults || (query.trim() && !isLoading));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || allItems.length === 0) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveIndex(-1);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i < allItems.length - 1 ? i + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : allItems.length - 1));
        break;
      case 'Enter':
        if (activeIndex >= 0 && allItems[activeIndex]) {
          e.preventDefault();
          window.location.href = allItems[activeIndex].item.url;
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  if (compact) {
    return (
      <form action="/search" method="get" role="search" className={className}>
        <label htmlFor={id} className="sr-only">
          Search models and services
        </label>
        <input
          ref={inputRef}
          id={id}
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={inputClassName}
          aria-label="Search models and services"
        />
      </form>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form action="/search" method="get" role="search" className="w-full">
        <label htmlFor={id} className="sr-only">
          Search models and services
        </label>
        <input
          ref={inputRef}
          id={id}
          type="search"
          name="q"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClassName}
          aria-label="Search models and services"
          aria-expanded={showDropdown ? 'true' : 'false'}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
          autoComplete="off"
        />
      </form>

      {showDropdown && (
        <div
          id={`${id}-listbox`}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-[#e0e0e0] rounded-sm shadow-lg max-h-[min(400px,70vh)] overflow-y-auto"
        >
          {isLoading ? (
            <div className="px-4 py-6 text-center text-sm text-[#666]">
              <span className="inline-block w-4 h-4 border-2 border-[#e0e0e0] border-t-teal-600 rounded-full animate-spin" aria-hidden />
              <span className="ml-2">Searching...</span>
            </div>
          ) : hasResults ? (
            <div className="py-2">
              {results?.catalog && results.catalog.length > 0 && (
                <div className="px-2 pb-1">
                  <div className="px-2 py-1 text-xs font-semibold text-[#008080] uppercase tracking-wider">
                    Catalog Models
                  </div>
                  {results.catalog.map((item, i) => (
                    <Link
                      key={item.id}
                      id={`${id}-option-${i}`}
                      href={item.url}
                      role="option"
                      aria-selected={activeIndex === i ? 'true' : 'false'}
                      className={`block px-4 py-2 text-sm hover:bg-[#f0f9f9] focus:bg-[#f0f9f9] focus:outline-none focus:ring-0 ${
                        activeIndex === i ? 'bg-[#f0f9f9]' : ''
                      }`}
                    >
                      <span className="font-medium text-[#0a253c]">{item.title}</span>
                      {item.subtitle && (
                        <span className="ml-2 text-[#666] text-xs">{item.subtitle}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
              {results?.site && results.site.length > 0 && (
                <div className="px-2">
                  <div className="px-2 py-1 text-xs font-semibold text-[#008080] uppercase tracking-wider">
                    Pages
                  </div>
                  {results.site.map((item, i) => {
                    const idx = (results?.catalog?.length ?? 0) + i;
                    return (
                      <Link
                        key={item.id}
                        id={`${id}-option-${idx}`}
                        href={item.url}
                        role="option"
                        aria-selected={activeIndex === idx ? 'true' : 'false'}
                        className={`block px-4 py-2 text-sm hover:bg-[#f0f9f9] focus:bg-[#f0f9f9] focus:outline-none focus:ring-0 ${
                          activeIndex === idx ? 'bg-[#f0f9f9]' : ''
                        }`}
                      >
                        <span className="font-medium text-[#0a253c]">{item.title}</span>
                        {item.subtitle && (
                          <span className="ml-2 text-[#666] text-xs">{item.subtitle}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-[#666]">
              No results. Try different keywords or{' '}
              <Link href="/search" className="text-[#008080] hover:underline">
                view full search
              </Link>
              .
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavbarSearch;
