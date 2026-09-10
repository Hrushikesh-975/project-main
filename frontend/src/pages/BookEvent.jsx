import React, { useState } from 'react';
import { eventsData } from '../data/eventsData';
import { resortInfo } from '../data/resortInfo';
import { createEventBooking } from '../services/api';

export default function BookEvent() {
  const todayStr = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Destination Wedding');
  const [eventDate, setEventDate] = useState(todayStr);
  const [expectedGuests, setExpectedGuests] = useState('50-100');
  const [accommodationReq, setAccommodationReq] = useState('yes');
  const [foodReq, setFoodReq] = useState('yes');
  const [decorationReq, setDecorationReq] = useState('yes');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid WhatsApp / Phone number.');
      return;
    }
    if (!eventDate || eventDate < todayStr) {
      setErrorMsg('Please select a valid upcoming event date.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        eventType,
        date: eventDate,
        expectedGuests,
        accommodationReq,
        foodReq,
        decorationReq,
        message: message.trim()
      };

      const result = await createEventBooking(payload);

      const waText = encodeURIComponent(
        `Hello ${resortInfo.name}!\n` +
        `I would like to enquire about an Event / Celebration Package:\n\n` +
        `📌 Event Ref: ${result.bookingReference || 'ANR-E'}\n` +
        `👤 Name: ${name.trim()}\n` +
        `📞 Phone: ${phone.trim()}\n` +
        `🎉 Occasion: ${eventType}\n` +
        `📅 Preferred Date: ${eventDate}\n` +
        `👥 Expected Guests: ${expectedGuests}\n` +
        `🏡 Accommodation Required: ${accommodationReq}\n` +
        `🍲 Catering Required: ${foodReq}\n` +
        `🎈 Decoration Required: ${decorationReq}\n` +
        (message.trim() ? `💬 Notes: ${message.trim()}` : '')
      );

      const whatsappUrl = `https://wa.me/${resortInfo.whatsappNumber}?text=${waText}`;

      setBookingSuccess({
        reference: result.bookingReference,
        name: name.trim(),
        eventType,
        eventDate,
        expectedGuests,
        whatsappUrl
      });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit event enquiry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBookingSuccess(null);
    setName('');
    setPhone('');
    setEmail('');
    setEventType('Destination Wedding');
    setEventDate(todayStr);
    setExpectedGuests('50-100');
    setMessage('');
    setErrorMsg('');
  };

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ===== EVENT PACKAGES ===== */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-tag fade-up">Celebrations & Packages</p>
            <h1 className="section-title fade-up" style={{ fontFamily: "'Playfair Display', serif" }}>
              Events at Ajara Nisarga Resort
            </h1>
            <p className="section-desc fade-up" style={{ color: 'var(--muted)', maxWidth: '600px' }}>
              From intimate family gatherings to destination weddings, host your special moments in our serene green grounds.
            </p>
          </div>

          <div className="card-grid cols-2" style={{ gap: '2rem', marginBottom: '4rem' }}>
            {eventsData.map((evt) => (
              <div key={evt.id} className="exp-card">
                <div className="img-wrap" style={{ height: '220px' }}>
                  <img src={evt.image} alt={evt.title} loading="lazy" />
                </div>
                <div className="content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ background: 'var(--gold)', color: 'var(--forest-dark)', padding: '3px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {evt.tag}
                    </span>
                    <span style={{ color: 'var(--forest)', fontWeight: 700, fontSize: '0.85rem' }}>
                      {evt.priceText}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: 'var(--forest)', marginBottom: '8px' }}>
                    {evt.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '15px' }}>
                    {evt.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {evt.highlights.map((h, idx) => (
                      <span key={idx} style={{ background: 'var(--cream)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: '50px', fontSize: '0.75rem', color: 'var(--forest-dark)' }}>
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== EVENT INQUIRY FORM ===== */}
          <div className="glass-booking-card" style={{ margin: '0 auto', maxWidth: '850px' }}>
            <div className="event-header">
              <span className="section-tag">Plan Your Event</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
                Request an Event Quote
              </h2>
              <p>Fill out your event requirements below and our team will get in touch with you immediately.</p>
            </div>

            {bookingSuccess ? (
              <div style={{ background: '#fff', padding: '35px', borderRadius: '30px', border: '2px solid var(--forest)', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(46, 125, 50, 0.1)', color: 'var(--forest)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 15px' }}>
                  ✓
                </div>
                <h3 style={{ color: 'var(--forest)', fontSize: '1.5rem', marginBottom: '8px' }}>Event Enquiry Submitted!</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
                  Thank you, <strong>{bookingSuccess.name}</strong>. Your event enquiry for <strong>{bookingSuccess.eventType}</strong> has been registered.
                </p>

                <div style={{ background: 'var(--cream)', padding: '15px', borderRadius: '15px', margin: '15px 0', textAlign: 'left', fontSize: '0.85rem' }}>
                  <p style={{ margin: '4px 0' }}><strong>Reference ID:</strong> <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{bookingSuccess.reference}</span></p>
                  <p style={{ margin: '4px 0' }}><strong>Occasion:</strong> {bookingSuccess.eventType}</p>
                  <p style={{ margin: '4px 0' }}><strong>Event Date:</strong> {bookingSuccess.eventDate}</p>
                  <p style={{ margin: '4px 0' }}><strong>Expected Guests:</strong> {bookingSuccess.expectedGuests}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  <a
                    href={bookingSuccess.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hover"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', padding: '14px 25px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}
                  >
                    💬 Send Event Inquiry via WhatsApp
                  </a>

                  <button
                    onClick={handleReset}
                    style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer', marginTop: '5px' }}
                  >
                    Submit Another Event Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form id="eventForm" className="booking-grid" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{ gridColumn: '1 / -1', background: '#ffebee', color: '#c62828', padding: '12px 15px', borderRadius: '12px', fontSize: '0.85rem' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div className="input-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="e.g. Rahul Patil" 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label>WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+91 9876543210" 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label>Occasion / Event Type *</label>
                  <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                    <option value="Destination Wedding">Destination Wedding</option>
                    <option value="Birthday Celebration">Birthday Party</option>
                    <option value="Anniversary">Anniversary Celebration</option>
                    <option value="One Day Package">One Day Package / Picnic</option>
                    <option value="Corporate Retreat">Corporate Retreat</option>
                    <option value="Other Celebration">Other Social Event</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Preferred Event Date *</label>
                  <input 
                    type="date" 
                    value={eventDate} 
                    min={todayStr}
                    onChange={(e) => setEventDate(e.target.value)} 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label>Expected Guests</label>
                  <select value={expectedGuests} onChange={(e) => setExpectedGuests(e.target.value)}>
                    <option value="Under 25">Under 25 Guests</option>
                    <option value="25-50">25 - 50 Guests</option>
                    <option value="50-100">50 - 100 Guests</option>
                    <option value="100-250">100 - 250 Guests</option>
                    <option value="250+">250+ Guests</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Stay Required?</label>
                  <select value={accommodationReq} onChange={(e) => setAccommodationReq(e.target.value)}>
                    <option value="yes">Yes - Need Room Accommodations</option>
                    <option value="no">No - Day Event Only</option>
                  </select>
                </div>

                <div className="input-group full">
                  <label>Special Requests / Notes</label>
                  <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    rows="3" 
                    placeholder="Catering preferences, decoration ideas, or budget expectations..."
                  ></textarea>
                </div>

                <button type="submit" disabled={isLoading} className="submit-btn-event btn-hover">
                  <span>{isLoading ? 'Submitting Enquiry...' : '💬 Send Inquiry via WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
