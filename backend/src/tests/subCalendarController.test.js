const request = require('supertest');
const express = require('express');
const subCalendarRoutes = require('../routes/subCalendars');
const db = require('../db');

// 创建 Express 应用并挂载路由
const app = express();
app.use(express.json());
app.use('/api/subCalendars', subCalendarRoutes);

// 清理数据库
beforeEach(async () => {
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM subCalendars', [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe('SubCalendar API', () => {
  it('POST /api/subCalendars => should create a new subCalendar', async () => {
    const calendarName = { name: `NewCalendar-${Date.now()}` }; // 保证唯一性
    const res = await request(app).post('/api/subCalendars').send(calendarName);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data.name).toBe(calendarName.name);
  });
});
