import React from 'react';
import { Link } from 'react-router-dom';
import { resortInfo } from '../data/resortInfo';

export default function Sightseeing() {
  const sights = [
    {
      title: 'Ramtirth Waterfall & Temple, Ajara',
      location: '5 km from resort',
      duration: 'Half day',
      desc: 'Historic scenic location near Hiranyakeshi river. Magnificent waterfall and ancient temple, best visited during monsoon and post-monsoon months.',
      img: 'https://image-worker.mindtrip.ai/image-resize/format=webp,w=720/https:/images.mindtrip.ai/attractions/406e/6b13/9acb/df71/af1b/72d9/fef1/ae07',
      reverse: false
    },
    {
      title: 'Amboli Hill Station & Waterfall',
      location: '30 km from resort',
      duration: 'Full day trip',
      desc: 'Famous hill station known for cool misty climate, lush Western Ghats, waterfalls, and breathtaking valley viewpoints. Ideal for a day excursion.',
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/38/8b/91/amboli-waterfall.jpg?w=1400&h=-1&s=1',
      reverse: true
    },
    {
      title: 'Shri Mahalaxmi (Ambabai) Temple, Kolhapur',
      location: '96 km from resort',
      duration: 'Full day trip',
      desc: 'Historic 7th-century temple dedicated to Goddess Mahalaxmi in Kolhapur city. A major pilgrimage destination with rich Maratha history.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEzvfj0tg6MDCO7_KpLLOMehD0Z9isfM55A&s',
      reverse: false
    },
    {
      title: 'Shiroda Beach & Konkan Coast',
      location: '87 km from resort',
      duration: 'Full day trip',
      desc: 'Serene, uncrowded beach along the southern Konkan coastline. Famous for clean golden sands, calm sea waves, and soothing sunsets.',
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/3b/33/a2/caption.jpg?w=1100&h=1100&s=1',
      reverse: true
    },
    {
      title: 'Jyotiba Temple, Kolhapur',
      location: '113 km from resort',
      duration: 'Full day trip',
      desc: 'Sacred hilltop shrine located near Kolhapur surrounded by forest green valleys. Revered site visited by thousands of devotees.',
      img: 'https://i.pinimg.com/736x/a9/3f/a4/a93fa4a449f1c40bcd6f80e3c9d2b554.jpg',
      reverse: false
    }
  ];

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ===== SIGHTSEEING ===== */}
      <section id="sightseeing" className="section-padding bg-forest-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag fade-up">Explore Around</p>
          <h1 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cream)' }}>
            Places to Visit Near Ajara
          </h1>
          <p className="section-desc fade-up" style={{ color: 'hsl(40 33% 97% / 0.8)', marginBottom: '3rem' }}>
            Discover historic waterfalls, sacred temples, and Konkan beaches within easy driving distance of {resortInfo.name}.
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {sights.map((sight, index) => (
              <div 
                key={index} 
                className={`sight-item ${sight.reverse ? 'reverse' : ''} fade-up`}
                style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="img-wrap">
                  <img src={sight.img} alt={sight.title} loading="lazy" />
                </div>
                <div className="text" style={{ textAlign: 'left' }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '8px' }}>
                    {sight.title}
                  </h2>
                  <div className="meta" style={{ marginBottom: '10px' }}>
                    <span>📍 {sight.location}</span>
                    <span>🕐 {sight.duration}</span>
                  </div>
                  <p>{sight.desc}</p>
                  <Link to="/contact" className="plan-btn btn-hover">Plan Visit & Stay</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
