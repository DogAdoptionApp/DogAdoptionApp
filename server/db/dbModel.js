const { Pool } = require('pg');

const PG_URI = 'postgres://qyazdahc:P95829_oExlImmM-X66pUot7JZIJMFeU@heffalump.db.elephantsql.com/qyazdahc'

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};