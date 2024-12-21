const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`./tasks.db`);

//初始化任务表
db.serialize(()=>{
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            calendarId TEXT DEFAULT 'Default',
            date TEXT NOT NULL
        )
    `);
});

module.exports=db;