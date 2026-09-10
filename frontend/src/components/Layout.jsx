import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RouteAnimations from './RouteAnimations';
import { resortInfo } from '../data/resortInfo';
import BookingModal from './BookingModal';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll listener for sticky navbar background styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleMobile = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <RouteAnimations />

      {/* ===== NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container inner">
          <Link to="/" className="logo" aria-label="Ajara Nisarga Resort Home">
            <svg className="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--gold)' }}>
              <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2.5 1.5 7a7 7 0 0 1-7.5 9.5Z" />
              <path d="M11.5 13.5c3-1 5-3.5 6-7" />
            </svg>
            <span className="logo-text">
              <span className="text-gradient-gold">{resortInfo.name}</span>
            </span>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
            <Link to="/stay" className={pathname === '/stay' ? 'active' : ''}>Stay</Link>
            <Link to="/activities" className={pathname === '/activities' ? 'active' : ''}>Things To Do</Link>
            <Link to="/gallery" className={pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
            <Link to="/sightseeing" className={pathname === '/sightseeing' ? 'active' : ''}>Sightseeing</Link>
            <Link to="/review" className={pathname === '/review' ? 'active' : ''}>Reviews</Link>
            <Link to="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link>

            <button 
              onClick={() => setIsBookingModalOpen(true)} 
              className="book-btn btn-hover"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Book Stay
            </button>
            <Link to="/bookevent" className="book-btn btn-hover" style={{ background: 'var(--gold)', color: 'var(--forest-dark)' }}>
              Book Event
            </Link>
          </div>

          <button className="mobile-toggle" onClick={toggleMobile} aria-label="Toggle navigation menu">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
          <Link to="/" onClick={closeMobile}>Home</Link>
          <Link to="/about" onClick={closeMobile}>About</Link>
          <Link to="/stay" onClick={closeMobile}>Stay</Link>
          <Link to="/activities" onClick={closeMobile}>Things To Do</Link>
          <Link to="/gallery" onClick={closeMobile}>Gallery</Link>
          <Link to="/sightseeing" onClick={closeMobile}>Sightseeing</Link>
          <Link to="/review" onClick={closeMobile}>Guest Reviews</Link>
          <Link to="/contact" onClick={closeMobile}>Contact Us</Link>
          <button 
            onClick={() => { closeMobile(); setIsBookingModalOpen(true); }} 
            className="book-btn btn-hover"
            style={{ width: '80%', padding: '12px', border: 'none' }}
          >
            Book Stay
          </button>
          <Link to="/bookevent" className="book-btn btn-hover" onClick={closeMobile} style={{ width: '80%', padding: '12px', background: 'var(--gold)', color: 'var(--forest-dark)', textAlign: 'center' }}>
            Book Event / Package
          </Link>
        </div>
      </nav>

      {/* Main page content */}
      {children}

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="logo">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--gold)' }}>
              <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2.5 1.5 7a7 7 0 0 1-7.5 9.5Z" />
              <path d="M11.5 13.5c3-1 5-3.5 6-7" />
            </svg>
            <span><span className="text-gradient-gold">{resortInfo.name}</span></span>
          </div>

          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/stay">Rooms & Cottages</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/sightseeing">Local Sightseeing</Link>
            <Link to="/review">Reviews</Link>
            <Link to="/natureimpact">Nature Impact</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin" style={{ opacity: 0.6 }}>Admin Login</Link>
          </div>

          <p className="copy">
            © 2026 {resortInfo.name}. {resortInfo.tagline}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a 
        href={`https://wa.me/${resortInfo.whatsappNumber}?text=${encodeURIComponent(`Hello ${resortInfo.name}, I would like to enquire about a stay.`)}`}
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float btn-hover" 
        aria-label="Chat with Ajara Nisarga Resort on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="mobile-bottom-nav">
        <Link to="/"><span className="emoji">🏠</span><span className="label">Home</span></Link>
        <Link to="/stay"><span className="emoji">🏡</span><span className="label">Stay</span></Link>
        <Link to="/gallery"><span className="emoji">📷</span><span className="label">Gallery</span></Link>
        <Link to="/review"><span className="emoji">⭐</span><span className="label">Review</span></Link>
        <button 
          onClick={() => setIsBookingModalOpen(true)}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
        >
          <span className="emoji">📞</span><span className="label" style={{ color: 'var(--gold)', fontWeight: 700 }}>Book</span>
        </button>
      </nav>

      {/* Global Quick Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
}
