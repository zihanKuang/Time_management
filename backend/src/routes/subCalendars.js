const express = require('express');
const router = express.Router();
const subCalendarController = require('../controllers/subCalendarController');

// /api/subCalendars
router.get('/', subCalendarController.getAll);
router.post('/', subCalendarController.create);

module.exports = router;
