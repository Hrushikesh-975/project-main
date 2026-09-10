import React, { useEffect } from 'react';

export default function Lightbox({ images = [], currentIndex = 0, isOpen = false, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div 
      className="lightbox open" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      <button 
        className="close-btn" 
        onClick={onClose} 
        aria-label="Close image lightbox"
      >
        &times;
      </button>

      {/* Navigation - Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          &#10094;
        </button>
      )}

      {/* Main Image View */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ textAlign: 'center', maxWidth: '90vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img 
          src={currentImg.src} 
          alt={currentImg.alt || 'Ajara Nisarga Resort photo'} 
          style={{ maxHeight: '75vh', maxWidth: '100%', objectFit: 'contain', borderRadius: '15px' }}
        />
        <div style={{ color: '#fff', marginTop: '15px', display: 'flex', gap: '15px', alignItems: 'center', fontSize: '0.9rem' }}>
          <span>{currentImg.alt}</span>
          <span style={{ opacity: 0.6 }}>({currentIndex + 1} of {images.length})</span>
        </div>
      </div>

      {/* Navigation - Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          &#10095;
        </button>
      )}
    </div>
  );
}
