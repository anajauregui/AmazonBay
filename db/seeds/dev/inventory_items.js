
exports.seed = function(knex, Promise) {
  return knex('inventory').del()
    .then( ()  => {
      return knex('inventory').insert([
        {
          id: 1,
          title: 'Volkl Kenja Skis - Women\s - 2016/2017',
          description: 'With easy, playful handling and powerful edge grip, stability and frontside performance, this "one ski quiver" will take you from the corduroy all the way to the powdery bowls on the backside.',
          picture_url: 'https://www.rei.com/media/product/107957',
          price: 490.00
        },
        {
          id: 2,
          title: 'Nordica Hot Rod XW Ski Boots - Women\s',
          description: 'The shell is the solid outer layer of the ski boot, and is made of two parts, the lower shell and the cuff. The lower shell is the part where your foot is contained, and the cuff is the part that goes around your shin and lower leg.',
          picture_url: 'https://s-media-cache-ak0.pinimg.com/originals/73/5e/af/735eafd164d8aae6c51bbe3e556d21ef.jpg',
          price: 200.00
        },
        {
          id: 3,
          title: 'North Face Freedom LRBC Insulated Pants',
          description: 'Keep warm with these stylish insulated ski pants as you enjoy turns down the slopes, available in a variety of colors and sizes.',
          picture_url: 'https://ae01.alicdn.com/kf/HTB10E3BMXXXXXb_XXXXq6xXFXXXo/Gsou-snow-ski-pants-women-s-snowboard-pants-waterproof-womens-breathable-windproof-pants-sport-outdoor-skiing.jpg_640x640.jpg',
          price: 75.00
        },
        {
          id: 4,
          title: 'Red Helmet',
          description: 'Protective ski equipment, protect yourself with this red telegraph helmet with headphone accessibility.',
          picture_url: 'http://i.telegraph.co.uk/multimedia/archive/01295/ski-helmet_1295387c.jpg',
          price: 230.00
        },
        {
          id: 5,
          title: 'Expedition Ski poles',
          description: 'Expedition ski poles - Black Diamond, available in variety of heights, one of a pair of lightweight poles used in skiing that have a handgrip and usually a wrist strap at one end and an encircling disk set above the point at the other end.',
          picture_url: 'http://demandware.edgesuite.net/sits_pod49/dw/image/v2/AAKN_PRD/on/demandware.static/-/Sites-bdel/default/dw584f969c/products/ski_poles/111518_expedition_fl_ext_web.jpg?sw=472',
          price: 60.00
        },
        {
          id: 6,
          title: 'Men\s ski jacket',
          description: 'The essential ski gear - whether your\e a first-time skier or a regular skier, finding the right jacket is a key to a fun, exciting day on the slopes. There are plenty of options and colors.',
          picture_url: 'http://winterninja.com/wp-content/uploads/2016/09/ski-gear6.jpg',
          price: 215.00
        }
      ]);
    });
};
