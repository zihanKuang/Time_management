const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/tasks');

// 使用内存数据库或者Mock也可以，这里为简化直接用真实数据库(需注意测试污染)
const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task API', () => {
  it('GET /api/tasks => should return an array of tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/tasks => should create a new task', async () => {
    const newTask = { title: 'Test Task', calendarId: 'Default', date: '2024-12-31' };
    const res = await request(app).post('/api/tasks').send(newTask);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.title).toBe('Test Task');
  });
});
