const router = require('express').Router()
const Question = require('../models/question')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
	await Question.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()
})

module.exports = router