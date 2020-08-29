
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup a static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Author Unknown'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Author Unknown'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Author Unknown', 
        helpText: 'This is the help page!'
    })
})

app.get('/weather', (req, res)=> {
    res.send({
        forecast: 'clear',
        location: 'Ankeny'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'HTTP 404 Help Error',
        name: 'unknown',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'HTTP 404 Error',
        name: 'unknown',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server up on port 3000')
})
