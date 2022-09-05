const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('tests for login', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		await User.insertMany(helper.initialUsers)
	})
	test('existing user can log in and is given a token', async () => {
		const testUser = {
			'username': 'Esteri',
			'password': 'secret'
		}
		const login = await api.post('/api/login').send(testUser)
		const token = login.body.token
		console.log('login', login.body)
		console.log('token', token)

	})
	test('invalid attempt returns 401', async () => {
		
	})
})