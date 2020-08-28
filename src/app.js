
const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'hbs')

// Using a static page for the site
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

app.listen(3000, () => {
    console.log('Server up on port 3000')
})
