const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('tests for users', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		await api.post('/api/users').send(helper.initialUsers[0])
		//await User.insertMany(helper.initialUsers)
	})
	test('valid user can be added', async () => {
		const usersAtStart = await helper.usersInDb()
		console.log('start', usersAtStart)
		const newUser = {
			username: 'rami',
			password: 'ramses'
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
		
	})
})

afterAll(() => {
	mongoose.connection.close()
})