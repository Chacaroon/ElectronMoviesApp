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
        , img: 'default.jpg'
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
        if (fieldname === 'img') {
            movie[fieldname] = path.basename(val)
        } else {
            movie[fieldname] = val
        }
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
        , img: 'default.jpg'
    }

    let busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename) => {
        if (filename) {
            let fileName = id + '.jpg'
                , saveTo = path.join(__dirname, '/public/img/', fileName)
            file.pipe(fs.createWriteStream(saveTo))
            movie[fieldname] = fileName
        } else {
            file.resume()
        }
    })

    busboy.on('field', (fieldname, val) => {
        if (fieldname === 'img') {
            movie[fieldname] = path.basename(val)
        } else {
            movie[fieldname] = val
        }
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

app.get('/findFilms', (req, res) => {
    let filmsList = []
    Movies.find({}, (err, films) => {
        films.map((film) => {
            filmsList.push(film._doc)
        })

        err
            ? res.send({isSuccess: false, err: err})
            : res.send({isSuccess: true, filmsList: filmsList})
    })
})

app.post('/sortFilms', (req, res) => {
    const {field, val} = req.body
    Movies
        .where(field).equals(val)
        .sort('-date')
        .then((filmsList) => {
            res.send({isSuccess: true, filmsList: filmsList})
        })
        .catch((err) => {
            res.send({isSuccess: false, err: err})
        })
})

function getRandomInt() {
    return Math.floor(Math.random() * 100000)
}

module.exports = app