const app = require('express').Router()
const db = require('mongoose').connection
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

    let busboy = new Busboy({headers: req.headers})
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

    let busboy = new Busboy({headers: req.headers})
    busboy.on('file', (fieldname, file, filename) => {
        if (filename) {
            let fileName = getRandomInt() + '.jpg'
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
        Movies
            .findOneAndUpdate({id: movie.id}, movie)
            .then(() => {
                res.send({isSuccess: true, film: movie})
            })
            .catch((err) => {
                res.send({isSuccess: false, err: err})
            })
    })
    req.pipe(busboy)
})

app.get('/findFilms', (req, res) => {
    Movies
        .find()
        .then((filmsList) => {
            const filters = mappingFilters(filmsList)

            res.send({isSuccess: true, filmsList: filmsList, filters: filters})
        })
        .catch((err) => {
            res.send({isSuccess: false, err: err})
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

app.get('/getFilters', (req, res) => {
    Movies
        .find()
        .select('year genre')
        .then((filtersList) => {
            const filters = mappingFilters(filtersList)

            res.send({isSuccess: true, filters: filters})
        })
        .catch((err) => {
            res.send({isSuccess: false, err: err})
        })

})

function mappingFilters(filtersArray) {
    const filters = {
        year: []
        , genre: []
    }

    filtersArray.map((filter) => {
        if (filters.year.indexOf(filter.year) === -1) {
            filters.year.push(filter.year)
        }

        if (filters.genre.indexOf(filter.genre) === -1) {
            filters.genre.push(filter.genre)
        }
    })

    return filters
}

function getRandomInt() {
    return Math.floor(Math.random() * 100000)
}

module.exports = app