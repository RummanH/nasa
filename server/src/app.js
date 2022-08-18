const path = require('path');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const apiV1Routes = require('./routes/api_v1');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/v1', apiV1Routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
