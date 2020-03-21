const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    comment: String,
    author: String,
    recommendedBy: String,
    moderated: Boolean,
    published: Boolean,
    height: String,
    width: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
})

module.exports = mongoose.model('Book', bookSchema)


