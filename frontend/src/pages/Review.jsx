import React from 'react';
import { Link } from 'react-router-dom';
import { resortInfo } from '../data/resortInfo';

export default function Review() {
  const reviews = [
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"The place is very peaceful and clean. We had a relaxing stay and the food was good. Will visit again!"',
      author: 'Priya Deshmukh',
      city: 'Pune'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"Nice place for a weekend with family. The swimming pool and surroundings were well maintained."',
      author: 'Rahul Patil',
      city: 'Mumbai'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"Rooms were clean and the staff was helpful. Overall a comfortable stay."',
      author: 'Sneha Kulkarni',
      city: 'Kolhapur'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"The food felt like it was made at home. The place is calm and good for short trips."',
      author: 'Anjali Shetage',
      city: 'Kolhapur'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"Good location away from city noise. Perfect for relaxing and spending quality time with family."',
      author: 'Rahul Shinde',
      city: 'Sangli'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"We hosted a birthday party here. The staff was incredibly helpful and the campfire night was the highlight!"',
      author: 'Rohan Deshpande',
      city: 'Kolhapur'
    }
  ];

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="section-padding bg-section-fade" style={{ minHeight: '85vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag fade-up" style={{ color: 'var(--gold)', letterSpacing: '2px', fontWeight: 600 }}>TESTIMONIALS</p>
          <h1 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--forest)' }}>
            What Our Guests Say
          </h1>
          <p className="section-desc fade-up" style={{ marginBottom: '3rem' }}>
            Real experiences from families and couples who stayed at {resortInfo.name}.
          </p>

          <div className="card-grid cols-3 fade-up" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
            {reviews.map((rev, idx) => (
              <div 
                key={idx} 
                className="icon-card" 
                style={{ padding: '2rem', borderRadius: '25px', background: '#fff', textAlign: 'left', border: '1px solid rgba(26, 58, 26, 0.05)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
              >
                <div style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1.1rem' }}>{rev.stars}</div>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {rev.text}
                </p>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '0.85rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--forest)' }}>{rev.author}</h4>
                  <small style={{ color: 'var(--gold)', fontWeight: 600 }}>{rev.city}</small>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', padding: '30px', borderRadius: '25px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)', marginBottom: '10px' }}>
              Ready to Experience {resortInfo.shortName}?
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Book your nature retreat today and create lasting family memories.
            </p>
            <Link 
              to="/contact" 
              className="btn-hover"
              style={{ display: 'inline-block', background: 'var(--forest)', color: '#fff', padding: '12px 30px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
