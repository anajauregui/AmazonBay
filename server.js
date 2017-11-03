const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// app.use(requireHTTPS);

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'amazonBay';

app.get('/', (request, response) => {
  response.send('Welcome to amazonBay!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/', (request, response) => {
  database('inventory')
  .select()
  .then(items => response.status(200).json(items))
  .catch(error => response.status(500).json({error}))
})

app.post('/api/v1/order_history', (request, response) => {
  database('order_history').insert({
    total_price: request.body.total_price,
    date: request.body.date,
  }, '*')
  .then(order_historyID => {
    response.status(201).json(order_historyID)
  })
  .catch(error =>  {
    response.status(500).json(error)
  })
})


module.exports = app;
