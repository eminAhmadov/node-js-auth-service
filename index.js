const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Import routes
const authRoute = require('./routes/auth')

// Configuring environment variables
dotenv.config()

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connceted to Mongo DB'))

// Middleware
app.use(express.json())

// Route middlewares
app.use('/api/user', authRoute)

app.listen(3000, () => console.log('Started Auth service'))

module.exports = app
