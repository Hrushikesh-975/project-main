import React, { useState } from 'react';
import Lightbox from '../components/Lightbox';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: 'resort3.jpeg', alt: 'Ajara Nisarga Resort panoramic view', category: 'Resort' },
    { src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80', alt: 'Ajara monsoon waterfalls', category: 'Nature' },
    { src: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80', alt: 'Forest cottage sit-out', category: 'Rooms' },
    { src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80', alt: 'Mountain trek & trail', category: 'Activities' },
    { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', alt: 'Birdwatching in misty morning', category: 'Nature' },
    { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', alt: 'Glamping tent stay', category: 'Rooms' },
    { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Treehouse in lush greenery', category: 'Rooms' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Hill fort landscape near Ajara', category: 'Nature' }
  ];

  const categories = ['All', 'Resort', 'Rooms', 'Nature', 'Activities'];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ===== GALLERY ===== */}
      <section id="gallery" className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag fade-up">Snapshots of Serenity</p>
          <h2 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ajara Nisarga Gallery
          </h2>
          <p className="section-desc fade-up" style={{ marginBottom: '2rem' }}>
            A glimpse into the natural beauty, cozy rooms, and quiet moments that await you.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 22px',
                  borderRadius: '50px',
                  border: '1px solid var(--forest)',
                  background: activeCategory === cat ? 'var(--forest)' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'var(--forest)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="gallery-grid fade-up">
            {filteredImages.map((img, index) => (
              <button 
                key={index} 
                className="gallery-item" 
                onClick={() => openLightbox(index)}
                aria-label={`View full image: ${img.alt}`}
                style={{ border: 'none', background: 'none', padding: 0, width: '100%', display: 'block' }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACCESSIBLE LIGHTBOX ===== */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filteredImages}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </main>
  );
}
