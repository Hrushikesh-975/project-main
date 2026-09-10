const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'bookings.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database at:', dbPath);
    initializeDatabase();
  }
});

function initializeDatabase() {
  // 1. Create stay_bookings table if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS stay_bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_reference TEXT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      email TEXT DEFAULT '',
      check_in TEXT NOT NULL DEFAULT '',
      check_out TEXT NOT NULL DEFAULT '',
      date TEXT,
      guests TEXT NOT NULL,
      room_name TEXT DEFAULT 'General Stay',
      message TEXT DEFAULT '',
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating stay_bookings table:', err.message);
    
    // Safe Column Migrations (uses constant defaults for SQLite ALTER TABLE compatibility)
    migrateColumns('stay_bookings', [
      { name: 'booking_reference', type: 'TEXT' },
      { name: 'phone', type: "TEXT DEFAULT ''" },
      { name: 'email', type: "TEXT DEFAULT ''" },
      { name: 'check_in', type: "TEXT DEFAULT ''" },
      { name: 'check_out', type: "TEXT DEFAULT ''" },
      { name: 'room_name', type: "TEXT DEFAULT 'General Stay'" },
      { name: 'status', type: "TEXT DEFAULT 'new'" },
      { name: 'updated_at', type: 'DATETIME' }
    ], () => {
      db.run(`CREATE INDEX IF NOT EXISTS idx_stay_ref ON stay_bookings(booking_reference)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_stay_status ON stay_bookings(status)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_stay_created ON stay_bookings(created_at)`);
    });
  });

  // 2. Create event_bookings table if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS event_bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_reference TEXT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT DEFAULT '',
      event_type TEXT NOT NULL,
      event_date TEXT NOT NULL,
      expected_guests TEXT DEFAULT '',
      accommodation_req TEXT DEFAULT 'no',
      food_req TEXT DEFAULT 'yes',
      decoration_req TEXT DEFAULT 'no',
      message TEXT DEFAULT '',
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating event_bookings table:', err.message);

    // Safe Column Migrations
    migrateColumns('event_bookings', [
      { name: 'booking_reference', type: 'TEXT' },
      { name: 'email', type: "TEXT DEFAULT ''" },
      { name: 'expected_guests', type: "TEXT DEFAULT ''" },
      { name: 'accommodation_req', type: "TEXT DEFAULT 'no'" },
      { name: 'food_req', type: "TEXT DEFAULT 'yes'" },
      { name: 'decoration_req', type: "TEXT DEFAULT 'no'" },
      { name: 'status', type: "TEXT DEFAULT 'new'" },
      { name: 'updated_at', type: 'DATETIME' }
    ], () => {
      db.run(`CREATE INDEX IF NOT EXISTS idx_event_ref ON event_bookings(booking_reference)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_event_status ON event_bookings(status)`);
    });
  });
}

function migrateColumns(tableName, columns, doneCallback) {
  db.all(`PRAGMA table_info(${tableName})`, (err, existingCols) => {
    if (err || !existingCols) {
      if (doneCallback) doneCallback();
      return;
    }

    const existingNames = existingCols.map(c => c.name);
    let pending = columns.length;

    if (pending === 0) {
      if (doneCallback) doneCallback();
      return;
    }

    columns.forEach(col => {
      if (!existingNames.includes(col.name)) {
        db.run(`ALTER TABLE ${tableName} ADD COLUMN ${col.name} ${col.type}`, (alterErr) => {
          if (alterErr) {
            console.error(`Error adding column ${col.name} to ${tableName}:`, alterErr.message);
          } else {
            console.log(`Successfully added column ${col.name} to ${tableName}`);
          }
          pending--;
          if (pending === 0 && doneCallback) doneCallback();
        });
      } else {
        pending--;
        if (pending === 0 && doneCallback) doneCallback();
      }
    });
  });
}

module.exports = db;
