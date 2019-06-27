const knex = require('knex');
const config = require('../knexfile.js');

// production or test or dev
const environment = process.env.NODE_ENV || process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);
