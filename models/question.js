const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
	header: String,
	question: String,
	option_a: String,
	option_b: String,
	option_c: String,
	option_d: String,
	answer: String,
	category: String
})

questionSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Question', questionSchema)