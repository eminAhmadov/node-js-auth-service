const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const { registrationValidation, loginValidation } = require('../validation')

// Registration
router.post('/register', async (req, res) => {
  // Validation
  const { error } = registrationValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Checking for duplicate entry
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) {
    return res.status(400).send('Email already exists')
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Creation of a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    mobile: req.body.mobile
  })

  try {
    await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

// Log In
router.post('/login', async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Checking if user exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Email or password is wrong')
  }

  // Checking if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Email or password is wrong')
  }

  // Creating and assigning JSON Web Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router
