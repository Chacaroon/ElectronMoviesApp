const app   = require('express').Router()
const db    = require('mongoose').connection
const Movies = require('./schemas/movieSchema')
const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/addMovie', (req, res) => {

    let movie = {
        id: getRandomInt()
        , img: 'default'
    }

    let busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename) => {
        if (filename) {
            let fName = movie.id + path.extname(filename)
            let saveTo = path.join(__dirname, '/public/img/', fName)
            file.pipe(fs.createWriteStream(saveTo))
            movie[fieldname] = fName
        } else {
            file.resume()
        }
    })

    busboy.on('field', (fieldname, val) => {
        movie[fieldname] = val
    })

    busboy.on('finish', () => {
        db.collection('movies').save(new Movies(movie), (err) => {
            if (err) {
                res.send({isSuccess: false, err: err})
            } else {
                res.send({isSuccess: true, film: movie})
            }
        })
    })
    req.pipe(busboy)
})

app.post('/editMovie/:id', (req, res) => {

    const id = req.params.id

    let movie = {
        id: id
        , img: 'default'
    }

    let busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename) => {
        if (filename) {
            let fileName = id + '.jpg'
            let saveTo = path.join(__dirname, '/public/img/', fileName)
            file.pipe(fs.createWriteStream(saveTo))
            movie[fieldname] = fileName
        } else {
            file.resume()
        }
    })

    busboy.on('field', (fieldname, val) => {
        movie[fieldname] = val
    })

    busboy.on('finish', () => {
        Movies.findOneAndUpdate({id: movie.id}, movie, (err) => {
            err
                ? res.send({isSuccess: false, err: err})
                : res.send({isSuccess: true, film: movie})
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

function getRandomInt() {
    return Math.floor(Math.random() * 100000)
}

module.exports = app