const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: String,
    description: String,
    rating: {
        type: Number,
        isRequired: false
    }
})

module.exports = mongoose.connection.model('Movie', movieSchema)