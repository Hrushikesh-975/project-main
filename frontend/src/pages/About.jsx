import React from 'react';
import { Link } from 'react-router-dom';
import { resortInfo } from '../data/resortInfo';

export default function About() {
  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ===== ABOUT ===== */}
      <section id="about" className="section-padding bg-section-fade">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag fade-up">Our Story</p>
          <h1 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif" }}>
            About {resortInfo.name}
          </h1>
          <p className="about-text fade-up" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.7' }}>
            {resortInfo.name} is located near Parewadi and Pethewadi in Ajara, Maharashtra, offering a peaceful and comfortable stay surrounded by lush greenery, hills, and fresh mountain air. Away from city noise, our resort is an ideal retreat to relax and reconnect with nature.
          </p>

          <div className="card-grid cols-4 fade-up" style={{ marginTop: '2.5rem' }}>
            <div className="icon-card">
              <div className="icon-circle">🌿</div>
              <h3 style={{ color: 'var(--forest)' }}>Eco-Friendly</h3>
              <p>Sustainable practices and clean surrounding nature</p>
            </div>
            <div className="icon-card">
              <div className="icon-circle">⛰️</div>
              <h3 style={{ color: 'var(--forest)' }}>Scenic Views</h3>
              <p>Lush greenery and peaceful mist-covered hills</p>
            </div>
            <div className="icon-card">
              <div className="icon-circle">🏡</div>
              <h3 style={{ color: 'var(--forest)' }}>Village Vibes</h3>
              <p>Authentic rural warmth with modern cozy comforts</p>
            </div>
            <div className="icon-card">
              <div className="icon-circle">🍲</div>
              <h3 style={{ color: 'var(--forest)' }}>Warm Hospitality</h3>
              <p>Fresh home-cooked food and friendly local service</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIRTUAL TOUR ===== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
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
                  <source src="resort2.mp4" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </div>
            </div>

            <div className="reveal" style={{ flex: 1, minWidth: '300px', padding: '20px' }}>
              <p className="section-tag" style={{ color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '10px' }}>
                Nature Experience
              </p>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: 'var(--forest)', marginBottom: '20px' }}>
                Experience Wild Serene Beauty
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '30px', fontSize: '1rem', maxWidth: '500px' }}>
                Enjoy a comfortable stay at {resortInfo.name} with peaceful surroundings, nature views, campfire evenings, and swimming pool enjoyment.
              </p>
              <Link to="/contact" className="btn-hover" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 35px', background: 'var(--forest)', borderRadius: '50px', color: '#fff', fontWeight: 600, transition: '0.3s' }}>
                Book Your Stay Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
