require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // 确保先初始化数据库

const taskRoutes = require('./routes/tasks');
const subCalendarRoutes = require('./routes/subCalendars');

const app = express();
const PORT = process.env.PORT || 4000;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/tasks', taskRoutes);
app.use('/api/subCalendars', subCalendarRoutes);

// 部署时，如果你想让后端也能 serve 前端build
// 可以这样让后端serve静态文件(可选)
// const buildPath = path.join(__dirname, '../../frontend/build');
// app.use(express.static(buildPath));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT}`);
});
