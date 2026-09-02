'use client';

/**
 * |UXUIDC| Navigation Component - Matches Screenshot Exactly
 * @version 2.1.0
 * Layout: Logo | Search (teal) | Nav Items | Start an Order | Start Your Project (grey)
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavbarSearch } from './NavbarSearch';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  categorizedChildren?: {
    categories: {
      title: string;
      items: NavItem[];
    }[];
  };
}

// Complete Navigation Structure - Redesigned February 2026
const navigationItems: NavItem[] = [
  {
    label: 'Model Generation',
    href: '/custom-mouse-models',
    categorizedChildren: {
      categories: [
        {
          title: 'Mouse Knockout',
          items: [
            { label: 'Knockout Overview', href: '/knockout-mouse-models' },
            { label: 'Conventional Knockout', href: '/conventional-knockout-mouse-models' },
            { label: 'Conditional Knockout', href: '/conditional-knockout-mouse-models' },
            { label: 'Tissue Specific Knockout', href: '/tissue-specific-knockout' },
            { label: 'Inducible Knockout', href: '/inducible-conditional-knockout' },
          ],
        },
        {
          title: 'Mouse Knockin',
          items: [
            { label: 'Knockin Overview', href: '/knockin-mouse-models' },
            { label: 'cDNA Knockin', href: '/cdna-knockin' },
            { label: 'Point Mutation', href: '/point-mutation-mice' },
            { label: 'Reporter Knockin', href: '/reporter-knockin' },
            { label: 'GFP Knockin', href: '/gfp-knockin-mice' },
            { label: 'LacZ Knockin', href: '/lacz-knockin-mice' },
            { label: 'tdTomato Knockin', href: '/tdtomato-knockin-mice' },
            { label: 'Tag Knockin', href: '/tag-knockin-mice' },
            { label: 'Conditional Knockin', href: '/conditional-knockin-mice' },
          ],
        },
        {
          title: 'Other Species',
          items: [
            { label: 'Humanized Mice', href: '/humanized-mouse-models' },
            { label: 'Transgenic Mice', href: '/transgenic-mouse-service' },
            { label: 'Gene Replacement', href: '/gene-replacement' },
            { label: 'Rat Models', href: '/rat-models' },
            { label: 'Rabbit Models', href: '/custom-rabbit-models' },
          ],
        },
      ],
    },
  },
  {
    label: 'Catalog Models',
    href: '/catalog-mouse-models',
    categorizedChildren: {
      categories: [
        {
          title: 'All Models',
          items: [
            { label: 'All Catalog Models', href: '/all-catalog-mouse-models' },
            { label: 'Order Catalog Models', href: '/order-catalog-models' },
          ],
        },
        {
          title: 'Featured Model',
          items: [
            { label: 'Featured Model of the Month', href: '/featured-model' },
          ],
        },
        {
          title: 'Single Checkpoint',
          items: [
            { label: 'All Single Checkpoint', href: '/single-checkpoint-mice' },
            { label: 'PD1 Humanized', href: '/pd1-humanized-mice' },
            { label: 'PDL1 Humanized', href: '/pdl1-humanized-mice' },
            { label: 'CTLA4 Humanized', href: '/ctla4-humanized-mice' },
            { label: 'LAG3 Humanized', href: '/lag3-humanized-mice' },
            { label: 'TIM3 Humanized', href: '/tim3-humanized-mice' },
          ],
        },
        {
          title: 'Double Checkpoint',
          items: [
            { label: 'Double Checkpoint', href: '/double-checkpoint-mice' },
          ],
        },
        {
          title: 'Disease Models',
          items: [
            { label: 'Disease Model Catalog', href: '/disease-model-catalog' },
            { label: 'Syngeneic Tumors', href: '/syngeneic-tumor-models' },
          ],
        },
      ],
    },
  },
  {
    label: 'Therapeutic Areas',
    href: '/therapeutic-areas',
    categorizedChildren: {
      categories: [
        {
          title: 'Oncology',
          items: [
            { label: 'Oncology', href: '/oncology-mouse-models' },
            { label: 'Immuno Oncology', href: '/immuno-oncology-mouse-models' },
          ],
        },
        {
          title: 'Neuroscience',
          items: [
            { label: 'Neuroscience', href: '/neuroscience-mouse-models' },
            { label: "Alzheimer's", href: '/alzheimers-mouse-models' },
            { label: "Parkinson's", href: '/parkinsons-mouse-models' },
            { label: 'ALS', href: '/als-mouse-models' },
          ],
        },
        {
          title: 'Cardiovascular',
          items: [
            { label: 'Cardiovascular', href: '/cardiovascular-mouse-models' },
            { label: 'Heart Failure', href: '/heart-failure-mouse-models' },
          ],
        },
        {
          title: 'Immunology',
          items: [
            { label: 'Immunology', href: '/immunology-mouse-models' },
            { label: 'Autoimmune', href: '/autoimmune-disease-mice' },
            { label: 'Lupus', href: '/lupus-mouse-models' },
            { label: 'IBD', href: '/ibd-mouse-models' },
          ],
        },
        {
          title: 'Metabolic',
          items: [
            { label: 'Metabolic Disease', href: '/metabolic-disease-mouse-models' },
            { label: 'Diabetes', href: '/diabetes-mouse-models' },
            { label: 'NASH MASH', href: '/nash-mash-mouse-models' },
          ],
        },
        {
          title: 'Other',
          items: [
            { label: 'Rare Disease', href: '/rare-disease-mouse-models' },
            { label: 'Ophthalmology', href: '/ophthalmology-mouse-models' },
          ],
        },
      ],
    },
  },
  {
    label: 'Technology',
    href: '/technologies',
    categorizedChildren: {
      categories: [
        {
          title: 'Core Systems',
          items: [
            { label: 'Technology Overview', href: '/technology-overview' },
            { label: 'Cre Lox System', href: '/cre-lox-system' },
            { label: 'Flp Frt System', href: '/flp-frt-system' },
            { label: 'Rosa26 Targeting', href: '/rosa26' },
            { label: 'Inducible Expression', href: '/inducible-gene-expression' },
            { label: 'BAC to BAC Targeting', href: '/bac-to-bac-large-scale-targeting' },
          ],
        },
        {
          title: 'Planning Guides',
          items: [
            { label: 'Cre Line Selection', href: '/cre-line-selection-guide' },
            { label: 'Conditional vs Conventional', href: '/conditional-vs-conventional-guide' },
            { label: 'Critical Exon Selection', href: '/critical-exon-selection' },
            { label: 'LoxP Site Design', href: '/loxp-site-design' },
            { label: 'Strain Backgrounds', href: '/mouse-strain-backgrounds' },
          ],
        },
      ],
    },
  },
  {
    label: 'Services',
    href: '/mouse-model-services',
    categorizedChildren: {
      categories: [
        {
          title: 'Breeding and Cohorts',
          items: [
            { label: 'Contract Breeding Services', href: '/mouse-breeding-services' },
            { label: 'Cohort Development', href: '/mouse-cohort-development' },
            { label: 'Conditional KO Breeding', href: '/conditional-knockout-cohort-breeding' },
            { label: 'Backcrossing', href: '/backcrossing-services' },
          ],
        },
        {
          title: 'Model Creation',
          items: [
            { label: 'Model Generation Projects', href: '/custom-projects' },
            { label: 'Support Services', href: '/support-services' },
            { label: 'Post Project Services', href: '/post-project-services' },
          ],
        },
        {
          title: 'Colony Management',
          items: [
            { label: 'Colony Management', href: '/colony-management-services' },
            { label: 'Cryopreservation', href: '/cryopreservation-services' },
            { label: 'Rederivation', href: '/rederivation-services' },
            { label: 'Speed Breeding', href: '/speed-expansion-breeding' },
          ],
        },
        {
          title: 'Analysis',
          items: [
            { label: 'Preclinical Services', href: '/preclinical-services' },
            { label: 'Phenotyping Services', href: '/phenotyping-services' },
            { label: 'Mouse Genotyping', href: '/mouse-genotyping-service' },
          ],
        },
      ],
    },
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Downloadables', href: '/resources' },
      { label: 'Ingenious Blog', href: '/ingenious-blog' },
      { label: 'Researcher Spotlight', href: '/researcher-spotlight' },
      { label: 'Lab Signals Newsletter', href: '/lab-signals' },
      { label: 'Breeding Scheme Architect', href: '/breeding-scheme-architect' },
      { label: 'In House vs Outsourced Breeding', href: '/in-house-vs-outsourced-mouse-breeding' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'All FAQs', href: '/faq' },
    ],
  },
  {
    label: 'About',
    href: '/about-itl',
    children: [
      { label: 'Why Choose Us', href: '/why-choose-itl' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Careers', href: '/current-openings' },
    ],
  },
  {
    label: 'Publications',
    href: '/publications',
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Request Quote', href: '/request-quote' },
      { label: 'Order Catalog Models', href: '/order-catalog-models' },
      { label: 'Schedule Meeting', href: '/schedule-meeting' },
    ],
  },
];

export function UXUIDCNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (activeDropdown && navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Animation removed - using CSS animations instead of GSAP
  // No useEffect needed, no DOM manipulation, no cleanup issues

  const handleKeyDown = (e: React.KeyboardEvent, itemLabel: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveDropdown(activeDropdown === itemLabel ? null : itemLabel);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveDropdown(itemLabel);
        setTimeout(() => {
          const firstLink = dropdownRef.current?.querySelector('a');
          firstLink?.focus();
        }, 0);
      }
    }
  };

  return (
    <>
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:p-4 focus:z-[100] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
      >
        Skip to main content
      </a>

      <header className="w-full bg-white">
      <nav ref={navRef} className="w-full z-50 sticky top-0 bg-white border-b border-gray-100" aria-label="Main navigation">
        {/* All rows inside main wrapper so dropdown never overflows */}
        <div className="container px-4 sm:px-6 lg:px-8">
        {/* Row 1: Logo, Search, Input, CTAs */}
        <div>
            <div className="flex items-center justify-end gap-0 pt-3.5 pb-2 sm:pt-4 sm:pb-3">
              {/* Logo - auto, pushed left */}
              <Link href="/" className="mr-auto shrink-0 pt-0.5" aria-label="Home">
                <Image
                  src="/images/logo.png"
                  alt="Ingenious targeting laboratory"
                  width={224}
                  height={54}
                  className="h-auto w-[148px] sm:w-[180px] lg:w-[224px]"
                  priority
                />
              </Link>

              {/* Search Button - Blue with animation */}
              <Link
                href="/search"
                className="group hidden lg:flex items-center gap-1.5 text-white px-5 py-1 mr-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 rounded-sm"
                style={{ backgroundColor: '#134978', fontWeight: 400 }}
              >
                <span>Search</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>

              {/* Search Input Field - Unified catalog + site search with dropdown */}
              <div className="hidden lg:block xl:w-[250px] lg:w-[180px] xl:mr-[100px] lg:mr-5">
                <NavbarSearch
                  id="desktop-search"
                  placeholder="model or site"
                  className="w-full"
                  inputClassName="border border-[#e0e0e0] bg-white h-8 w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors duration-300 rounded-sm"
                />
              </div>

              {/* Start an Order - White/rev button with animation */}
              <Link 
                href="/request-quote"
                className="group hidden lg:flex items-center gap-1.5 bg-white text-[#666] px-4 py-1 border border-black text-sm transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 rounded-sm"
                style={{ fontFamily: 'var(--system-ui)', fontWeight: 400 }}
              >
                <span>Start an Order</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>

              {/* Pricing Guide - Solid grey button with animation */}
              <Link 
                href="/start-your-project" 
                className="group hidden lg:flex items-center gap-1.5 bg-[#666] text-white px-4 py-1 ml-2 text-sm transition-all duration-300 hover:bg-[#555] hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 rounded-sm"
                style={{ fontFamily: 'var(--system-ui)', fontWeight: 400 }}
              >
                <span>Pricing Guide</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-[#333] ml-auto focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
                  <span className={`w-full h-0.5 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`w-full h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>
        </div>

        {/* Row 2: Nav links with individual dropdowns positioned under each link */}
        <div
          className="hidden lg:block"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="flex items-center justify-end gap-5 xl:gap-7 h-9">
            {navigationItems.map((item) => {
              const hasDropdown = !!(item.children || item.categorizedChildren);
              const isDropdownOpen = activeDropdown === item.label;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasDropdown) {
                      setActiveDropdown(item.label);
                    } else {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-[#333] hover:text-teal-600 transition-colors duration-300 flex items-center gap-0.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 rounded-sm"
                    style={{ fontFamily: 'var(--system-ui)', fontWeight: 450 }}
                    aria-expanded={hasDropdown ? isDropdownOpen : undefined}
                    aria-haspopup={hasDropdown ? 'true' : undefined}
                    onKeyDown={(e) => handleKeyDown(e, item.label, hasDropdown)}
                  >
                    {item.label}
                    {hasDropdown && (
                      <svg className={`w-2 h-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown positioned directly under this nav link */}
                  {isDropdownOpen && (item.categorizedChildren || item.children) ? (
                    <div
                      ref={dropdownRef}
                      className="absolute left-0 top-full mt-0 bg-white shadow-lg border border-gray-200 z-50 animate-fadeIn max-h-[calc(100vh-200px)] overflow-y-auto"
                      role="menu"
                      aria-label={`${item.label} menu`}
                    >
                      <div className="py-2 px-4">
                        {item.categorizedChildren ? (
                          <div className="flex flex-col">
                            {item.categorizedChildren.categories.flatMap((category) =>
                              category.items.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  role="menuitem"
                                  className="text-[#666] hover:text-teal-600 hover:bg-gray-50 py-1 px-2 text-[13px] whitespace-nowrap rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-gray-50"
                                  style={{ fontFamily: 'var(--system-ui)', fontWeight: 400 }}
                                >
                                  {child.label}
                                </Link>
                              ))
                            )}
                          </div>
                        ) : item.children ? (
                          <div className="flex flex-col">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                className="text-[#666] hover:bg-gray-50 hover:text-teal-600 py-1 px-2 text-[13px] whitespace-nowrap rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-gray-50"
                                style={{ fontFamily: 'var(--system-ui)', fontWeight: 400 }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        </div>
      </nav>

        {/* Announcement bar - scrolls away on mobile so it does not cover hero content */}
        <div className="w-full flex justify-center items-center py-1.5 sm:py-2 px-4" style={{ backgroundColor: '#008080' }}>
          <Link href="/contact" className="text-center">
            {/* Mobile: single line */}
            <span className="block sm:hidden text-[11px] leading-snug" style={{ fontFamily: 'var(--system-ui)', color: 'white', fontWeight: 600 }}>
              Uncertain NIH funding? <span className="font-semibold">Start now, pay later.</span>
            </span>
            {/* Tablet+ : Full version */}
            <span className="hidden sm:block text-xs leading-relaxed" style={{ fontFamily: 'var(--system-ui)', color: 'white', fontWeight: 600 }}>
              Is uncertain NIH funding holding you back from starting a much needed mouse model project? <span className="font-semibold">We have ways for you to start your project now and pay later.</span>
            </span>
          </Link>
        </div>

        {/* Mobile Menu - with all sub-links */}
        {isOpen ? (
          <div className="container px-4 sm:px-6 lg:px-8">
            <div id="mobile-menu" className="lg:hidden bg-white border-t max-h-[calc(100vh-120px)] overflow-y-auto" role="dialog" aria-label="Mobile navigation menu">
              <div className="py-4">
                {/* Mobile Search - compact (form submit to /search) */}
                <div className="mb-4">
                  <NavbarSearch
                    id="mobile-search"
                    placeholder="model or site"
                    compact
                    className="w-full"
                    inputClassName="w-full px-3 py-2 border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                  />
                </div>
                <nav aria-label="Mobile menu">
                  <ul className="space-y-0">
                    {navigationItems.map((item) => (
                      <li key={item.href}>
                        {/* Parent link */}
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-sm text-[#0a253c] font-semibold hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 rounded-sm"
                        >
                          {item.label}
                        </Link>
                        {/* Child links - show all sub-pages */}
                        {item.categorizedChildren && (
                          <ul className="pl-4 pb-2">
                            {item.categorizedChildren.categories.flatMap((category) =>
                              category.items.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-1.5 text-sm text-[#666] hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-sm whitespace-nowrap"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))
                            )}
                          </ul>
                        )}
                        {item.children && (
                          <ul className="pl-4 pb-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-1.5 text-sm text-[#666] hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-sm whitespace-nowrap"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <Link
                  href="/request-quote"
                  onClick={() => setIsOpen(false)}
                  className="block mt-4 text-white text-center py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 rounded-sm"
                  style={{ backgroundColor: 'teal' }}
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

export default UXUIDCNavigation;
