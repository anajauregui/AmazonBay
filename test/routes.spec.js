const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should return the homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.should.include('Amazon Bay');
        done();
      });
  });

  it('should return a 404 for route that does not exist', (done) => {
    chai.request(server)
      .get('/stuff')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API Routes', () => {

  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => console.log(error));
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => console.log(error));
  });

  describe('GET /api/v1/inventory', () => {
    it('should retrieve all saved inventory items', (done) => {
      chai.request(server)
        .get('/api/v1/inventory')
        .end( (error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(6);
          response.body[0].should.have.property('id')
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('title')
          response.body[0].title.should.equal('Volkl Kenja Skis - Women\s - 2016/2017');
          response.body[0].should.have.property('description')
          response.body[0].description.should.equal('With easy, playful handling and powerful edge grip, stability and frontside performance, this "one ski quiver" will take you from the corduroy all the way to the powdery bowls on the backside.');
          response.body[0].should.have.property('picture_url')
          response.body[0].picture_url.should.equal('https://www.rei.com/media/product/107957');
          response.body[0].should.have.property('price')
          response.body[0].price.should.equal('490.00');
          done();
        });
    });
  });

  describe('GET /api/v1/order_history', () => {
    it('should retrieve all saved purchases in order history', (done) => {
      chai.request(server)
        .get('/api/v1/order_history')
        .end( (error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('order_total');
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
          done();
        });
    });
  });

  describe('POST /api/v1/order_history', () => {
    it('should add new order to order history', (done) => {
      chai.request(server)
        .post('/api/v1/order_history')
        .send({ order_total: 550.00 })
        .end( (error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('order_total');
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');

          chai.request(server)
          .get('/api/v1/order_history')
          .end( (error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.length.should.equal(4);
            done();
          });
        });
      });

    })
  })
