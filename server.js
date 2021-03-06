const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init MiddleWare
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/members', require('./routes/api/members'));

app.get('/', (req, res) => {
  res.send('Delta Exchange Api Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
