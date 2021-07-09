const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');

app.listen(PORT, function(argument) {
	console.log(`dev listen PORT ${PORT}`)
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login.pug', (req, res) => {
  res.render('login');
});

app.get('/registration.pug', (req, res) => {
  res.render('registration');
});

app.get('/profile.pug', (req, res) => {
  res.render('profile');
});

app.get('/error404.pug', (req, res) => {
  res.render('error404');
});

app.get('/error500.pug', (req, res) => {
  res.render('error500');
});

app.use(express.static(path.join(__dirname, 'public')));