// Module Imports
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// Router imports
const viewRouter = require('./routes/view')
const apiRouter = require('./routes/api')

// Configure .env
require('dotenv').config()

// App configuration
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(express.static(__dirname + '/views'))
app.set('view-engine', 'ejs')
app.use('/', viewRouter)
app.use('/api/', apiRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, () => {
  console.log('Connected to MongoDB...')
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
