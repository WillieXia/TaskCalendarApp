const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

// Setup environmenta variables
require('dotenv').config();

// App declarations
const app = express();
const PORT = process.env.PORT || 4200;

// Setting up dependencies 
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
)

// Conneting routes
app.use('/auth', require('./routes/auth'));
app.use('/list', require('./routes/list'));
app.use('/task', require('./routes/task'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})