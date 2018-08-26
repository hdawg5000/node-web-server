const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

//Middleware
hbs.registerPartials(__dirname + '/views/partials') // Use partials
app.set('view engine', 'hbs') // Use handlebars templates
app.use(express.static(__dirname + '/public')) //load static web pages

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFileSync('log.txt', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log')
        }
    })
    next()
})

app.use((req, res, next) => {
    res.render('maintenance.hbs')
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    // res.send({
    //     name: 'Andrew',
    //     likes: [
    //         'Beijing',
    //         'Madison'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    })
})

app.get('/about', (req, res) => {
    // res.send('About page')
    res.render('about.hbs', {
        pageTitle: 'About page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
