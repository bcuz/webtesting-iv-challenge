const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  // findById,
  getAll,
};

function getAll() {
  return db('users');
}

async function insert(user) {
  return db('users').insert(user)

}