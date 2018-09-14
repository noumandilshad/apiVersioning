const {
    Client
  } = require('pg');

const pg = new Client({
    user: 'nouman',
    host: '127.0.0.1',
    database: 'quickpay-db',
    password: 'nouman1122',
    port: '5432'});

pg.connect();


module.exports = pg;