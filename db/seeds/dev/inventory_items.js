
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('inventory').del()
    .then( ()  => {
      return Promise.all([
        knex('inventory').insert({
            id: 1,
            title: 'boots',
            description: 'womens short brown boots',
            picture_url: 'www.google.com/womensboots',
            price: 10.00
          })
      ])
    })
    .then( () => console.log('seeding done'))
    .catch( (error) => console.log(`Error seeding data: ${error}`));
};
