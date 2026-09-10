import React from 'react';
import { resortInfo } from '../data/resortInfo';

export default function Choose() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="section-padding" style={{ backgroundColor: '#f4f9f4', padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 15px' }}>
            <p className="section-tag" style={{ color: 'var(--gold)', letterSpacing: '2px', fontWeight: 600, fontSize: '0.8rem' }}>THE NISARGA DIFFERENCE</p>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)', fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginTop: '10px' }}>
              Why Choose {resortInfo.name}?
            </h1>
          </div>

          <div className="responsive-why-grid" style={{ display: 'grid', gap: '20px', padding: '0 15px' }}>
            <div className="icon-card" style={{ background: '#ffffff', borderRadius: '20px', padding: '25px', border: '1px solid rgba(26, 58, 26, 0.05)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🌿</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--forest)', marginBottom: '10px' }}>Eco-Friendly Stay</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>Sustainable practices and plastic minimization to protect Ajara's natural ecosystem.</p>
            </div>

            <div className="icon-card" style={{ background: '#ffffff', borderRadius: '20px', padding: '25px', border: '1px solid rgba(26, 58, 26, 0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🍲</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--forest)', marginBottom: '10px' }}>Homely Food & Hospitality</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>Genuine Maharashtrian warmth with fresh, home-cooked local meals prepared on request.</p>
            </div>

            <div className="icon-card" style={{ background: '#ffffff', borderRadius: '20px', padding: '25px', border: '1px solid rgba(26, 58, 26, 0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🛡️</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--forest)', marginBottom: '10px' }}>Safe & Private Haven</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>Private 4+ acre enclosed property with peaceful surroundings for complete peace of mind.</p>
            </div>

            <div className="icon-card" style={{ background: '#ffffff', borderRadius: '20px', padding: '25px', border: '1px solid rgba(26, 58, 26, 0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '15px' }}>⭐</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--forest)', marginBottom: '10px' }}>Family Memories</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>Rain dance, swimming pool, campfire nights, and outdoor play areas for perfect family trips.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
