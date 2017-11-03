
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('inventory', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.string('picture_url');
      table.decimal('price');
      table.timestamps(true, true);
  }),

    knex.schema.createTable('order_history', (table) => {
      table.increments('id').primary();
      table.decimal('order_total');
      table.timestamps(true, true);
  })
]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('order_history'),
    knex.schema.dropTable('inventory')
  ])
};
