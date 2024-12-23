const db = require('../db');

const SubCalendarModel = {
  // Retrieve all sub-calendars from the database
  getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM subCalendars', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Create a new sub-calendar
  create(name) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO subCalendars (name) VALUES (?)`, [name], function (err) {
        if (err) return reject(err);
        resolve({ name });
      });
    });
  }
};

module.exports = SubCalendarModel;
