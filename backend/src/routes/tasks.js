const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// /api/tasks
router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.remove);

module.exports = router;
