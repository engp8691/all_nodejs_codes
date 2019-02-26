const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', ()=>{
	describe('Get /', ()=>{
		it('should return hello world response', (done)=>{
			request(app)
			.get('/')
			.expect(404)
			.expect('Hello world!')
			.end(done);
		});
	});

	describe('Get /users', ()=>{
		it('should return an array via 200 status and I am inside', (done)=>{
			request(app)
			.get('/users')
			.expect(200)
			.expect((res) => {
				expect(res.body).toContainEqual({
					name: 'Yonglin',
					age: 48
				});
			})
			.end(done);
		});
	});
})

