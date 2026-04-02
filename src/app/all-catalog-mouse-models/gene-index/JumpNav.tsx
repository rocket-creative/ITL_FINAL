'use client';

/**
 * Alphabet jump navigation — client component so smooth scroll works reliably.
 */

import { useState, useEffect } from 'react';

interface JumpNavProps {
  presentLetters: string[];
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function JumpNav({ presentLetters }: JumpNavProps) {
  const present = new Set(presentLetters);
  const [active, setActive] = useState('');

  // Highlight the letter whose section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace('letter-', ''));
          }
        }
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );
    ALPHABET.forEach((l) => {
      const el = document.getElementById(`letter-${l}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollTo(letter: string) {
    const el = document.getElementById(`letter-${letter}`);
    if (!el) return;
    // Offset for site nav (~68px) + sticky jump bar (~54px) + 8px breathing room
    const offset = 130;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <div style={{
      position: 'sticky',
      top: '68px',
      zIndex: 40,
      background: '#fff',
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      padding: '10px 20px',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: '.72rem',
          color: '#999',
          fontWeight: 700,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          marginRight: '8px',
          whiteSpace: 'nowrap',
        }}>
          Jump to:
        </span>

        {ALPHABET.map((letter) => {
          const isPresent  = present.has(letter);
          const isActive   = active === letter;
          return isPresent ? (
            <button
              key={letter}
              onClick={() => scrollTo(letter)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '4px',
                border: 'none',
                background: isActive ? '#006666' : '#008080',
                color: '#fff',
                fontSize: '.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.15s, transform 0.1s',
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
              }}
              aria-label={`Jump to gene names starting with ${letter}`}
            >
              {letter}
            </button>
          ) : (
            <span
              key={letter}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '4px',
                background: '#eee',
                color: '#bbb',
                fontSize: '.8rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
}
