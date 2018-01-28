const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes/tweets');
const morgan = require('morgan');

const port = process.env.PORT || 3000;
const app = express();
const db = require('./db');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('*', routes);

db.sync((err) => {
  if (err) console.log(err);
  db.seed((err) => {
    if (err) console.log(err);
  });
});

app.listen(port, () => {
  console.log(`Go to http://localhost:${port}`);
});
