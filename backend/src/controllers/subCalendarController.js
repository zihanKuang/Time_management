const SubCalendarModel = require('../models/subCalendarModel');

const subCalendarController = {
  // GET /api/subCalendars
  async getAll(req, res) {
    try {
      const subCalendars = await SubCalendarModel.getAll();
      res.json({ success: true, data: subCalendars });
    } catch (error) {
      console.error('[SubCalendarController] getAll error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // POST /api/subCalendars
  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: 'Name is required' });
      }
      const newCalendar = await SubCalendarModel.create(name);
      res.json({ success: true, data: newCalendar });
    } catch (error) {
      console.error('[SubCalendarController] create error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = subCalendarController;
