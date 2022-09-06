const questionsRouter = require('express').Router()
const Question = require('../models/question')

questionsRouter.get('/', async (request, response) => {
	const questions = await Question.find({})
	response.json(questions)
})

questionsRouter.get('/:id', async (request, response) => {
	const question = await Question.findById(request.params.id)
	if (question) {
		response.json(question)
	} else {
		response.status(404).end()
	}
})

/* Only admin should be able to post or delete questions => add that */
questionsRouter.post('/', async (request, response) => {
	const body = request.body
	if (!(body.question && body.option_a && body.option_b && body.option_c &&
		body.option_d && body.answer)) {
			return response.status(400).json({
				error: "Anna arvo kaikille kentille"
			})
		}
	const question = new Question({
		question: body.question,
		option_a: body.option_a,
		option_b: body.option_b,
		option_c: body.option_c,
		option_d: body.option_d,
		answer: body.answer
	})
	const savedQuestion = await question.save()
	response.status(201).json(savedQuestion)
})

/* Only admin should be able to post or delete questions => add that */
questionsRouter.delete('/:id', async (request, response) => {
	const question = await Question.findById(request.params.id)
	if (question) {
		await Question.findByIdAndRemove(request.params.id)
	}
	response.status(204).end()

})


module.exports = questionsRouter