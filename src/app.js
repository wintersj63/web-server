
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

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
    
    if(!(req.query.address)){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location, 
                address: req.query.address
            })
          })
    }) 
})

app.get('/products', (req, res)=> {
    
    if(!(req.query.search)){
      return res.send({
            error: 'You must provide a search here'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
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

app.listen(port, () => {
    console.log('Server up on port 3000')
})
