const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: String,
    description: String,
    rating: Number
})

export default mongoose.model('Movie', movieSchema)