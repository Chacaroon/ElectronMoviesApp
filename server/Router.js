const app   = require('express').Router()
const db    = require('mongoose').connection
const Movies = require('./schemas/movieSchema')
const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/addMovie', (req, res) => {

    let movie = {}

    let busboy = new Busboy({ headers: req.headers })
    busboy.on('file', function(fieldname, file, filename) {
        if (filename) {
            let saveTo = path.join(__dirname, '/public/img/', filename)
            file.pipe(fs.createWriteStream(saveTo))
            movie[fieldname] = filename
        } else {
            file.resume()
        }
    })

    busboy.on('field', function(fieldname, val) {
        movie[fieldname] = val
    })

    busboy.on('finish', function() {
        db.collection('movies').save(new Movies(movie), (err) => {
            if (err) {
                res.send({isSuccess: false, err: err})
            } else {
                Movies.findOne(movie, (err, film) => {
                    err
                        ? res.send({isSuccess: false, err: err})
                        : res.send({isSuccess: true, film: film._doc})
                })
            }
        })
    })
    req.pipe(busboy)
})

app.post('/findFilms', (req, res) => {
    let filmsList = []
    Movies.find(req.body.filters, req.body.sort, (err, films) => {
        films.map((film) => {
            filmsList.push(film._doc)
        })

        err
            ? res.send({isSuccess: false, err: err})
            : res.send({isSuccess: true, filmsList: filmsList})
    })
})

module.exports = app