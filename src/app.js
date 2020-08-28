const express = require('express')
const { response } = require('express')

const app = express()

// app.com
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req, res)=> {
    res.send('Help page')
})

app.get('/about', (req, res)=> {
    res.send('about page')
})

app.get('/weather', (req, res)=> {
    res.send('Weather page')
})

app.listen(3000, () => {
    console.log('Server up on port 3000')
})
