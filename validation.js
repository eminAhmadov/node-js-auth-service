/* eslint-disable no-useless-escape */
const Joi = require('@hapi/joi')

// Registration validation
const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(255),
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(6).max(1024),
    gender: Joi.string().valid('male', 'female', 'none').required(),
    facebook: Joi.string().required().regex(/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/),
    instagram: Joi.string().required().max(255),
    mobile: Joi.string().regex(/[\+]{0,1}(\d{10,13}|[\(][\+]{0,1}\d{2,}[\13)]*\d{5,13}|\d{2,6}[\-]{1}\d{2,13}[\-]*\d{3,13})/)
  })

  return schema.validate(data)
}

// Registration validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(6).max(1024)
  })

  return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation
