/*eslint-disable*/
const webpack              = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const Router               = require('./Router')
const config               = require('../webpack.config')
const mongoose             = require('mongoose')
const bodyParser           = require('body-parser')
const morgan               = require('morgan')

const app  = new (require('express'))()
const port = 3000

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(Router)
mongoose.connect('mongodb://Chacaroon:Ukrnet299812@ds133340.mlab.com:33340/heroku_2s9jxmmk', {
	useMongoClient: true
})

const db = mongoose.connection

db.on('error', (err) => {
	console.error(err)
})

db.once('open', () => {
	console.log('DB connected!')

	app.listen(port, function (error) {
		if (error) {
			console.error(error)
		} else {
			console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port) //eslint-disable-line
		}
	})
})