const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRouter = require('./router/taskRouters');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('./api',taskRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});