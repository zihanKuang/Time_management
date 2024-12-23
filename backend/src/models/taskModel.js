const db = require('../db');

const TaskModel = {
  // 获取所有任务
  getAllTasks() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  // 新增任务
  createTask(task) {
    const { title, calendarId, date, completed } = task;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO tasks (title, calendarId, date, completed) 
         VALUES (?, ?, ?, ?)`,
        [title, calendarId, date, completed ? 1 : 0],
        function (err) {
          if (err) return reject(err);
          // this.lastID是SQLite插入后的自增ID
          resolve({ id: this.lastID, ...task });
        }
      );
    });
  },

  // 更新任务
  updateTask(id, updatedFields) {
    // 这里只演示更新title, completed
    const { title, completed } = updatedFields;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tasks SET title=?, completed=? WHERE id=?`,
        [title, completed ? 1 : 0, id],
        function (err) {
          if (err) return reject(err);
          resolve({ id, title, completed });
        }
      );
    });
  },

  // 删除任务
  deleteTask(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id=?', [id], function (err) {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
};

module.exports = TaskModel;
