const Question = require('../models/question')
const User = require('../models/user')

const initialQuestions = [
	{
		question: "Suomen pääkaupunki on?",
		option_a: "Hiekkaharju",
		option_b: "Tampere",
		option_c: "Helsinki",
		option_d: "Turku",
		answer: "Helsinki"
	},
	{
		question: "Riemukaari sijaitsee?",
		option_a: "Pariisissa",
		option_b: "Kanadassa",
		option_c: "Poris",
		option_d: "Raumal",
		answer: "Pariisissa"
	},
	{
		question: "Paras ohjelmointikieli on?",
		option_a: "Javascript",
		option_b: "C",
		option_c: "Python",
		option_d: "Java",
		answer: "C"
	}
]

const listWithOneQuestion = [
	{
		question: "Tiistai on?",
		option_a: "Murekepäivä",
		option_b: "Vappuaatto",
		option_c: "Pääpäivä",
		option_d: "Salaliitto",
		answer: "Murekepäivä"
	}
]

const initialUsers = [
	{
		username: 'Esteri',
		password: 'secret'
	}
]


const questionsInDb = async () => {
	const questions = await Question.find({})
	return questions.map(question => question.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = { initialQuestions,
	initialUsers,
	listWithOneQuestion,
	questionsInDb,
	usersInDb
}