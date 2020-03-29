const mongoose = require('mongoose')
var uuid = require('node-uuid')

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuid.v1 },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    reuired: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'none'],
    default: 'none'
  },
  facebook: {
    type: String,
    rquired: false,
    default: 'none'
  },
  instagram: {
    type: String,
    rquired: false,
    max: 255,
    default: 'none'
  },
  mobile: {
    type: String,
    rquired: false,
    min: 6,
    max: 255,
    default: 'none'
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', userSchema)
