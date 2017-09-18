const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const Router = require('./server/Router')
const config = require('./webpack.config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const express = require('express')

const app = express()
const port = 3000

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'server', 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(Router)
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds133340.mlab.com:33340/heroku_2s9jxmmk`, {
    useMongoClient: true
})

mongoose.Promise = require('bluebird')

const db = mongoose.connection

db.on('error', (err) => {
    console.error(err)
})

db.once('open', () => {
    console.log('==> 🌎  DB connected!')

    app.listen(port, function (error) {
        if (error) {
            console.error(error)
        } else {
            console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
        }
    })
})