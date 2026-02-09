/**
 * |UXUIDC| Resource Links Component
 * Displays contextual links to downloadable resources, guides, and tools
 */

import Link from 'next/link';
import { IconDownload, IconBookOpen, IconGitBranch, IconFileText, IconChevronRight, IconBarChart } from './Icons';

interface ResourceLink {
  title: string;
  description: string;
  href: string;
  type: 'chart' | 'guide' | 'whitepaper' | 'tool' | 'internal';
  isNew?: boolean;
}

interface ResourceLinksSectionProps {
  title?: string;
  description?: string;
  resources: ResourceLink[];
  variant?: 'inline' | 'card' | 'banner';
  className?: string;
}

const getIcon = (type: ResourceLink['type']) => {
  switch (type) {
    case 'chart':
      return <IconBarChart size={20} color="#008080" />;
    case 'guide':
      return <IconBookOpen size={20} color="#008080" />;
    case 'whitepaper':
      return <IconFileText size={20} color="#008080" />;
    case 'tool':
      return <IconGitBranch size={20} color="#008080" />;
    case 'internal':
      return <IconBookOpen size={20} color="#008080" />;
    default:
      return <IconDownload size={20} color="#008080" />;
  }
};

export default function UXUIDCResourceLinks({
  title = "Additional Resources",
  description,
  resources,
  variant = 'card',
  className = ''
}: ResourceLinksSectionProps) {
  if (variant === 'inline') {
    return (
      <div className={`resource-links-inline ${className}`} style={{
        background: 'linear-gradient(135deg, rgba(0,128,128,0.05) 0%, rgba(0,128,128,0.1) 100%)',
        borderLeft: '4px solid #008080',
        borderRadius: '0 8px 8px 0',
        padding: '20px 24px',
        marginTop: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <IconBookOpen size={24} color="#008080" />
          <div>
            <h4 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '8px',
              marginTop: 0
            }}>
              {title}
            </h4>
            {description && (
              <p style={{
                fontSize: '.9rem',
                color: '#666',
                marginBottom: '12px',
                lineHeight: 1.6
              }}>
                {description}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {resources.map((resource, idx) => {
                const isExternal = resource.href.startsWith('http');
                const LinkComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal ? { 
                  href: resource.href, 
                  target: '_blank', 
                  rel: 'noopener noreferrer' 
                } : { href: resource.href };

                return (
                  <LinkComponent
                    key={idx}
                    {...linkProps}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '.85rem',
                      fontWeight: 500,
                      color: '#008080',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {getIcon(resource.type)}
                    {resource.title}
                    {resource.isNew && (
                      <span style={{
                        fontSize: '.65rem',
                        background: '#008080',
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        New
                      </span>
                    )}
                    <IconChevronRight size={14} color="#008080" />
                  </LinkComponent>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`resource-links-banner ${className}`} style={{
        background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
        borderRadius: '12px',
        padding: '32px',
        marginTop: '40px',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,212,0.15) 0%, transparent 70%)'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '12px',
            marginTop: 0
          }}>
            {title}
          </h3>
          {description && (
            <p style={{
              fontSize: '.9rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '20px',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              {description}
            </p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {resources.map((resource, idx) => {
              const isExternal = resource.href.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal ? { 
                href: resource.href, 
                target: '_blank', 
                rel: 'noopener noreferrer' 
              } : { href: resource.href };

              return (
                <LinkComponent
                  key={idx}
                  {...linkProps}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    background: resource.type === 'tool' ? '#008080' : 'rgba(255,255,255,0.1)',
                    border: resource.type === 'tool' ? 'none' : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    fontSize: '.9rem',
                    fontWeight: 500,
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {getIcon(resource.type)}
                  {resource.title}
                  {resource.isNew && (
                    <span style={{
                      fontSize: '.65rem',
                      background: '#00d4d4',
                      color: '#0a253c',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      New
                    </span>
                  )}
                  <IconChevronRight size={14} color="#ffffff" />
                </LinkComponent>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={`resource-links-card ${className}`} style={{
      background: '#f7f7f7',
      borderRadius: '12px',
      padding: '28px',
      marginTop: '40px',
      marginBottom: '40px',
      borderTop: '4px solid #008080'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(0,128,128,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconDownload size={24} color="#008080" />
        </div>
        <div>
          <h3 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#333',
            margin: 0
          }}>
            {title}
          </h3>
          {description && (
            <p style={{
              fontSize: '.85rem',
              color: '#666',
              margin: '4px 0 0 0'
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gap: '12px' }}>
        {resources.map((resource, idx) => {
          const isExternal = resource.href.startsWith('http');
          const LinkComponent = isExternal ? 'a' : Link;
          const linkProps = isExternal ? { 
            href: resource.href, 
            target: '_blank', 
            rel: 'noopener noreferrer' 
          } : { href: resource.href };

          return (
            <LinkComponent
              key={idx}
              {...linkProps}
              className="hover-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {getIcon(resource.type)}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '.95rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {resource.title}
                  {resource.isNew && (
                    <span style={{
                      fontSize: '.65rem',
                      background: '#008080',
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      New
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: '.85rem',
                  color: '#666',
                  lineHeight: 1.5
                }}>
                  {resource.description}
                </div>
              </div>
              <IconChevronRight size={18} color="#008080" />
            </LinkComponent>
          );
        })}
      </div>
    </div>
  );
}

// Pre-defined resource collections for common use cases
export const conditionalKnockoutResources: ResourceLink[] = [
  {
    title: "Conditional Knockout Comparison Chart",
    description: "Compare different conditional knockout strategies and configurations",
    href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/2019%20Images/Conditional%20Knockout%20Comparison%20Chart.jpg",
    type: 'chart'
  },
  {
    title: "Conditional Knockout Quick Guide",
    description: "Step-by-step guide to conditional knockout project planning",
    href: "https://go.genetargeting.com/conditional-ko-quick-guide",
    type: 'guide'
  },
  {
    title: "Cre-lox Design Guide",
    description: "Comprehensive guide to Cre-lox system design and implementation",
    href: "https://go.genetargeting.com/crelox-design-guide",
    type: 'guide'
  }
];

export const humanizationResources: ResourceLink[] = [
  {
    title: "Humanization Comparison Chart",
    description: "Compare humanization strategies and approaches",
    href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/2021%20Images/Humanization%20Comparison%20Chart-1.jpg",
    type: 'chart'
  },
  {
    title: "Humanization White Paper",
    description: "In-depth technical guide to mouse model humanization",
    href: "https://go.genetargeting.com/humanization-white-paper",
    type: 'whitepaper'
  }
];

export const pointMutationResources: ResourceLink[] = [
  {
    title: "Point Mutation Comparison Chart",
    description: "Compare point mutation strategies and design considerations",
    href: "https://go.genetargeting.com/point-mutation-chart",
    type: 'chart'
  }
];

export const reporterResources: ResourceLink[] = [
  {
    title: "Enhance With A Reporter Quick Guide",
    description: "Add reporter functionality to your mouse model",
    href: "https://go.genetargeting.com/reporter-quick-guide-0",
    type: 'guide'
  }
];

export const rosa26Resources: ResourceLink[] = [
  {
    title: "Rapid-Rosa26™ Quick Guide",
    description: "Fast Rosa26 targeting with our proprietary technology",
    href: "https://go.genetargeting.com/rapid-rosa26-quick-guide",
    type: 'guide'
  }
];

export const ratModelResources: ResourceLink[] = [
  {
    title: "Rat Model Quick Guide",
    description: "Guide to custom rat model generation",
    href: "https://go.genetargeting.com/rat-model-technology-guide",
    type: 'guide'
  },
  {
    title: "Rats For Tissue-Specific Gene Knockout",
    description: "White paper on tissue-specific gene knockout in rats",
    href: "https://go.genetargeting.com/rat-tissue-specific-white-paper",
    type: 'whitepaper'
  }
];

export const creResources: ResourceLink[] = [
  {
    title: "Cre-lox Design Guide",
    description: "Comprehensive guide to Cre-lox system design",
    href: "https://go.genetargeting.com/crelox-design-guide",
    type: 'guide'
  },
  {
    title: "Cre Mouse Repositories",
    description: "Find Cre-expressing mouse lines for your research",
    href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/2020%20Images/Cre%20Mouse%20Repositories.pdf",
    type: 'guide'
  }
];

export const breedingResources: ResourceLink[] = [
  {
    title: "Breeding Scheme Architect",
    description: "Plan complex multi-allele breeding schemes with our interactive tool",
    href: "/breeding-scheme-architect",
    type: 'tool'
  }
];

export const pricingResources: ResourceLink[] = [
  {
    title: "ingenious Pricing Guide",
    description: "Overview of project pricing and package options",
    href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/Pricing%20Guide%202024.pdf",
    type: 'guide'
  }
];

export const conditionalReversibleResources: ResourceLink[] = [
  {
    title: "Conditional + Reversible Mouse Model Guide",
    description: "Design inducible and reversible conditional models",
    href: "https://go.genetargeting.com/conditional-reversible-guide",
    type: 'guide'
  },
  {
    title: "Breeding Scheme Architect",
    description: "Plan your breeding strategy with our interactive tool",
    href: "/breeding-scheme-architect",
    type: 'tool'
  }
];
