import React from 'react';
import { resortInfo } from '../data/resortInfo';

export default function NatureImpact() {
  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ===== NATURE IMPACT ===== */}
      <section id="nature-impact" className="section-padding bg-section-fade">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag fade-up">Our Green Promise</p>
          <h1 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
            Nature Impact at {resortInfo.name}
          </h1>
          <p className="section-desc fade-up" style={{ marginBottom: '2.5rem', maxWidth: '650px' }}>
            We actively nurture nature. Every stay at {resortInfo.shortName} supports our ongoing effort to preserve Ajara's local flora and natural ecosystem.
          </p>
          
          <div className="card-grid cols-4 fade-up">
            <div className="icon-card impact-card" style={{ background: '#fff' }}>
              <div className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
                  <path d="M7 16v6" />
                  <path d="M13 19v3" />
                  <path d="M16 10v.2a3 3 0 0 1 2.1 5.2 3 3 0 0 1-.6.6H21a3 3 0 0 0 1-5.8V10a3 3 0 0 0-6 0Z" />
                  <path d="M19 16v6" />
                </svg>
              </div>
              <p className="stat" style={{ color: 'var(--forest)' }}>400+</p>
              <p className="label">Trees Planted</p>
              <p className="imp-desc">Native plants and fruit trees planted to enrich local bird & butterfly species.</p>
            </div>

            <div className="icon-card impact-card" style={{ background: '#fff' }}>
              <div className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                  <path d="M12.56 14.33c1.13 0 2.07-.94 2.07-2.1 0-.6-.29-1.17-.88-1.65-.59-.48-1.14-1.17-1.3-1.92-.15.75-.7 1.44-1.29 1.92-.59.48-.88 1.05-.88 1.65 0 1.16.94 2.1 2.08 2.1Z" />
                </svg>
              </div>
              <p className="stat" style={{ color: 'var(--forest)' }}>Water</p>
              <p className="label">Careful Conservation</p>
              <p className="imp-desc">Mindful water usage practices and rainwater percolation to recharge local ground levels.</p>
            </div>

            <div className="icon-card impact-card" style={{ background: '#fff' }}>
              <div className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 20h10" />
                  <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                  <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                  <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
                </svg>
              </div>
              <p className="stat" style={{ color: 'var(--forest)' }}>Minimal</p>
              <p className="label">Single-use Plastic</p>
              <p className="imp-desc">We minimize plastic packaging and keep the resort grounds spotless and clean.</p>
            </div>

            <div className="icon-card impact-card" style={{ background: '#fff' }}>
              <div className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
              </div>
              <p className="stat" style={{ color: 'var(--forest)' }}>4+ Acres</p>
              <p className="label">Lush Enclosed Property</p>
              <p className="imp-desc">Maintained green lawns and foliage providing a peaceful bird and nature habitat.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
