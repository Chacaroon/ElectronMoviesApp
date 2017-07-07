/*eslint-disable*/
const express = require('express')
const app     = express()

const mongoose   = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const Router     = require('./Router')

const db = mongoose.connection

mongoose.connect('mongodb://Chacaroon:Ukrnet299812@ds133340.mlab.com:33340/heroku_2s9jxmmk', {
    useMongoClient: true
})

db.on('error', (err) => {
    console.error(err)
})

db.once('open', () => {
    console.log('DB connected!')
    app.listen(3000, () => {
        console.log('Server started on port 3000!')
    })
})

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(Router)