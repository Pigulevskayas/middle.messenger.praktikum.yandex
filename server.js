const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'pug');

app.listen(PORT, function(argument) {
	console.log(`dev listen PORT ${PORT}`)
})

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registration', (req, res) => {
  res.render('registration');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});