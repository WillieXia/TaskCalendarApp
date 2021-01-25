const express = require('express');
const session = require('express-session');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// Setup environmenta variables
require('dotenv').config();

// App declarations
const app = express();
const PORT = process.env.PORT || 4200;

// Setting up parsers 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Setting up cors
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true
};
app.use(cors(corsOptions))

// Setting up sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("Unable to connect to MongoDB"))

// Conneting routes
app.use('/auth', require('./routes/auth'));
app.use('/list', require('./routes/list'));
app.use('/task', require('./routes/task'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})