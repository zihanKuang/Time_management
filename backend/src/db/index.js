require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || './src/db/database.db';

// Resolve the absolute path to ensure no path issues occur
const dbFilePath = path.resolve(__dirname, '..', 'db', path.basename(DB_PATH));

// Connect to or create the SQLite database
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('[DB] Failed to connect to SQLite database:', err);
  } else {
    console.log(`[DB] Connected to SQLite database at ${dbFilePath}`);
  }
});

// Run initialization queries to create tables if they do not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      calendarId TEXT NOT NULL,
      date TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS subCalendars (
      name TEXT PRIMARY KEY
    );
  `);
});

module.exports = db;
