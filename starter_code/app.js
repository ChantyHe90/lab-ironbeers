const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

hbs.registerPartials(__dirname + '/views/beers.hbs');

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then(beers => {
      res.render('beers');
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
});

// app.get('/gallery', (request, response, next) => {
//   response.sendFile(__dirname + '/views/gallery.html');
// });


app.listen(3000);
