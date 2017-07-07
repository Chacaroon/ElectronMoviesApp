const app = require('express').Router()

app.get('/foo', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9000')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.send('bar')
})

module.exports = app