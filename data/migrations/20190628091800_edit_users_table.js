exports.up = function(knex, Promise) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (exists) {
      return knex.schema.table('users', function(tbl) {
        tbl.dropUnique('username')
        tbl.renameColumn('username', 'name');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(tbl) {
    tbl.renameColumn('name', 'username');
    tbl.unique('username')
  });
};