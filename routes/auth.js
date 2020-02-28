const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../model/User')
const { registrationValidation } = require('../validation')

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
    password: hashedPassword
  })

  try {
    await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
