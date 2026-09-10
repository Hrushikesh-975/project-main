import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Activities = lazy(() => import('./pages/Activities'));
const Stay = lazy(() => import('./pages/Stay'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Sightseeing = lazy(() => import('./pages/Sightseeing'));
const Review = lazy(() => import('./pages/Review'));
const Contact = lazy(() => import('./pages/Contact'));
const BookEvent = lazy(() => import('./pages/BookEvent'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Choose = lazy(() => import('./pages/Choose'));
const NatureImpact = lazy(() => import('./pages/NatureImpact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Simple loading spinner component
function PageLoader() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTop: '3px solid var(--forest)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <span style={{ fontSize: '0.85rem', color: 'var(--muted)', letterSpacing: '1px' }}>Loading Ajara Nisarga...</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/sightseeing" element={<Sightseeing />} />
              <Route path="/review" element={<Review />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/bookevent" element={<BookEvent />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/choose" element={<Choose />} />
              <Route path="/natureimpact" element={<NatureImpact />} />
              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}
