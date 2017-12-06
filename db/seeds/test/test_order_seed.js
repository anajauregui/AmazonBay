
exports.seed = (knex, Promise) => {
  return knex('order_history').del()
    .then(() => {
      return knex('order_history').insert([
        {id: 1, order_total: 445.00},
        {id: 2, order_total: 275.00},
        {id: 3, order_total: 690.00}
      ]);
    });
};
