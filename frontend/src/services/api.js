const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Helper to get authorization headers for admin requests
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('anr_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

/**
 * Submit a stay booking enquiry
 */
export async function createStayBooking(payload) {
  const response = await fetch(`${API_URL}/api/book-stay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to process stay booking enquiry.');
  }
  return data;
}

/**
 * Submit an event booking enquiry
 */
export async function createEventBooking(payload) {
  const response = await fetch(`${API_URL}/api/book-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to process event booking enquiry.');
  }
  return data;
}

/**
 * Admin Login
 */
export async function adminLogin(username, password) {
  const response = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Invalid credentials.');
  }
  if (data.token) {
    localStorage.setItem('anr_admin_token', data.token);
  }
  return data;
}

/**
 * Check if admin is currently authenticated locally
 */
export function isAdminAuthenticated() {
  return !!localStorage.getItem('anr_admin_token');
}

/**
 * Logout admin
 */
export function adminLogout() {
  localStorage.removeItem('anr_admin_token');
}

/**
 * Fetch all stay bookings (Admin Only)
 */
export async function getStayBookings() {
  const response = await fetch(`${API_URL}/api/stay-bookings`, {
    headers: getAuthHeaders()
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      adminLogout();
    }
    throw new Error(data.error || 'Failed to fetch stay bookings.');
  }
  return data;
}

/**
 * Fetch all event bookings (Admin Only)
 */
export async function getEventBookings() {
  const response = await fetch(`${API_URL}/api/event-bookings`, {
    headers: getAuthHeaders()
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      adminLogout();
    }
    throw new Error(data.error || 'Failed to fetch event bookings.');
  }
  return data;
}

/**
 * Update stay booking status (Admin Only)
 */
export async function updateStayBookingStatus(id, status) {
  const response = await fetch(`${API_URL}/api/stay-bookings/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to update booking status.');
  }
  return data;
}

/**
 * Update event booking status (Admin Only)
 */
export async function updateEventBookingStatus(id, status) {
  const response = await fetch(`${API_URL}/api/event-bookings/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to update event booking status.');
  }
  return data;
}
