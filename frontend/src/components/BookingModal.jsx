import React, { useEffect } from 'react';
import BookingForm from './BookingForm';

export default function BookingModal({ isOpen, onClose, selectedRoom = '' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="booking-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="booking-modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '30px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
        }}
      >
        <button 
          onClick={onClose} 
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333'
          }}
        >
          &times;
        </button>

        <div style={{ padding: '10px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <span style={{ color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>
              Ajara Nisarga Resort
            </span>
            <h2 style={{ color: 'var(--forest)', fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: '5px 0' }}>
              Book Your Nature Retreat
            </h2>
          </div>
          <BookingForm initialRoom={selectedRoom} />
        </div>
      </div>
    </div>
  );
}
