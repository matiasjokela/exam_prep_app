const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('tests for login', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		await helper.insertInitialUsers()
	})
	test('existing user can log in and is given a token', async () => {
		const users = await helper.usersInDb()
		const testUser = {
			username: 'Esteri',
			password: 'secret'
		}
		const login = await api.post('/api/login').send(testUser).expect(200)
		const token = login.body.token
		expect(token).toBeDefined()

	})
	test('invalid attempt returns 401 or 400', async () => {
		let login
		let token
		let wrongUser
		wrongUser = {
			username: 'Esteri',
			password: 'sescret'
		}
		login = await api.post('/api/login').send(wrongUser).expect(401)
		token = login.body.token
		expect(token).not.toBeDefined()
		wrongUser = {
			username: 'Kalle',
			password: 'kaarle'
		}
		login = await api.post('/api/login').send(wrongUser).expect(401)
		token = login.body.token
		expect(token).not.toBeDefined()
		wrongUser = {
			username: 'Esteri'
		}
		login = await api.post('/api/login').send(wrongUser).expect(400)
		token = login.body.token
		expect(token).not.toBeDefined()
		
	})
})

afterAll(() => {
	mongoose.connection.close()
})