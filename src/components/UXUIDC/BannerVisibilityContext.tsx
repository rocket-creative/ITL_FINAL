'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type BannerVisibilityContextValue = {
  suppressBanner: boolean;
  setSuppressBanner: (value: boolean) => void;
};

const BannerVisibilityContext = createContext<BannerVisibilityContextValue | null>(null);

export function BannerVisibilityProvider({ children }: { children: ReactNode }) {
  const [suppressBanner, setSuppressBanner] = useState(false);
  const value = useMemo(
    () => ({ suppressBanner, setSuppressBanner }),
    [suppressBanner],
  );
  return (
    <BannerVisibilityContext.Provider value={value}>
      {children}
    </BannerVisibilityContext.Provider>
  );
}

export function useBannerVisibility() {
  const ctx = useContext(BannerVisibilityContext);
  if (!ctx) {
    return { suppressBanner: false, setSuppressBanner: () => {} };
  }
  return ctx;
}
