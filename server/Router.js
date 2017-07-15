const app   = require('express').Router()
const db    = require('mongoose').connection
const Movies = require('./schemas/movieSchema')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/addMovie', (req, res) => {
    const movie = new Movies({
        title: req.body.title,
        description: req.body.description,
        rating: +req.body.rating,
        year: req.body.year,
        genre: req.body.genre
    })

    db.collection('movies').save(movie, (err) => {
        err
            ? res.send({isSuccess: false, err: err})
            : res.send({isSuccess: true, film: movie})
    })
})

app.post('/findFilms', (req, res) => {
    let filmsList = []
    Movies.find(req.filters, req.sort, (err, films) => {
        films.map((film) => {
            filmsList.push(film._doc)
        })

        err
            ? res.send({isSuccess: false, err: err})
            : res.send({isSuccess: true, filmsList: filmsList})
    })
})

module.exports = app