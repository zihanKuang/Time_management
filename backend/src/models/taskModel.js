const db = require('../db');

const TaskModel = {
  // Retrieve all tasks from the database
  getAllTasks() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  // Create a new task
  createTask(task) {
    const { title, calendarId, date, completed } = task;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO tasks (title, calendarId, date, completed) 
         VALUES (?, ?, ?, ?)`,
        [title, calendarId, date, completed ? 1 : 0],
        function (err) {
          if (err) return reject(err);
          // Return the newly created task with its auto-generated ID
          resolve({ id: this.lastID, ...task });
        }
      );
    });
  },

  // Update an existing task
  updateTask(id, updatedFields) {
    const { title, completed } = updatedFields;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tasks SET title=?, completed=? WHERE id=?`,
        [title, completed ? 1 : 0, id],
        function (err) {
          if (err) return reject(err);
          // Return the updated task details
          resolve({ id, title, completed });
        }
      );
    });
  },

  // Delete a task by its ID
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
