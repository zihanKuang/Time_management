require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || './src/db/database.db';

// 解析绝对路径，确保不会出现路径问题
const dbFilePath = path.resolve(__dirname, '..', 'db', path.basename(DB_PATH));

// 连接/创建数据库
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('[DB] Failed to connect to SQLite database:', err);
  } else {
    console.log(`[DB] Connected to SQLite database at ${dbFilePath}`);
  }
});

// 在这里执行一次性建表操作，或调用 migrations 文件夹脚本
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
