import React, { useState } from 'react';
import { roomsData } from '../data/roomsData';
import { resortInfo } from '../data/resortInfo';
import BookingModal from '../components/BookingModal';

export default function Stay() {
  const [selectedRoomModal, setSelectedRoomModal] = useState(null);

  const handleEnquireRoom = (roomName) => {
    setSelectedRoomModal(roomName);
  };

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="section" id="stay" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div className="section-heading" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-tag fade-up">Accommodations</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--forest)' }}>
              Cozy Nature Cottages & Rooms
            </h1>
            <p className="section-desc fade-up" style={{ marginTop: '10px' }}>
              Experience soothing peaceful nights, fresh morning mountain mist, and authentic hospitality in Ajara.
            </p>
          </div>

          <div className="card-grid cols-3" style={{ gap: '2rem', marginBottom: '4rem' }}>
            {roomsData.map((room) => (
              <article key={room.id} className="room-card">
                <div style={{ overflow: 'hidden', height: '240px' }}>
                  <img 
                    className="room-img-top" 
                    src={room.image} 
                    alt={room.name} 
                    loading="lazy"
                  />
                </div>
                <div className="room-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 className="room-card-title" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
                      {room.name}
                    </h3>
                    <p className="room-card-meta" style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.8rem', marginBottom: '8px' }}>
                      {room.subtitle}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5', marginBottom: '15px' }}>
                      {room.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '50px', padding: '3px 10px', fontSize: '0.725rem', color: 'var(--forest-dark)' }}>
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="room-card-footer">
                    <div className="room-card-price">
                      From <span style={{ color: 'var(--forest)', fontSize: '1.2rem', fontWeight: 700 }}>{room.currency} {room.price.toLocaleString('en-IN')}</span> {room.priceUnit}
                    </div>
                    <button 
                      className="btn-pill-enquire btn-hover"
                      onClick={() => handleEnquireRoom(room.name)}
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ===== HOUSE RULES & STAY POLICIES ===== */}
          <section className="section-padding" style={{ background: 'var(--cream)', borderRadius: '30px' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <p className="section-tag fade-up">Stay Information</p>
                <h2 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif" }}>Resort Policies</h2>
              </div>

              <div className="card-grid cols-4 fade-up">
                <div className="icon-card" style={{ textAlign: 'left', padding: '1.5rem', background: '#fff' }}>
                  <div className="icon-circle" style={{ margin: '0 0 1rem 0' }}>🕒</div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--forest)' }}>Check-in / Check-out</h3>
                  <p>Check-in: {resortInfo.checkIn}<br />Check-out: {resortInfo.checkOut}</p>
                </div>

                <div className="icon-card" style={{ textAlign: 'left', padding: '1.5rem', background: '#fff' }}>
                  <div className="icon-circle" style={{ margin: '0 0 1rem 0' }}>🪪</div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--forest)' }}>ID Requirement</h3>
                  <p>Valid Government ID (Aadhaar/Passport/Driving License) required for all adult guests.</p>
                </div>

                <div className="icon-card" style={{ textAlign: 'left', padding: '1.5rem', background: '#fff' }}>
                  <div className="icon-circle" style={{ margin: '0 0 1rem 0' }}>🍲</div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--forest)' }}>Home Cooked Food</h3>
                  <p>Authentic local Maharashtrian veg & non-veg meals available on advance notice.</p>
                </div>

                <div className="icon-card" style={{ textAlign: 'left', padding: '1.5rem', background: '#fff' }}>
                  <div className="icon-circle" style={{ margin: '0 0 1rem 0' }}>🚭</div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--forest)' }}>Eco Guidelines</h3>
                  <p>Strictly no smoking inside rooms. Please help us maintain 100% clean nature.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Booking Modal bound to clicked room */}
      <BookingModal
        isOpen={!!selectedRoomModal}
        onClose={() => setSelectedRoomModal(null)}
        selectedRoom={selectedRoomModal || ''}
      />
    </main>
  );
}
