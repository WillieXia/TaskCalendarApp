// Module Imports
const express = require('express')
const mongoose = require('mongoose')

// Router imports
const authRouter = require('./routes/auth')
const classRouter = require('./routes/class')
const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')

// Configure .env
require('dotenv').config()

// App configuration
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/auth', authRouter)
app.use('/class', classRouter)
app.use('/task', taskRouter)
app.use('/user', userRouter)

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
