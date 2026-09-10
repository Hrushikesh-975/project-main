import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resortInfo } from '../data/resortInfo';
import { roomsData } from '../data/roomsData';
import BookingModal from '../components/BookingModal';

export default function Home() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleOpenBooking = (roomName = '') => {
    setSelectedRoom(roomName);
    setBookingModalOpen(true);
  };

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <img 
          src="https://content3.jdmagicbox.com/v2/comp/kolhapur/a8/0231px231.x231.240506014916.f1a8/catalogue/ajara-nisarge-resort-pethewadi-kolhapur-home-stay-ER7B5Bd59a.jpg" 
          alt="Ajara Nisarga Resort surrounded by lush green forest in Pethewadi, Ajara" 
          className="hero-bg"
          fetchPriority="high" 
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-leaf fade-up">
            <svg className="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--gold)' }}>
              <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2.5 1.5 7a7 7 0 0 1-7.5 9.5Z" />
              <path d="M11.5 13.5c3-1 5-3.5 6-7" />
            </svg>
            <span className="text-gold tracking-wide uppercase text-xs">{resortInfo.tagline}</span>
          </div>
          <h1 className="fade-up">
            Ajara Nisarga<br /><span className="subtitle text-gradient-gold">Resort</span>
          </h1>
          <p className="hero-desc fade-up">
            {resortInfo.subTagline}
          </p>
          <div className="hero-btns fade-up">
            <button 
              onClick={() => handleOpenBooking()} 
              className="primary-btn btn-hover"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Check Availability
            </button>
            <Link to="/stay" className="outline-btn btn-hover">Explore Cottages</Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="arrow">&#8964;</div>
        </div>
      </section>

      {/* ===== ABOUT STORY ===== */}
      <section id="about" className="section-padding bg-section-fade">
        <div className="container">
          <div className="about-flex-container">
            <div className="reveal" style={{ flex: '0 1 350px', width: '100%', maxWidth: '350px' }}>
              <div style={{ position: 'relative', paddingBottom: '177.77%', height: 0, overflow: 'hidden', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', background: '#000' }}>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  poster="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&q=80"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src="resort1.mp4" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </div>
            </div>

            <div className="about-text-wrap reveal">
              <p className="section-tag">Our Story</p>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif" }}>
                Peaceful Green Retreat in Ajara
              </h2>
              <p className="about-description">
                Located near Parewadi and Pethewadi, <strong>{resortInfo.name}</strong> offers a peaceful retreat surrounded by greenery, mountain air, and village warmth. It is an ideal place for a relaxing weekend getaway with family and friends.
              </p>
              <div className="about-stats-grid">
                <div className="stat-item">
                  <strong>4+ Acres</strong>
                  <span>Lush Greenery</span>
                </div>
                <div className="stat-item">
                  <strong>100%</strong>
                  <span>Eco-Friendly Practices</span>
                </div>
              </div>

              <button 
                onClick={() => handleOpenBooking()} 
                style={{ 
                  display: 'inline-block', 
                  color: btnHovered ? 'var(--cream)' : 'var(--forest)', 
                  border: '1px solid var(--forest)', 
                  padding: '12px 30px', 
                  borderRadius: '50px', 
                  background: btnHovered ? 'var(--forest)' : 'transparent', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  fontSize: '0.9rem', 
                  transition: 'all 0.3s ease' 
                }}
                onMouseOver={() => setBtnHovered(true)}
                onMouseOut={() => setBtnHovered(false)}
              >
                Plan Your Visit Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COTTAGES ===== */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-tag fade-up">Accommodations</p>
            <h2 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Cozy Cottages
            </h2>
            <p className="section-desc fade-up">Handcrafted rooms designed for comfort and peace.</p>
          </div>

          <div className="card-grid cols-3">
            {roomsData.map((room) => (
              <div key={room.id} className="room-card">
                <div style={{ overflow: 'hidden', height: '220px' }}>
                  <img src={room.image} alt={room.name} className="room-img-top" loading="lazy" />
                </div>
                <div className="room-body">
                  <h3 className="room-card-title" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
                    {room.name}
                  </h3>
                  <p className="room-card-meta">{room.subtitle}</p>
                  <div className="room-card-footer">
                    <div className="room-card-price">From <span>₹ {room.price.toLocaleString('en-IN')}</span> / night</div>
                    <button 
                      className="btn-pill-enquire btn-hover"
                      onClick={() => handleOpenBooking(room.name)}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT / MAP ===== */}
      <section id="contact" className="section-padding bg-section-fade">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-tag fade-up">Location & Hours</p>
            <h2 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif" }}>
              Visit {resortInfo.name}
            </h2>
          </div>

          <div className="contact-grid fade-up">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="icon-card" style={{ textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div className="icon-circle" style={{ background: 'rgba(46, 125, 50, 0.1)', color: 'var(--forest-light)' }}>📍</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: 'var(--forest)' }}>Our Location</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                    {resortInfo.address}
                  </p>
                  <a href={resortInfo.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>
                    Get Directions on Maps →
                  </a>
                </div>
              </div>

              <div className="icon-card" style={{ textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div className="icon-circle" style={{ background: 'rgba(46, 125, 50, 0.1)', color: 'var(--forest-light)' }}>📞</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: 'var(--forest)' }}>Call or WhatsApp</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Phone: <a href={`tel:${resortInfo.phoneRaw}`} style={{ color: 'var(--forest)', fontWeight: 600 }}>{resortInfo.phone}</a>
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Email: <a href={`mailto:${resortInfo.email}`} style={{ color: 'var(--forest)', fontWeight: 600 }}>{resortInfo.email}</a>
                  </p>
                </div>
              </div>

              <div className="icon-card" style={{ textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'var(--forest)', color: '#fff' }}>
                <div className="icon-circle" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}>⏰</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#fff' }}>Check-in Hours</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9, color: '#fff' }}>Check-in: {resortInfo.checkIn}</p>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9, color: '#fff' }}>Check-out: {resortInfo.checkOut}</p>
                </div>
              </div>
            </div>

            <div className="map-wrap" style={{ borderRadius: '20px', overflow: 'hidden', height: '280px', border: '1px solid var(--border)' }}>
              <iframe 
                src={resortInfo.mapEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                title="Ajara Nisarga Resort Map"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Global Quick Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedRoom={selectedRoom}
      />
    </main>
  );
}
