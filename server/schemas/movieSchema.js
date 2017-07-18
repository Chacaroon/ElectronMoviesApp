const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: String,
    description: String,
    rating: {
        type: Number,
        isRequired: false
    },
    genre: String,
    year: Number,
    date: {
        type: Date,
        default: Date.now()
    },
    img: {
        type: String,
        default: 'default.jpg'
    }
})

module.exports = mongoose.connection.model('Movie', movieSchema)