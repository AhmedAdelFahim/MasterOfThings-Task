const request = require('supertest');
const app = require('../index');
const models = require('../models/index')
const { setupDatabase, userOne } = require('./utils')
beforeAll(setupDatabase)
let sessionId;
test('Should signup a new user', async () => {
    const response = await request(app).post('/auth/users/signup').send(userOne).expect(201)

    // Assertions about the response
    expect(response.body).toMatchObject({
        message:"You Registered Successfully."
    })
})

test('Should login existing user', async () => {
    const response = await request(app).post('/auth/users/signin').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    sessionId = response.body.sessionId
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/auth/users/signin').send({
        email: userOne.email,
        password: 'sdfsdf'
    }).expect(401)
})


test('Should not get last login dates  for unauthenticated user', async () => {
    const data = await request(app).get('/users').expect(403)
})

test('Should get last login dates  for authenticated user', async () => {
    const data = await request(app).get('/users').set('session-id',sessionId).expect(200)
})
