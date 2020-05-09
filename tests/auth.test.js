const request = require('supertest')
const app = require('../')
const User = require('../model/User')

afterAll(async () => {
  await User.findOneAndDelete({ email: 'test@test.com' })
})

describe('Register', () => {
  it('Register with corect credentials', async () => {
    const res = await request(app).post('/api/user/register').send({
      name: 'Test Test',
      email: 'test@test.com',
      password: 'testtest',
      gender: 'none',
      facebook: 'www.facebook.com/test',
      instagram: 'testtesttest',
      mobile: '+36363603636'
    }, 15000)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('user')
  })

  it('Register without required field', async () => {
    const res = await request(app).post('/api/user/register').send({
      name: 'Test Test',
      email: 'test@test.com',
      password: 'testtest',
      facebook: 'www.facebook.com/test',
      instagram: 'testtesttest',
      mobile: '+36363603636'
    }, 15000)
    expect(res.statusCode).toEqual(400)
  })

  it('Register with existing credentials', async () => {
    const res = await request(app).post('/api/user/register').send({
      name: 'Test Test',
      email: 'test@test.com',
      password: 'testtest',
      gender: 'none',
      facebook: 'www.facebook.com/test',
      instagram: 'testtesttest',
      mobile: '+36363603636'
    }, 15000)
    expect(res.statusCode).toEqual(409)
  })
})

describe('Login', () => {
  it('Login with corect credentials', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'test@test.com',
      password: 'testtest'
    }, 15000)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
  })

  it('Login with incorrect credentials', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'worng@test.com',
      password: 'wrongtest'
    }, 15000)
    expect(res.statusCode).toEqual(400)
  })

  it('Login without required field', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'test@test.com'
    }, 15000)
    expect(res.statusCode).toEqual(400)
  })
})
