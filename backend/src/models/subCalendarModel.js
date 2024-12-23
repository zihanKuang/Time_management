const db = require('../db');

const SubCalendarModel = {
  // 获取全部子日历
  getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM subCalendars', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // 新增子日历
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
