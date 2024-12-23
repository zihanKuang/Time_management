const TaskModel = require('../models/taskModel');

const taskController = {
  // GET /api/tasks
  async getAll(req, res) {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.json({ success: true, data: tasks });
    } catch (error) {
      console.error('[TaskController] getAll error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // POST /api/tasks
  async create(req, res) {
    try {
      const { title, calendarId, date, completed } = req.body;
      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: 'Title is required' });
      }
      const newTask = await TaskModel.createTask({ title, calendarId, date, completed });
      res.json({ success: true, data: newTask });
    } catch (error) {
      console.error('[TaskController] create error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // PUT /api/tasks/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedFields = req.body; // 包含 title, completed 等
      const updatedTask = await TaskModel.updateTask(id, updatedFields);
      res.json({ success: true, data: updatedTask });
    } catch (error) {
      console.error('[TaskController] update error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // DELETE /api/tasks/:id
  async remove(req, res) {
    try {
      const { id } = req.params;
      await TaskModel.deleteTask(id);
      res.json({ success: true, message: `Task ${id} deleted.` });
    } catch (error) {
      console.error('[TaskController] remove error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = taskController;
