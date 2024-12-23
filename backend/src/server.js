require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Ensure the database is initialized before using

const taskRoutes = require('./routes/tasks');
const subCalendarRoutes = require('./routes/subCalendars');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/tasks', taskRoutes); // Task-related endpoints
app.use('/api/subCalendars', subCalendarRoutes); // Sub-calendar-related endpoints

// Start the server
app.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT}`);
});
