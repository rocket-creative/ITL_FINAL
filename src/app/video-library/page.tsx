'use client';

/**
 * Video Library Page - ingenious targeting laboratory
 * Showcases educational and informational videos
 * Easy to add more videos - just add to the videosData array
 */

import { useState } from 'react';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  BreedingSchemeArchitectCTA,
  LabSignalsSignup,
} from '@/components/UXUIDC';
import {
  IconPlay,
  IconX,
  IconFileText,
  IconCalendar,
  IconMessageCircle,
} from '@/components/UXUIDC/Icons';

// ========== VIDEO DATA ==========
// Add new videos here - they'll automatically appear in the grid
// YouTube video IDs can be found in the URL: youtube.com/watch?v=VIDEO_ID
const videosData = [
  {
    id: 'itl-20-years',
    title: 'ingenious targeting laboratory - 20 Years of Innovation',
    description: 'Celebrating two decades of excellence in custom mouse model generation and gene targeting services.',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID', // Replace with actual YouTube video ID
    category: 'Company',
    featured: true,
  },
  {
    id: 'humanized-mice-intro',
    title: 'Introduction to Humanized Mice',
    description: 'An overview of humanized mouse models and their applications in biomedical research.',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    category: 'Technology',
    featured: true,
  },
  {
    id: 'mouse-generation-guide',
    title: 'Mouse Model Generation: Step-by-Step Guide',
    description: 'A comprehensive walkthrough of the mouse model generation process from design to delivery.',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    category: 'Educational',
    featured: true,
  },
  {
    id: 'humanized-checkpoint',
    title: 'Humanized Immune Checkpoint Models',
    description: 'Explore our humanized immune checkpoint mouse models for immuno-oncology research.',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    category: 'Technology',
    featured: false,
  },
  {
    id: 'raghu-mirmira-story',
    title: "Raghu Mirmira's Ingenious Story",
    description: 'Hear from Dr. Raghu Mirmira about his experience working with ingenious targeting laboratory.',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    category: 'Testimonial',
    featured: false,
  },
  {
    id: 'custom-animal-models',
    title: 'Custom Animal Models',
    description: 'Overview of our custom animal model services including mouse, rat, and rabbit models.',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    category: 'Services',
    featured: false,
  },
];

// Get unique categories
const categories = ['All', ...Array.from(new Set(videosData.map(v => v.category)))];

export default function VideoLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<typeof videosData[0] | null>(null);

  const filteredVideos = selectedCategory === 'All' 
    ? videosData 
    : videosData.filter(v => v.category === selectedCategory);

  const featuredVideos = videosData.filter(v => v.featured);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '70px 20px 50px',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1
            style={{
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.25rem',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            Video Library
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--system-ui)',
              fontSize: '1rem',
              fontWeight: 400,
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Explore our collection of educational videos about mouse model generation, 
            gene targeting technologies, and research applications.
          </p>
        </div>
      </section>

      {/* Featured Videos Section */}
      {featuredVideos.length > 0 && (
        <section style={{ padding: '50px 20px 30px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '24px',
              }}
            >
              Featured Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVideos.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onPlay={() => setActiveVideo(video)}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section style={{ padding: '30px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px',
              marginBottom: '30px',
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedCategory === category ? '#008080' : 'white',
                  color: selectedCategory === category ? 'white' : '#4b5563',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: selectedCategory === category ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* All Videos Grid */}
          <h2
            style={{
              color: '#0a253c',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '24px',
            }}
          >
            {selectedCategory === 'All' ? 'All Videos' : selectedCategory}
            <span style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 400, marginLeft: '10px' }}>
              ({filteredVideos.length})
            </span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredVideos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onPlay={() => setActiveVideo(video)}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: '#6b7280', fontFamily: 'var(--system-ui)', fontSize: '.95rem' }}>
                No videos found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Breeding Scheme Architect CTA */}
      <BreedingSchemeArchitectCTA variant="light" />

      {/* CTA Section */}
      <section style={{ backgroundColor: 'white', padding: '50px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div 
            style={{ 
              backgroundColor: '#0a253c', 
              borderRadius: '16px', 
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              Ready to Start Your Project?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'var(--system-ui)',
                fontSize: '.95rem',
                marginBottom: '24px',
                maxWidth: '500px',
                margin: '0 auto 24px',
              }}
            >
              Our scientific consultants are available to discuss your mouse model requirements.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link
                href="/request-quote"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                <IconFileText size={18} />
                Request a Quote
              </Link>
              <Link
                href="/schedule-meeting"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: '2px solid white',
                  textDecoration: 'none',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                <IconCalendar size={18} />
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Signals Newsletter */}
      <section style={{ backgroundColor: '#f8f9fa', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <LabSignalsSignup 
            variant="banner"
            title="Stay Informed with Lab Signals"
            description="Get the latest research breakthroughs, technical guides, and expert insights delivered directly to your inbox. Join researchers worldwide who rely on Lab Signals for cutting-edge knowledge."
          />
        </div>
      </section>

      {/* Subscribe Section */}
      <section style={{ backgroundColor: 'white', padding: '50px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              color: '#0a253c',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            Subscribe for Updates
          </h2>
          <p
            style={{
              color: '#6b7280',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              marginBottom: '20px',
            }}
          >
            Be the first to know when we release new educational videos and content.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.youtube.com/@ingeniouslab"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FF0000',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontFamily: 'var(--system-ui)',
                fontSize: '.9rem',
                fontWeight: 500,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
            <Link
              href="/lab-signals"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                color: '#0a253c',
                padding: '12px 20px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                textDecoration: 'none',
                fontFamily: 'var(--system-ui)',
                fontSize: '.9rem',
                fontWeight: 500,
              }}
            >
              <IconMessageCircle size={18} />
              Read Lab Signals Newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
      </main>

      <UXUIDCFooter />
    </div>
  );
}

// ========== VIDEO CARD COMPONENT ==========
function VideoCard({ 
  video, 
  onPlay, 
  featured = false 
}: { 
  video: typeof videosData[0]; 
  onPlay: () => void;
  featured?: boolean;
}) {
  return (
    <div
      onClick={onPlay}
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          backgroundColor: '#1a1a2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* YouTube Thumbnail (when ID is available) */}
        {video.youtubeId && video.youtubeId !== 'REPLACE_WITH_YOUTUBE_ID' ? (
          // eslint-disable-next-line @next/next/no-img-element -- External YouTube thumbnail
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
            alt={video.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: 'rgba(255,255,255,0.5)',
          }}>
            <IconPlay size={40} />
            <span style={{ fontSize: '.7rem', marginTop: '8px' }}>Video</span>
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div
          className="group-hover:scale-110 transition-transform duration-300"
          style={{
            position: 'absolute',
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(0,128,128,0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconPlay size={24} color="white" style={{ marginLeft: '3px' }} />
        </div>

        {/* Category Badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '.7rem',
            fontFamily: 'var(--system-ui)',
            fontWeight: 500,
          }}
        >
          {video.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: featured ? '20px' : '16px' }}>
        <h3
          style={{
            color: '#0a253c',
            fontFamily: 'Poppins, sans-serif',
            fontSize: featured ? '1rem' : '.9rem',
            fontWeight: 600,
            marginBottom: '8px',
            lineHeight: '1.3',
          }}
        >
          {video.title}
        </h3>
        <p
          style={{
            color: '#6b7280',
            fontFamily: 'var(--system-ui)',
            fontSize: '.8rem',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.description}
        </p>
      </div>
    </div>
  );
}

// ========== VIDEO MODAL COMPONENT ==========
function VideoModal({ 
  video, 
  onClose 
}: { 
  video: typeof videosData[0]; 
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '44px',
          height: '44px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <IconX size={24} color="white" />
      </button>

      {/* Video Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1000px',
          backgroundColor: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {video.youtubeId && video.youtubeId !== 'REPLACE_WITH_YOUTUBE_ID' ? (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        ) : (
          <div
            style={{
              aspectRatio: '16/9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
              padding: '40px',
            }}
          >
            <IconPlay size={60} color="#008080" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.25rem', marginBottom: '8px' }}>
              {video.title}
            </h3>
            <p style={{ fontFamily: 'var(--system-ui)', fontSize: '.9rem', color: '#9ca3af' }}>
              Video coming soon. Replace the YouTube ID in the code to enable playback.
            </p>
          </div>
        )}
        
        {/* Video Info */}
        <div style={{ padding: '20px', backgroundColor: '#111' }}>
          <h3
            style={{
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            {video.title}
          </h3>
          <p
            style={{
              color: '#9ca3af',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              lineHeight: '1.5',
            }}
          >
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
