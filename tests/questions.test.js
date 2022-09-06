const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Question = require('../models/question')
const User = require('../models/user')

const api = supertest(app)

// let headers

describe('tests for questions', () => {
	beforeEach(async () => {
		//await User.deleteMany({})
		await Question.deleteMany({})
		// const users = helper.initialUsers

		// const testUser = users[0]
		// console.log('Testeri', testUser)
		// await api.post('/api/users').send(testUser)
		// const login = await api.post('/api/login').send(testUser)
		// const token = login.body.token
		// headers = {
		// 	'Authorization': `bearer ${token}`
		// }
		for (let question of helper.initialQuestions) {
			await api.post('/api/questions').send(question)
		}
	})
	
	test('questions are returned as json', async () => {
		await api.get('/api/questions').expect(200)
			.expect('Content-Type', /application\/json/)
	})
	
	test('all questions are returned', async () => {
		const response = await api.get('/api/questions')
		const questions = response.body
		expect(questions).toHaveLength(helper.initialQuestions.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
