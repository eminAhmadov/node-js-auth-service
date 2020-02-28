const Joi = require('@hapi/joi')

// Registration validation
const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(255),
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(6).max(1024)
  })

  return schema.validate(data)
}

// Registration validation
const loginValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(255),
    email: Joi.string().required().min(6).max(255).email()
  })

  return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation
