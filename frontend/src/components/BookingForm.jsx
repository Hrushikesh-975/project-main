import React, { useState, useEffect } from 'react';
import { roomsData } from '../data/roomsData';
import { resortInfo } from '../data/resortInfo';
import { createStayBooking } from '../services/api';

export default function BookingForm({ initialRoom = '', onSuccess }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [guests, setGuests] = useState('2');
  const [selectedRoom, setSelectedRoom] = useState(initialRoom || 'Garden View Cottage');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    if (initialRoom) {
      setSelectedRoom(initialRoom);
    }
  }, [initialRoom]);

  // Adjust checkOut if checkIn is set equal or later than checkOut
  const handleCheckInChange = (e) => {
    const val = e.target.value;
    setCheckIn(val);
    if (val >= checkOut) {
      const nextDay = new Date(new Date(val).getTime() + 86400000).toISOString().split('T')[0];
      setCheckOut(nextDay);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Frontend validation
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid WhatsApp / Phone number.');
      return;
    }
    if (checkIn < todayStr) {
      setErrorMsg('Check-in date cannot be in the past.');
      return;
    }
    if (checkOut <= checkIn) {
      setErrorMsg('Check-out date must be after Check-in date.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        checkIn,
        checkOut,
        date: checkIn,
        guests,
        roomName: selectedRoom,
        message: message.trim()
      };

      const result = await createStayBooking(payload);

      // Build formatted WhatsApp message URL
      const waText = encodeURIComponent(
        `Hello ${resortInfo.name}!\n` +
        `I would like to make a stay enquiry:\n\n` +
        `📌 Booking Ref: ${result.bookingReference || 'ANR-S'}\n` +
        `👤 Name: ${name.trim()}\n` +
        `📞 Phone: ${phone.trim()}\n` +
        `🏡 Accommodation: ${selectedRoom}\n` +
        `📅 Check-in: ${checkIn}\n` +
        `📅 Check-out: ${checkOut}\n` +
        `👥 Guests: ${guests}\n` +
        (message.trim() ? `💬 Special Request: ${message.trim()}` : '')
      );

      const whatsappUrl = `https://wa.me/${resortInfo.whatsappNumber}?text=${waText}`;

      const successData = {
        reference: result.bookingReference,
        name: name.trim(),
        room: selectedRoom,
        checkIn,
        checkOut,
        guests,
        whatsappUrl
      };

      setBookingSuccess(successData);

      if (onSuccess) {
        onSuccess(successData);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit stay booking enquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBookingSuccess(null);
    setName('');
    setPhone('');
    setEmail('');
    setCheckIn(todayStr);
    setCheckOut(tomorrowStr);
    setGuests('2');
    setMessage('');
    setErrorMsg('');
  };

  if (bookingSuccess) {
    return (
      <div className="booking-success-box" style={{ background: '#fff', padding: '30px', borderRadius: '30px', border: '2px solid var(--forest)', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: 'rgba(46, 125, 50, 0.1)', color: 'var(--forest)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 15px' }}>
          ✓
        </div>
        <h3 style={{ color: 'var(--forest)', fontSize: '1.5rem', marginBottom: '8px' }}>Enquiry Received!</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
          Thank you, <strong>{bookingSuccess.name}</strong>. Your stay enquiry has been saved.
        </p>

        <div style={{ background: 'var(--cream)', padding: '15px', borderRadius: '15px', margin: '15px 0', textAlign: 'left', fontSize: '0.85rem' }}>
          <p style={{ margin: '4px 0' }}><strong>Reference:</strong> <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{bookingSuccess.reference}</span></p>
          <p style={{ margin: '4px 0' }}><strong>Cottage:</strong> {bookingSuccess.room}</p>
          <p style={{ margin: '4px 0' }}><strong>Dates:</strong> {bookingSuccess.checkIn} to {bookingSuccess.checkOut}</p>
          <p style={{ margin: '4px 0' }}><strong>Guests:</strong> {bookingSuccess.guests}</p>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '20px' }}>
          Click below to open WhatsApp with your pre-filled enquiry details for instant confirmation!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={bookingSuccess.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', padding: '14px 25px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}
          >
            💬 Continue to WhatsApp
          </a>

          <button
            onClick={handleReset}
            style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer', marginTop: '5px' }}
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      {errorMsg && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '10px 15px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1.5rem', borderLeft: '4px solid #c62828' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="field" style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
          Full Name <span style={{ color: 'red' }}>*</span>
        </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g. Priya Deshmukh" 
          required 
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }} 
        />
      </div>

      <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '1.25rem' }}>
        <div className="field">
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
            WhatsApp Number <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="+91 9876543210" 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }} 
          />
        </div>

        <div className="field">
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
            Email (Optional)
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="priya@example.com" 
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }} 
          />
        </div>
      </div>

      <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '1.25rem' }}>
        <div className="field">
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
            Check-in Date <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="date" 
            value={checkIn} 
            min={todayStr}
            onChange={handleCheckInChange} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }} 
          />
        </div>

        <div className="field">
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
            Check-out Date <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="date" 
            value={checkOut} 
            min={checkIn || todayStr}
            onChange={(e) => setCheckOut(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }} 
          />
        </div>
      </div>

      <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '1.25rem' }}>
        <div className="field">
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
            Guests <span style={{ color: 'red' }}>*</span>
          </label>
          <select 
            value={guests} 
            onChange={(e) => setGuests(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5+">5+ Guests (Family Group)</option>
          </select>
        </div>

        <div className="field">
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
            Accommodation <span style={{ color: 'red' }}>*</span>
          </label>
          <select 
            value={selectedRoom} 
            onChange={(e) => setSelectedRoom(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }}
          >
            {roomsData.map((rm) => (
              <option key={rm.id} value={rm.name}>{rm.name} ({rm.currency}{rm.price}/night)</option>
            ))}
            <option value="General Stay Enquiry">General Stay Enquiry</option>
          </select>
        </div>
      </div>

      <div className="field" style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--forest)', fontSize: '0.85rem' }}>
          Special Requests (Optional)
        </label>
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          rows="3" 
          placeholder="Food preferences, extra bedding, arrival time..." 
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem' }}
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="submit-btn btn-hover" 
        style={{ width: '100%', background: 'var(--forest)', color: '#fff', padding: '15px', border: 'none', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', transition: '0.3s' }}
      >
        {isLoading ? 'Processing Enquiry...' : '💬 Book via WhatsApp'}
      </button>
    </form>
  );
}
