const express = require('express')
const app = express()
const cors = require('cors')
const questionsRouter = require('./controllers/questions')
const mongoose = require('mongoose')

require('dotenv').config() // move this to separate config file



mongoose.connect(process.env.MONGODB_URI).then(() => {
	console.log('connected to MongoDB')
}).catch((error) => {
	console.log('herja:', error)
})

app.use(cors())
app.use(express.json())

app.use('/api/questions', questionsRouter)

module.exports = app