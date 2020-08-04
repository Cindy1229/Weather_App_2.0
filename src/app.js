const express = require('express');
const app = express();
const hbs = require('hbs');

const port=process.env.PORT || 3000;

//Export functions
const geoCode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

// Paths for express config
const path = require('path');
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cindy'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Cindy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Send me an email to conatct me!!',
        title: 'Help Page',
        name: 'Cindy'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'please enter address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error) {
            return res.send({
               error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            console.log(forecastData);
            res.send({
                location,
                forecastData
            });
        })
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errorText: 'Help not found.',
        title: 'OOPS!',
        name: 'Cindy'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorText: 'Page not found.',
        title: 'OOPS!',
        name: 'Cindy'
    })
})

//satrt up the server
app.listen(port, () => {
    console.log('server is up on port 3000');
})