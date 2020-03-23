const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: String
}, {timestamps: true} )

module.exports = mongoose.model('Tag', tagSchema)


