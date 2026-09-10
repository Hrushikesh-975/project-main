import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error in React Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', background: 'var(--cream)' }}>
          <div style={{ maxWidth: '500px', background: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌿</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)', fontSize: '2rem', marginBottom: '10px' }}>
              Something Went Wrong
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '25px' }}>
              An unexpected error occurred while loading this page. Don't worry, our trail leads back home.
            </p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{ background: 'transparent', border: '1px solid var(--forest)', color: 'var(--forest)', padding: '10px 25px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}
              >
                Try Again
              </button>
              <a 
                href="/" 
                style={{ background: 'var(--forest)', color: '#fff', padding: '10px 25px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none' }}
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
