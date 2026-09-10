try {
  process.loadEnvFile();
} catch (e) {
  // .env file optional
}

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const { authenticateAdmin, requireAdminAuth, logoutToken } = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Basic Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Safe Request Logging Middleware (Does NOT log customer PII like phone or messages)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Simple in-memory rate limiter for booking endpoints
const rateLimitMap = new Map();
function rateLimiter(maxRequests = 30, windowMs = 15 * 60 * 1000) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + windowMs;
    }

    record.count++;
    rateLimitMap.set(ip, record);

    if (record.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests from this IP. Please try again later.'
      });
    }
    next();
  };
}

// Helper to generate human-readable booking reference (e.g. ANR-S18492)
function generateBookingReference(prefix = 'ANR-S') {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomDigits}`;
}

// ==========================================
// 1. HEALTH CHECK
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    resort: 'Ajara Nisarga Resort',
    service: 'Booking Engine API',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 2. ADMIN AUTHENTICATION
// ==========================================
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required.' });
  }

  const token = authenticateAdmin(username, password);
  if (!token) {
    return res.status(401).json({ success: false, error: 'Invalid admin username or password.' });
  }

  res.json({
    success: true,
    message: 'Admin authentication successful.',
    token,
    username
  });
});

app.post('/api/admin/logout', requireAdminAuth, (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) logoutToken(token);
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ==========================================
// 3. STAY BOOKINGS (PUBLIC)
// ==========================================
app.post('/api/book-stay', rateLimiter(30), (req, res) => {
  const { name, phone, email, checkIn, checkOut, date, guests, roomName, message } = req.body;

  const actualCheckIn = checkIn || date;
  const actualCheckOut = checkOut || actualCheckIn;
  const actualPhone = phone || '';

  // Input Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Full Name is required.' });
  }
  if (!actualPhone || !actualPhone.trim()) {
    return res.status(400).json({ success: false, error: 'WhatsApp / Phone Number is required.' });
  }
  if (!actualCheckIn) {
    return res.status(400).json({ success: false, error: 'Check-in date is required.' });
  }

  const bookingRef = generateBookingReference('ANR-S');
  const selectedRoom = roomName || 'General Stay';

  const sql = `
    INSERT INTO stay_bookings (booking_reference, name, phone, email, check_in, check_out, date, guests, room_name, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `;
  const params = [
    bookingRef,
    name.trim(),
    actualPhone.trim(),
    (email || '').trim(),
    actualCheckIn,
    actualCheckOut,
    actualCheckIn,
    guests || '2',
    selectedRoom,
    (message || '').trim()
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Database error in /api/book-stay:', err.message);
      return res.status(500).json({ success: false, error: 'Database error occurred while processing booking.' });
    }

    res.status(201).json({
      success: true,
      message: 'Stay booking enquiry received successfully.',
      bookingReference: bookingRef,
      id: this.lastID
    });
  });
});

// ==========================================
// 4. EVENT BOOKINGS (PUBLIC)
// ==========================================
app.post('/api/book-event', rateLimiter(30), (req, res) => {
  const { name, phone, email, eventType, date, expectedGuests, accommodationReq, foodReq, decorationReq, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ success: false, error: 'WhatsApp / Phone number is required.' });
  }
  if (!eventType) {
    return res.status(400).json({ success: false, error: 'Event type is required.' });
  }
  if (!date) {
    return res.status(400).json({ success: false, error: 'Event date is required.' });
  }

  const bookingRef = generateBookingReference('ANR-E');

  const sql = `
    INSERT INTO event_bookings (booking_reference, name, phone, email, event_type, event_date, expected_guests, accommodation_req, food_req, decoration_req, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `;
  const params = [
    bookingRef,
    name.trim(),
    phone.trim(),
    (email || '').trim(),
    eventType,
    date,
    expectedGuests || '',
    accommodationReq || 'no',
    foodReq || 'yes',
    decorationReq || 'no',
    (message || '').trim()
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Database error in /api/book-event:', err.message);
      return res.status(500).json({ success: false, error: 'Database error occurred while processing event enquiry.' });
    }

    res.status(201).json({
      success: true,
      message: 'Event enquiry received successfully.',
      bookingReference: bookingRef,
      id: this.lastID
    });
  });
});

// ==========================================
// 5. ADMIN PROTECTED ROUTES
// ==========================================

// GET /api/stay-bookings
app.get('/api/stay-bookings', requireAdminAuth, (req, res) => {
  const sql = `SELECT * FROM stay_bookings ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving stay bookings:', err.message);
      return res.status(500).json({ success: false, error: 'Database error retrieving stay bookings.' });
    }
    res.json(rows);
  });
});

// PATCH /api/stay-bookings/:id/status
app.patch('/api/stay-bookings/:id/status', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['new', 'contacted', 'confirmed', 'cancelled', 'completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status provided.' });
  }

  const sql = `UPDATE stay_bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  db.run(sql, [status, id], function (err) {
    if (err) {
      console.error('Error updating stay booking status:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to update booking status.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, error: 'Booking not found.' });
    }
    res.json({ success: true, message: 'Status updated successfully.' });
  });
});

// GET /api/event-bookings
app.get('/api/event-bookings', requireAdminAuth, (req, res) => {
  const sql = `SELECT * FROM event_bookings ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving event bookings:', err.message);
      return res.status(500).json({ success: false, error: 'Database error retrieving event bookings.' });
    }
    res.json(rows);
  });
});

// PATCH /api/event-bookings/:id/status
app.patch('/api/event-bookings/:id/status', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['new', 'contacted', 'confirmed', 'cancelled', 'completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status provided.' });
  }

  const sql = `UPDATE event_bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  db.run(sql, [status, id], function (err) {
    if (err) {
      console.error('Error updating event booking status:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to update event status.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, error: 'Event booking not found.' });
    }
    res.json({ success: true, message: 'Event status updated successfully.' });
  });
});

// Centralized 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'API route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ success: false, error: 'An unexpected server error occurred.' });
});

const server = app.listen(PORT, () => {
  console.log(`Ajara Nisarga Resort Backend running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please check if server is already running.`);
  } else {
    console.error('Server error:', err);
  }
});
