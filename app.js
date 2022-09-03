const express = require('express')
const app = express()
const cors = require('cors')
const questionsRouter = require('./controllers/questions')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const config = require('./utils/config')




mongoose.connect(config.MONGODB_URI).then(() => {
	console.log('connected to MongoDB')
}).catch((error) => {
	console.log('herja:', error)
})

app.use(cors())
app.use(express.json())

app.use('/api/questions', questionsRouter)
app.use('/api/users', usersRouter)

module.exports = app