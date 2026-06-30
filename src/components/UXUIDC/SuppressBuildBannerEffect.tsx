'use client';

import { useEffect } from 'react';
import { useBannerVisibility } from './BannerVisibilityContext';

/** Client effect to suppress banner for build_inquiry pages */
export default function SuppressBuildBannerEffect() {
  const { setSuppressBanner } = useBannerVisibility();

  useEffect(() => {
    setSuppressBanner(true);
    return () => setSuppressBanner(false);
  }, [setSuppressBanner]);

  return null;
}
