var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {

    it('should list items on get', function(done) {
    	chai.request(app)
    		.get("/items")
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
    			res.body.should.be.a('array');
    			res.body.should.have.length('3');
    			res.body[0].should.be.a('object');
    			res.body[0].should.have.property('id');
    			res.body[0].should.have.property('name');
    			res.body[0].id.should.be.a('number');
    			res.body[0].name.should.be.a('string');
    			res.body[0].name.should.equal('Broad Beans');
    			res.body[1].name.should.equal('Tomatoes');
    			res.body[2].name.should.equal('Peppers');
    			done();
    		});
    });

    it('should add an item on post', function(done) {
    	chai.request(app)
    		.post('/items')
    		.send({'name': 'Kale'})
    		.end(function(err, res) {
    			res.should.have.status(200);
    			res.should.be.json;
    			res.body.should.be.a('object');
    			res.body.should.have.property('name');
    			res.body.should.have.property('id');
    			res.body.id.should.be.a('number');
    			res.body.name.should.be.a('string');
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(4);
    			storage.items[3].should.be.a('object');
    			storage.items[3].should.have.property('name');
    			storage.items[3].should.have.property('id');
    			storage.items[3].name.should.be.a('string');
    			storage.items[3].id.should.be.a('number');
    			storage.items[3].name.should.equal('Kale');
    			done();
    		});
    });
    
    it('should edit an item on put', function(done) {
    	chai.request(app)
    		.put('/items/2')
    		.send({'name': 'Thano', 'id': 2})
    		.end(function(err, res) {
    			res.should.have.status(200);
    			res.should.be.json;
    			res.body.should.be.a('array');
    			res.body[2].should.have.property('name');
    			res.body[2].should.have.property('id');
    			res.body[2].name.should.equal('Thano');
    			res.body[2].id.should.equal(2);
    			res.body[2].id.should.be.a('number');
    			res.body[2].name.should.be.a('string');
    			done();
    		});
    });
    
    it('should delete an item on delete', function(done) {
    	chai.request(app)
    		.delete('/items/2')
    		.end(function(err, res) {
    			res.should.have.status(201);
    			res.should.be.json;
    			res.body.should.be.a('array');
    			res.body[2].name.should.equal('Kale');
    			res.body[2].id.should.equal(3);
    			res.body[2].name.should.be.a('string');
    			res.body[2].id.should.be.a('number');
    			done();
    		});
    
    });
});

