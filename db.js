const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite'
  },
  useNullAsDefault: true
});

// إنشاء جدول المستخدمين
knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('password');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
});

module.exports = knex;