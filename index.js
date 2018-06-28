const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Jay',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, resp) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * FROM pokemon';

  pool.query(queryString, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {
      console.log('query result:', res);

      let context = {pokemon : res.rows};
      resp.render('Home', context);

    // redirect to home page
    }
  });
});


app.get('/pokemon/new', (req, resp) => {
  // respond with HTML page with form to create new pokemon
  resp.render('New');
});


app.get('/pokemon/:id', (req, resp) => {
  // Get specific pokemon by primary ID

  const queryString = `SELECT * FROM pokemon WHERE id = ${req.params.id}`;

  pool.query(queryString, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {
      console.log('query result:', res);

      let context = {pokemon : res.rows[0]};
      resp.render('Pokemon', context);

    }
  });
});


app.post('/pokemon', (req, resp) => {
  let params = req.body;
  console.log(`this is params: ${params}`);
  const queryString = 'INSERT INTO pokemon(num, name, img, height, weight) VALUES($1, $2, $3, $4, $5)';
  const values = [params.num, params.name, params.img, params.height, params.weight];

  pool.query(queryString, values, (err, res) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', res);

      // redirect to home page
      resp.redirect('/');
    }
  });
});


app.get('/pokemon/:id/edit', (req, resp) => {

  const queryString = `SELECT * FROM pokemon WHERE id = ${req.params.id}`;
  
  pool.query(queryString, (err, res) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', res);

      let context = {pokemon : res.rows[0]};
      resp.render('Edit', context);
    }
  });
});


app.put('/pokemon/edit/:id', (req, resp) => {

  let pokemonEdit = req.body;

  const queryString = 'UPDATE pokemon SET num=$1, name=$2, img=$3, height=$4, weight=$5 WHERE id = $6';
  const values = [pokemonEdit.num, pokemonEdit.name, pokemonEdit.img, pokemonEdit.height, pokemonEdit.weight, req.params.id];


  pool.query(queryString, values, (err, res) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', res);

      resp.redirect(`/pokemon/${req.params.id}`);
    }
  });
});


app.delete('/pokemon/edit/:id', (req, resp) => {

  const queryString = `DELETE from pokemon WHERE id = ${req.params.id}`;

  pool.query(queryString, (err, res) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', res);

      resp.redirect('/');
    }
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
