'use client';

/**
 * AI Access Gate - Tracks usage and prompts for consultation
 * Generous free access with soft consultation prompts
 */

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AIAccessContextType {
  queriesUsed: number;
  queriesRemaining: number;
  shouldPromptConsult: boolean;
  hasShownConsultPrompt: boolean;
  consumeQuery: () => boolean;
  dismissConsultPrompt: () => void;
  showConsultModal: boolean;
  setShowConsultModal: (show: boolean) => void;
}

const AIAccessContext = createContext<AIAccessContextType | null>(null);

const TOTAL_FREE_QUERIES = 15; // Generous limit
const CONSULT_PROMPT_AFTER = 3; // Soft prompt after 3 queries
const STORAGE_KEY = 'itl_breeding_ai_usage';

// Helper to load initial state from localStorage
function getInitialState(): { queriesUsed: number; hasShownConsultPrompt: boolean } {
  if (typeof window === 'undefined') {
    return { queriesUsed: 0, hasShownConsultPrompt: false };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const lastUsed = new Date(data.lastUsed);
      const now = new Date();
      const hoursSinceLastUse = (now.getTime() - lastUsed.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastUse < 24) {
        return {
          queriesUsed: data.queriesUsed || 0,
          hasShownConsultPrompt: data.hasShownConsultPrompt || false,
        };
      }
    }
  } catch {
    // localStorage might not be available
  }
  return { queriesUsed: 0, hasShownConsultPrompt: false };
}

export function AIAccessProvider({ children }: { children: ReactNode }) {
  // Use lazy initialization to load from localStorage
  const [queriesUsed, setQueriesUsed] = useState(() => getInitialState().queriesUsed);
  const [hasShownConsultPrompt, setHasShownConsultPrompt] = useState(() => getInitialState().hasShownConsultPrompt);
  const [showConsultModal, setShowConsultModal] = useState(false);

  // Save usage changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        queriesUsed,
        hasShownConsultPrompt,
        lastUsed: new Date().toISOString(),
      }));
    } catch {
      // ignore
    }
  }, [queriesUsed, hasShownConsultPrompt]);

  const queriesRemaining = Math.max(0, TOTAL_FREE_QUERIES - queriesUsed);
  const shouldPromptConsult = queriesUsed >= CONSULT_PROMPT_AFTER && !hasShownConsultPrompt;

  const consumeQuery = (): boolean => {
    // Check if should show consultation prompt (soft, dismissible)
    if (shouldPromptConsult) {
      setShowConsultModal(true);
      setHasShownConsultPrompt(true);
    }

    // Allow query if under limit
    if (queriesUsed < TOTAL_FREE_QUERIES) {
      setQueriesUsed((prev) => prev + 1);
      return true;
    }

    // At limit - show modal but still return false
    setShowConsultModal(true);
    return false;
  };

  const dismissConsultPrompt = () => {
    setShowConsultModal(false);
    setHasShownConsultPrompt(true);
  };

  return (
    <AIAccessContext.Provider
      value={{
        queriesUsed,
        queriesRemaining,
        shouldPromptConsult,
        hasShownConsultPrompt,
        consumeQuery,
        dismissConsultPrompt,
        showConsultModal,
        setShowConsultModal,
      }}
    >
      {children}
    </AIAccessContext.Provider>
  );
}

export function useAIAccess() {
  const context = useContext(AIAccessContext);
  if (!context) {
    throw new Error('useAIAccess must be used within AIAccessProvider');
  }
  return context;
}

// For testing: reset usage
export function resetAIUsage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  } catch {
    // ignore
  }
}
