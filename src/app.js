const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();


app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Vadim',
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vadim',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Vadim',
    message: 'This is the help message but you will not get any real help here. Stay away from this site.',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided.',
    })
  }
  geocode(req.query.address, (error, {latitude, longitude} = {}) => {
    if (error) {
      return res.send({ error });
    } 
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      res.send({
        address: req.query.address,
        temp: forecastData.current.temperature,
        desc: forecastData.current.weather_descriptions[0],
        rainChance: forecastData.current.precip,
  })
  
  });
})
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term',
    })
  } else {
    res.send({
      products: [],  
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Help page not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
      error: 'Page not found',
  });
})

app.listen(3000, (req, res) => {
  console.log('Server started listening on 3000');
})


