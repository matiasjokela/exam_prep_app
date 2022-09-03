const usersRouter = require('express').Router()
const { response } = require('express')
//const { response } = require('express')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const body = request.body
	//const users = await User.find({})
	const newUser = new User({
		username: body.username,
		name: body.name,
		password: body.password
	})
	const savedUser = await newUser.save()
	response.json(savedUser)
})





module.exports = usersRouter