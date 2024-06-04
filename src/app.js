const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
// app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name : 'prit'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Me',
        name : 'Prit me'
    })
})

app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })


})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide search'
        })
    }
    geocode(req.query.address, (error,{ latitude, longitude, location } = {}) => {

        if(error) {
            return res.send({ error})
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }   
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    });

  
})


app.get('/help', (req, res) => {
    res.render('help',{
        title: 'help',
        help: 'I am here to help you',
        name : 'prit'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {errorTitle:'Help artical not found'})
})

app.get('*', (req, res) => {
    res.render('404', {errorTitle:'My 404 page'})
})

app.listen(3000, () => {
    console.log('Server is up on 3000');
})