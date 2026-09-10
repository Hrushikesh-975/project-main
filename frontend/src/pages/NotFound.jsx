import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 60px', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px', background: '#fff', padding: '50px 30px', borderRadius: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '15px' }}>🥾</span>
        <span style={{ color: 'var(--gold)', letterSpacing: '2px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
          404 - Page Not Found
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)', fontSize: '2.2rem', margin: '10px 0 15px' }}>
          Off the Trail!
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
          Looks like you've wandered off the main path. The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn-hover"
          style={{ display: 'inline-block', background: 'var(--forest)', color: '#fff', padding: '14px 35px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}
        >
          Return to Ajara Nisarga Resort
        </Link>
      </div>
    </main>
  );
}
