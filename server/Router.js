const app   = require('express').Router()
const db    = require('mongoose').connection
const Movie = require('./schemas/movieSchema')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/addMovie', (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        rating: +req.body.rating,
        year: req.body.year,
        genre: req.body.genre
    })

    db.collection('movies').save(movie, (err) => {
        err
            ? res.send({isSuccess: false, err: err})
            : res.send({isSuccess: true})
    })
})

/*app.get(/\/:year(\/:genre(\/:request)?)?\?type=search$/, (req, res) => {

    const year = +req.params.year || undefined
    let genre;
    if (!req.params.genre || req.params.genre === 'any') {
        genre = undefined
    } else {
        genre = req.params.genre
    }
    // const request = req.params.request

    db.collection('movies').find({year: year, genre: genre}, (err, data) => {
        err
            ? res.send({isSuccess: false, err: err})
            : res.send({isSuccess: true, data: data})
    })
})*/

module.exports = app