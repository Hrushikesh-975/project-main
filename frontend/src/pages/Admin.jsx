import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getStayBookings, 
  getEventBookings, 
  updateStayBookingStatus, 
  updateEventBookingStatus,
  isAdminAuthenticated,
  adminLogout 
} from '../services/api';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stay'); // 'stay' | 'event'
  const [stayBookings, setStayBookings] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const [stayData, eventData] = await Promise.all([
        getStayBookings(),
        getEventBookings()
      ]);
      setStayBookings(stayData || []);
      setEventBookings(eventData || []);
    } catch (err) {
      console.error('Error in Admin dashboard:', err);
      setError(err.message || 'Authentication error or server unavailable.');
      if (err.message.includes('Unauthorized')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const handleStatusChange = async (type, id, newStatus) => {
    try {
      if (type === 'stay') {
        await updateStayBookingStatus(id, newStatus);
        setStayBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      } else {
        await updateEventBookingStatus(id, newStatus);
        setEventBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  // Metrics calculation
  const totalStay = stayBookings.length;
  const totalEvent = eventBookings.length;
  const totalEnquiries = totalStay + totalEvent;
  const newEnquiries = stayBookings.filter(b => b.status === 'new').length + eventBookings.filter(b => b.status === 'new').length;
  const confirmedBookings = stayBookings.filter(b => b.status === 'confirmed').length + eventBookings.filter(b => b.status === 'confirmed').length;

  // Filtering
  const filterList = (list, isStay) => {
    return list.filter(item => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const ref = (item.booking_reference || '').toLowerCase();
        const name = (item.name || '').toLowerCase();
        const phone = (item.phone || '').toLowerCase();
        const itemType = isStay ? (item.room_name || '').toLowerCase() : (item.event_type || '').toLowerCase();
        return ref.includes(q) || name.includes(q) || phone.includes(q) || itemType.includes(q);
      }
      return true;
    });
  };

  const filteredStay = filterList(stayBookings, true);
  const filteredEvent = filterList(eventBookings, false);

  const getStatusBadge = (status) => {
    const s = status || 'new';
    const colors = {
      new: { bg: '#e3f2fd', color: '#1565c0' },
      contacted: { bg: '#fff8e1', color: '#f57f17' },
      confirmed: { bg: '#e8f5e9', color: '#2e7d32' },
      cancelled: { bg: '#ffebee', color: '#c62828' },
      completed: { bg: '#f3e5f5', color: '#6a1b9a' }
    };
    const style = colors[s] || colors.new;

    return (
      <span style={{ background: style.bg, color: style.color, padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
        {s}
      </span>
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <span style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              Management Portal
            </span>
            <h1 style={{ textAlign: 'left', margin: '5px 0 0 0', fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>
              Ajara Nisarga Resort Admin
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={fetchData} 
              style={{ background: '#fff', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}
            >
              🔄 Refresh
            </button>
            <button 
              onClick={handleLogout} 
              style={{ background: '#c62828', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderLeft: '5px solid var(--forest)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>TOTAL ENQUIRIES</span>
            <h2 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: 'var(--forest)' }}>{totalEnquiries}</h2>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderLeft: '5px solid #1565c0' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>NEW UNCONTACTED</span>
            <h2 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: '#1565c0' }}>{newEnquiries}</h2>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderLeft: '5px solid #2e7d32' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>CONFIRMED BOOKINGS</span>
            <h2 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: '#2e7d32' }}>{confirmedBookings}</h2>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderLeft: '5px solid var(--gold)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>STAY / EVENT SPLIT</span>
            <h2 style={{ margin: '5px 0 0', fontSize: '1.3rem', color: '#333' }}>{totalStay} Stay | {totalEvent} Event</h2>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setActiveTab('stay')} 
              style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: activeTab === 'stay' ? 'var(--forest)' : '#eee', color: activeTab === 'stay' ? '#fff' : '#333', fontWeight: 700, cursor: 'pointer' }}
            >
              🏡 Stay Bookings ({stayBookings.length})
            </button>
            <button 
              onClick={() => setActiveTab('event')} 
              style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: activeTab === 'event' ? 'var(--forest)' : '#eee', color: activeTab === 'event' ? '#fff' : '#333', fontWeight: 700, cursor: 'pointer' }}
            >
              🎉 Event Bookings ({eventBookings.length})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search by Name, Phone, Ref ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.85rem', width: '220px' }}
            />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.85rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {error && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
            ⚠️ {error}
          </div>
        )}

        {/* ===== STAY BOOKINGS TAB ===== */}
        {activeTab === 'stay' && (
          <div className="card" style={{ overflowX: 'auto' }}>
            <h2>Stay Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Guest Name</th>
                  <th>Contact</th>
                  <th>Check-in / Out</th>
                  <th>Guests</th>
                  <th>Accommodation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8">Loading stay enquiries...</td></tr>
                ) : filteredStay.length === 0 ? (
                  <tr><td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>No stay bookings match your filter.</td></tr>
                ) : (
                  filteredStay.map((b) => (
                    <tr key={b.id}>
                      <td><strong style={{ color: 'var(--gold)' }}>{b.booking_reference || `ANR-S00${b.id}`}</strong></td>
                      <td>
                        <strong>{b.name}</strong>
                        {b.message && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>"{b.message}"</div>}
                      </td>
                      <td>
                        <div>{b.phone || '-'}</div>
                        {b.email && <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{b.email}</div>}
                      </td>
                      <td>
                        <div>In: {b.check_in || b.date}</div>
                        <div>Out: {b.check_out || '-'}</div>
                      </td>
                      <td>{b.guests}</td>
                      <td>{b.room_name || 'Garden View Cottage'}</td>
                      <td>{getStatusBadge(b.status)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <select 
                            value={b.status || 'new'} 
                            onChange={(e) => handleStatusChange('stay', b.id, e.target.value)}
                            style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid #ccc' }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                          
                          {b.phone && (
                            <a 
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              style={{ background: '#25D366', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 700 }}
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== EVENT BOOKINGS TAB ===== */}
        {activeTab === 'event' && (
          <div className="card" style={{ overflowX: 'auto' }}>
            <h2>Event & Package Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Occasion</th>
                  <th>Event Date</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8">Loading event enquiries...</td></tr>
                ) : filteredEvent.length === 0 ? (
                  <tr><td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>No event bookings match your filter.</td></tr>
                ) : (
                  filteredEvent.map((b) => (
                    <tr key={b.id}>
                      <td><strong style={{ color: 'var(--gold)' }}>{b.booking_reference || `ANR-E00${b.id}`}</strong></td>
                      <td>
                        <strong>{b.name}</strong>
                        {b.message && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>"{b.message}"</div>}
                      </td>
                      <td>{b.phone}</td>
                      <td><strong style={{ color: 'var(--forest)' }}>{b.event_type}</strong></td>
                      <td>{b.event_date}</td>
                      <td>{b.expected_guests || '-'}</td>
                      <td>{getStatusBadge(b.status)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <select 
                            value={b.status || 'new'} 
                            onChange={(e) => handleStatusChange('event', b.id, e.target.value)}
                            style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid #ccc' }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>

                          {b.phone && (
                            <a 
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              style={{ background: '#25D366', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 700 }}
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
