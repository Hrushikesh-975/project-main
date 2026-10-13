#  — Web Application & Booking Engine

A modern, responsive, secure, and production-ready resort website and booking management system built for **Ajara Nisarga Resort** in Ajara, Maharashtra.

---

## 🌲 Project Overview

Ajara Nisarga Resort is a nature-focused resort near Parewadi & Pethewadi, Ajara, Kolhapur District, Maharashtra. This web application provides visitors with an immersive, conversion-focused resort presentation, cottage showcase, local sightseeing guide, event package planner, and interactive WhatsApp booking integration, backed by a secure Express/SQLite management portal for resort administrators.

---

## ✨ Features

- **Branded Nature Aesthetic**: Preserved visual identity with green/forest tones, gold accents, elegant Playfair Display & Poppins typography, rounded cards, and smooth animations.
- **Interactive Stay Booking System**:
  - Full input validation (Name, WhatsApp Number, Email, Check-in/out dates, Guests, Room type, Special requests).
  - Selected accommodation state persistence from room cards directly to booking flow.
  - Human-readable Booking Reference IDs (`ANR-SXXXXX`).
  - Pre-filled WhatsApp enquiry generation with single-click continuation.
- **Event & Package Booking Engine**:
  - Dedicated event planner for Destination Weddings, Birthdays, Anniversaries, Corporate Retreats, and One-Day Picnics.
  - Request a Quote workflow with reference generation (`ANR-EXXXXX`).
- **Protected Admin Management Portal**:
  - Secure `/admin/login` authentication protecting customer PII and booking details.
  - Dashboard KPI summary metrics (Total Enquiries, Stay/Event split, New enquiries, Confirmed bookings).
  - Real-time search by Name, Phone, or Reference ID.
  - Status filter tabs (`All`, `New`, `Contacted`, `Confirmed`, `Cancelled`, `Completed`).
  - One-click status updates and direct customer WhatsApp contact buttons.
- **Rich Accessible Media & Lightbox**:
  - Deduplicated gallery with category filters (`Resort`, `Rooms`, `Nature`, `Activities`).
  - Full keyboard navigation (Escape, Arrow keys) and background scroll locking.
- **SEO & Performance Optimizations**:
  - Route code-splitting with `React.lazy` and `Suspense`.
  - React Error Boundary and friendly resort 404 page.
  - OpenGraph metadata, `sitemap.xml`, `robots.txt`, and JSON-LD `Resort` structured data.
  - Rate limiting, security headers, sanitized logging, and `/api/health` health check.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router DOM 7, Vanilla CSS (CSS Variables, Flexbox, Grid)
- **Backend**: Node.js, Express 4, SQLite3
- **Authentication**: Admin session token manager
- **Security**: CORS origin restrictions, security headers, rate limiting, PII-sanitized request logging

---

## 📁 Directory Structure

```text
ajaranisarga-main/
├── backend/
│   ├── authMiddleware.js     # Admin authentication & token verification
│   ├── bookings.db           # SQLite database
│   ├── database.js           # Database initialization & non-destructive migrations
│   ├── package.json
│   ├── server.js             # Express server API endpoints
│   └── .env.example
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── resort1.mp4
│   │   ├── resort2.mp4
│   │   ├── resort3.jpeg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Layout, BookingForm, BookingModal, Lightbox, ErrorBoundary
│   │   ├── data/             # Centralized resortInfo, roomsData, eventsData
│   │   ├── pages/            # Home, About, Stay, Activities, Gallery, Sightseeing, Contact, BookEvent, Admin, AdminLogin, NotFound
│   │   ├── services/         # Centralized API service layer (api.js)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
└── README.md
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Backend Setup

```bash
cd backend
npm install
npm run server
```

The backend server will run on `http://localhost:5000`.

### 2. Frontend Setup

In a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be accessible at `http://localhost:5173`.

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=nisarga2026
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=919923862323
```

---

## 🛡️ Admin Portal Credentials

- **URL**: `http://localhost:5173/admin/login`
- **Default Username**: `admin`
- **Default Password**: `nisarga2026` *(configurable via `ADMIN_PASSWORD` in `backend/.env`)*

---

## 🌐 Production Build & Deployment

### Build Frontend

```bash
cd frontend
npm run build
```

This compiles optimized production assets into `frontend/dist`.

### Run Production Server

```bash
cd backend
NODE_ENV=production npm run server
```

---

## 📜 License & Copyright

© 2026 Ajara Nisarga Resort. All rights reserved.
