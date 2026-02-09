'use client';

/**
 * |UXUIDC| Lab Signals Newsletter Signup Component
 * Displays newsletter signup callouts throughout the site
 * Based on https://www.genetargeting.com/lab-signals
 */

import Link from 'next/link';
import Image from 'next/image';
import { IconMail, IconFileText, IconArrowRight, IconFlask, IconTarget } from './Icons';

interface LabSignalsSignupProps {
  variant?: 'banner' | 'inline' | 'card' | 'sidebar';
  title?: string;
  description?: string;
  showArticles?: boolean;
  relatedArticles?: {
    title: string;
    slug: string;
    category?: string;
  }[];
}

// Featured Lab Signals Articles - from newsletter CSV
export const labSignalsArticles = [
  {
    title: "Insights into Neurodegenerative Diseases: Alzheimer's Disease Progression and Treatments",
    slug: "insights-into-neurodegenerative-diseases-alzheimers-disease-progression-and-treatments",
    category: "Neuroscience",
    relatedPages: ["/alzheimers-mouse-models", "/neuroscience-mouse-models"]
  },
  {
    title: "Advances in Metabolic Disorders Research: Obesity and Diabetes",
    slug: "article-2-advances-in-metabolic-disorders-research-obesity-and-diabetes",
    category: "Metabolic",
    relatedPages: ["/nash-mash-mouse-models", "/cardiovascular-mouse-models"]
  },
  {
    title: "Developments in Immune and Infectious Diseases: Insights from Humanized Models",
    slug: "article-3-developments-in-immune-and-infectious-diseases-insights-from-humanized-models",
    category: "Immunology",
    relatedPages: ["/humanized-mouse-models", "/immunology-mouse-models", "/immuno-oncology-mouse-models"]
  },
  {
    title: "Breakthroughs in Cancer Research: Innovations in Immunotherapy",
    slug: "article-4-breakthroughs-in-cancer-research-innovations-in-immunotherapy",
    category: "Oncology",
    relatedPages: ["/oncology-mouse-models", "/immuno-oncology-mouse-models", "/tumor-suppressor-knockout-mice"]
  },
  {
    title: "Advancements in Gene Editing Technologies: Enhancements in CRISPR-Cas9",
    slug: "article-5-advancements-in-gene-editing-technologies-enhancements-in-crispr-cas9",
    category: "Technology",
    relatedPages: ["/knockout-mouse-models", "/knockin-mouse-models", "/cre-lox-system"]
  },
  {
    title: "Building Better Floxed Alleles for Conditional Knockout Mice",
    slug: "building-better-floxed-alleles-for-conditional-knockout-mice",
    category: "Technical Guide",
    relatedPages: ["/conditional-knockout-mouse-models", "/cre-lox-system"]
  },
  {
    title: "Conventional vs. Conditional Knockout Mice",
    slug: "conventional-vs-conditional-knockout-mice",
    category: "Selection Guide",
    relatedPages: ["/conditional-knockout-mouse-models", "/conventional-knockout-mouse-models", "/conditional-vs-conventional-guide"]
  },
  {
    title: "Cre-Lox: 6 Facts You May Not Know",
    slug: "cre-lox-6-facts-you-may-not-know",
    category: "Technical Guide",
    relatedPages: ["/cre-lox-system", "/conditional-knockout-mouse-models", "/cre-line-selection-guide"]
  },
  {
    title: "How Humanized Mouse Models Are Transforming Pre-clinical R&D",
    slug: "how-humanized-mouse-models-are-transforming-pre-clinical-r-d",
    category: "Industry Insights",
    relatedPages: ["/humanized-mouse-models", "/pd1-humanized-mice", "/immuno-oncology-mouse-models"]
  },
  {
    title: "How a Knockout Mouse Is Made",
    slug: "how-a-knockout-mouse-is-made",
    category: "Educational",
    relatedPages: ["/knockout-mouse-models", "/custom-mouse-models"]
  },
  {
    title: "Knock-In Mice vs. Transgenic Mice: What You Need to Know",
    slug: "knock-in-mice-vs-transgenic-mice-what-you-need-to-know",
    category: "Selection Guide",
    relatedPages: ["/knockin-mouse-models", "/transgenic-mouse-service"]
  },
  {
    title: "Leveraging Mouse Models for Point Mutation Diseases: R&D Landscape",
    slug: "leveraging-mouse-models-for-point-mutation-diseases-r-d-landscape",
    category: "Industry Insights",
    relatedPages: ["/point-mutation-mice"]
  },
  {
    title: "Top 5 Lab Mouse Colony Management Software Options For 2025",
    slug: "top-5-lab-mouse-colony-management-software-options-for-2025",
    category: "Resources",
    relatedPages: ["/colony-management-services", "/breeding-scheme-architect"]
  }
];

// Get related articles for a specific page
export function getRelatedLabSignalsArticles(currentPath: string) {
  return labSignalsArticles.filter(article => 
    article.relatedPages.includes(currentPath)
  );
}

export default function LabSignalsSignup({
  variant = 'banner',
  title = "Stay Ahead with Lab Signals",
  description = "Expert research insights delivered biweekly. Written by PhD scientists, designed for researchers who need cutting-edge knowledge to advance their projects.",
  showArticles = false,
  relatedArticles = []
}: LabSignalsSignupProps) {
  
  if (variant === 'sidebar') {
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '0',
        padding: '20px',
        margin: '0',
        border: '4px solid #fb0',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: '16px',
        alignItems: 'end',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      className="hover:shadow-lg"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}>
        <div style={{ width: 'auto', height: '80px', maxHeight: '80px' }}>
          <Image 
            src="/images/lab-signals-logo.svg" 
            alt="Lab Signals"
            width={160}
            height={80}
            style={{ objectFit: 'contain', width: 'auto', height: '80px', maxHeight: '80px' }}
          />
        </div>
        <p style={{ fontSize: '.85rem', lineHeight: 1.6, margin: 0, color: '#000' }}>
          Expert insights from PhD scientists. Latest research delivered biweekly.
        </p>
        <Link
          href="/lab-signals"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#fb0',
            color: '#000',
            borderRadius: '0',
            fontSize: '.85rem',
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Subscribe Free
          <IconArrowRight size={14} color="#000" />
        </Link>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div style={{
        background: '#ffffff',
        border: '4px solid #fb0',
        borderRadius: '0',
        padding: '20px',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      className="hover:shadow-lg"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'auto 1fr auto', 
          gap: '20px', 
          alignItems: 'end',
          marginBottom: showArticles && relatedArticles.length > 0 ? '16px' : '0'
        }}>
          <div style={{ width: 'auto', height: '100px', maxHeight: '100px' }}>
            <Image 
              src="/images/lab-signals-logo.svg" 
              alt="Lab Signals"
              width={200}
              height={100}
              style={{ objectFit: 'contain', width: 'auto', height: '100px', maxHeight: '100px' }}
            />
          </div>
          <div>
            <h4 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#000',
              margin: '0 0 8px 0'
            }}>
              {title}
            </h4>
            <p style={{ fontSize: '.85rem', color: '#000', lineHeight: 1.5, margin: 0 }}>
              {description}
            </p>
          </div>
          <Link
            href="/lab-signals"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: '#fb0',
              color: '#000',
              borderRadius: '0',
              fontSize: '.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            Subscribe Free
            <IconArrowRight size={14} color="#000" />
          </Link>
        </div>
        
        {showArticles && relatedArticles.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #fb0' }}>
            <p style={{ fontSize: '.8rem', color: '#000', marginBottom: '8px', fontWeight: 500 }}>Related Articles:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {relatedArticles.slice(0, 3).map((article, idx) => (
                <Link
                  key={idx}
                  href={`/lab-signals#${article.slug}`}
                  style={{
                    fontSize: '.8rem',
                    color: '#000',
                    textDecoration: 'none',
                    padding: '4px 12px',
                    background: 'rgba(255,187,0,0.2)',
                    borderRadius: '0',
                    border: '1px solid #fb0'
                  }}
                >
                  {article.title.length > 40 ? article.title.substring(0, 40) + '...' : article.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '0',
        padding: '20px',
        margin: '0',
        border: '4px solid #fb0',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      className="hover:shadow-lg"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'auto 1fr auto', 
          gap: '20px', 
          alignItems: 'end',
          marginBottom: '20px'
        }}>
          <div style={{ width: 'auto', height: '110px', maxHeight: '110px' }}>
            <Image 
              src="/images/lab-signals-logo.svg" 
              alt="Lab Signals"
              width={220}
              height={110}
              style={{ objectFit: 'contain', width: 'auto', height: '110px', maxHeight: '110px' }}
            />
          </div>
          
          <div>
            <p style={{ fontSize: '.9rem', color: '#000', lineHeight: 1.6, margin: 0 }}>
              {description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.8rem', color: '#000' }}>
                <IconFileText size={14} color="#000" />
                <span>Expert Analysis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.8rem', color: '#000' }}>
                <IconTarget size={14} color="#000" />
                <span>Actionable Insights</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.8rem', color: '#000' }}>
                <IconFlask size={14} color="#000" />
                <span>Full Archive Access</span>
              </div>
            </div>
          </div>

          <Link
            href="/lab-signals"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#fb0',
              color: '#000',
              borderRadius: '0',
              fontSize: '.9rem',
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            Subscribe Free
            <IconArrowRight size={16} color="#000" />
          </Link>
        </div>

        {showArticles && relatedArticles.length > 0 && (
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #fb0' }}>
            <p style={{ fontSize: '.85rem', color: '#000', marginBottom: '12px', fontWeight: 600 }}>Featured Articles:</p>
            {relatedArticles.slice(0, 3).map((article, idx) => (
              <Link
                key={idx}
                href={`/lab-signals#${article.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 0',
                  borderBottom: idx < 2 ? '1px solid #fb0' : 'none',
                  textDecoration: 'none',
                  color: '#000'
                }}
              >
                <IconFileText size={14} color="#000" />
                <span style={{ fontSize: '.85rem', flex: 1 }}>{article.title}</span>
                <IconArrowRight size={12} color="#000" />
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default banner variant
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '0',
      padding: '20px',
      border: '6px solid #fb0',
      transition: 'box-shadow 0.3s ease',
      cursor: 'pointer'
    }}
    className="hover:shadow-lg"
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: '32px',
        alignItems: 'end'
      }} className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto]">
        <div style={{ width: 'auto', height: '125px', maxHeight: '125px' }}>
          <Image 
            src="/images/lab-signals-logo.svg" 
            alt="Lab Signals"
            width={250}
            height={125}
            style={{ objectFit: 'contain', width: 'auto', height: '125px', maxHeight: '125px' }}
          />
        </div>
        
        <div>
          <h3 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#000',
            marginBottom: '12px',
            marginTop: 0
          }}>
            {title}
          </h3>
          <p style={{ fontSize: '.95rem', color: '#000', lineHeight: 1.6, marginBottom: 0 }}>
            {description}
          </p>
        </div>
        
        <Link
          href="/lab-signals"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            background: '#fb0',
            color: '#000',
            borderRadius: '0',
            fontSize: '1rem',
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Subscribe Free
          <IconArrowRight size={18} color="#000" />
        </Link>
      </div>
    </div>
  );
}
