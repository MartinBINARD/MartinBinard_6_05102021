const dotenv = require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const usersRoutes = require('./routes/users');

// ADD MONGOOSE
mongoose.connect(process.env.DB_HOST,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection to MongoDB successful !'))
  .catch(() => console.log('Connection to MongoDB failed !'));

const app = express();

app.use(helmet);
// ADD HEADERS FOR CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// GIVE IMAGE DIRECTORY PATH
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', usersRoutes);

module.exports = app;