import React from 'react';
import BookingForm from '../components/BookingForm';
import { resortInfo } from '../data/resortInfo';

export default function Contact() {
  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ===== CONTACT & BOOKING ===== */}
      <section id="contact" className="section-padding bg-section-fade">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-tag fade-up">Get In Touch</p>
            <h1 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif" }}>
              Book Your Stay at {resortInfo.name}
            </h1>
            <p className="section-desc fade-up" style={{ color: 'var(--muted)', maxWidth: '600px' }}>
              Ready to escape city noise and embrace serene nature? Send us your enquiry below or connect with us directly on WhatsApp.
            </p>
          </div>
          
          <div className="contact-grid fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', textAlign: 'left' }}>
            {/* Embedded Stay Booking Form */}
            <div>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--forest)', marginBottom: '15px', fontFamily: "'Playfair Display', serif" }}>
                Send Stay Enquiry
              </h2>
              <BookingForm />
            </div>

            {/* Resort Contact Details & Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--forest)', marginBottom: '5px', fontFamily: "'Playfair Display', serif" }}>
                Resort Information
              </h2>

              <div className="contact-info-item" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: '#fff', padding: '18px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div className="ci-icon" style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>📍</div>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--forest)', fontSize: '1rem' }}>Location</h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                    {resortInfo.address}
                  </p>
                  <a 
                    href={resortInfo.mapDirectionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, display: 'inline-block', marginTop: '6px' }}
                  >
                    Get Directions on Google Maps →
                  </a>
                </div>
              </div>

              <div className="contact-info-item" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: '#fff', padding: '18px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div className="ci-icon" style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>📞</div>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--forest)', fontSize: '1rem' }}>Phone & WhatsApp</h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Call: <a href={`tel:${resortInfo.phoneRaw}`} style={{ color: 'var(--forest)', fontWeight: 600 }}>{resortInfo.phone}</a>
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Email: <a href={`mailto:${resortInfo.email}`} style={{ color: 'var(--forest)', fontWeight: 600 }}>{resortInfo.email}</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: 'var(--forest)', color: '#fff', padding: '18px', borderRadius: '20px' }}>
                <div className="ci-icon" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff', fontSize: '1.2rem' }}>⏰</div>
                <div>
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>Check-in & Check-out</h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                    Check-in Time: <strong>{resortInfo.checkIn}</strong>
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                    Check-out Time: <strong>{resortInfo.checkOut}</strong>
                  </p>
                </div>
              </div>

              <div className="map-wrap" style={{ borderRadius: '20px', overflow: 'hidden', height: '220px', border: '1px solid var(--border)' }}>
                <iframe 
                  src={resortInfo.mapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="Ajara Nisarga Resort Google Map"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
