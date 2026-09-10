import React from 'react';
import { Link } from 'react-router-dom';
import { resortInfo } from '../data/resortInfo';

export default function Activities() {
  const activitiesList = [
    {
      title: 'Swimming Pool Refreshment',
      tag: 'Relaxation',
      description: 'Cool off in our clean swimming pool surrounded by greenery. Perfect for adults and kids alike.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
    },
    {
      title: 'Rain Dance with Music',
      tag: 'Group Fun',
      description: 'Enjoy energetic water rain dance setups with music, perfect for groups, families, and friends.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    },
    {
      title: 'Campfire & Starry Nights',
      tag: 'Evening Vibe',
      description: 'Gather around a warm evening campfire under clear starry skies with light music and hot tea.',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80'
    },
    {
      title: 'Birthday & Event Parties',
      tag: 'Celebration',
      description: 'Host your special occasions in a calm nature environment with fresh local food and dedicated setup.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'
    },
    {
      title: 'Wedding Ceremonies',
      tag: 'Destination',
      description: 'Plan intimate destination weddings on open green lawns surrounded by natural landscapes.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'
    },
    {
      title: 'Nature Walks & Birdwatching',
      tag: 'Explore',
      description: 'Stroll through our 4+ acre green grounds and observe native birds and butterflies in misty mornings.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
    }
  ];

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="stories-container" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-tag">Memories Await</p>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
              Things to Do at {resortInfo.name}
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
              Explore our range of leisure activities, pool fun, and peaceful outdoor experiences.
            </p>
          </div>

          <div className="card-grid cols-3" style={{ gap: '2rem' }}>
            {activitiesList.map((act, index) => (
              <div key={index} className="exp-card">
                <div className="img-wrap">
                  <img src={act.image} alt={act.title} loading="lazy" />
                </div>
                <div className="content">
                  <span className="story-tag" style={{ marginBottom: '10px', display: 'inline-block' }}>
                    {act.tag}
                  </span>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: 'var(--forest)', marginBottom: '8px' }}>
                    {act.title}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link 
              to="/contact" 
              className="btn-hover"
              style={{ display: 'inline-block', background: 'var(--forest)', color: '#fff', padding: '14px 35px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}
            >
              Plan Your Resort Trip
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
