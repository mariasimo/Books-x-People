const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    comment: String,
    author: String,
    recommendedBy: String
})

module.exports = mongoose.model('Book', bookSchema)


