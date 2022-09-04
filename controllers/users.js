const usersRouter = require('express').Router()
const { response } = require('express')
//const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const { username, password } = request.body
	if (!username || !password) {
		return response.status(400).json({
			error: 'Anna käyttäjätunnus ja salasana'
		})
	}
	if (username.length < 3) {
		return response.status(400).json({
			error: 'Käyttäjätunnuksen tulee olla vähintään kolme merkkiä pitkä'
		})
	}
	if (password.length < 6) {
		return response.status(400).json({
			error: 'Salasanan tulee olla vähintään kuusi merkkiä pitkä'
		})
	}
	if (await User.findOne({ username })) {
		return response.status(400).json({
			error: 'Käyttäjätunnus varattu'
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	const newUser = new User({
		username: username,
		passwordHash: passwordHash 
	})
	const savedUser = await newUser.save()
	response.json(savedUser)
})

module.exports = usersRouter