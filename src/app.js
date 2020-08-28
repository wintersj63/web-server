const path = require('path')
const express = require('express')

const app = express()

// Using a static page for the site
app.use(express.static(path.join(__dirname, '../public')))

app.get('/weather', (req, res)=> {
    res.send({
        forecast: 'clear',
        location: 'Ankeny'
    })
})

app.listen(3000, () => {
    console.log('Server up on port 3000')
})
