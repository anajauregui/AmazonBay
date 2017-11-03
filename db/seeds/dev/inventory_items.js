
exports.seed = function(knex, Promise) {
  return knex('inventory').del()
    .then( ()  => {
      return knex('inventory').insert([
        {
          id: 1,
          title: 'boots',
          description: 'womens short brown boots',
          picture_url: 'www.google.com/womensboots',
          price: 10.00
        },
        {
          id: 2,
          title: 'boots',
          description: 'womens short brown boots',
          picture_url: 'www.google.com/womensboots',
          price: 10.00
        },
        {
          id: 3,
          title: 'boots',
          description: 'womens short brown boots',
          picture_url: 'www.google.com/womensboots',
          price: 10.00
        },
        {
          id: 4,
          title: 'boots',
          description: 'womens short brown boots',
          picture_url: 'www.google.com/womensboots',
          price: 10.00
        },
        {
          id: 5,
          title: 'boots',
          description: 'womens short brown boots',
          picture_url: 'www.google.com/womensboots',
          price: 10.00
        },
        {
          id: 6,
          title: 'boots',
          description: 'womens short brown boots',
          picture_url: 'www.google.com/womensboots',
          price: 10.00
        }
      ]);
    });
};
