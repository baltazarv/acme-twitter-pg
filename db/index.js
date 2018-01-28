const pg = require('pg');
const client = new pg.Client(process.env.DB_URL);
// console.log(process.env.DB_URL);

client.connect();

const SQL_SYNC = `
  DROP TABLE IF EXISTS tweets;
  CREATE TABLE tweets (
    id SERIAL PRIMARY KEY,
    tweet VARCHAR(255)
  );
`;

const SQL_SEED = `
  INSERT INTO tweets(tweet) values('foo');
  INSERT INTO tweets(tweet) values('bar');
  INSERT INTO tweets(tweet) values('bazz');
`;

const sync = (cb) => {
  client.query(SQL_SYNC, cb);
};

const seed = (cb) => {
  client.query(SQL_SEED, cb);
};

const getTweets = (cb) => {
  client.query('SELECT * from tweets', (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

const getTweet = (id, cb) => {
  client.query('SELECT * from tweets WHERE id = $1', [id], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  });
};

module.exports = {
  sync,
  seed,
  getTweets,
  getTweet
};
