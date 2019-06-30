exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // we must use the callback syntax for .createTable()
    tbl.increments();

    tbl
      .string('username')
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};