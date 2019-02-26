const expect = require('expect');
const jest = require('jest-mock');
const rewire = require('rewire');

const app = rewire('./app');

describe('App', ()=>{
	var db={
		saveUser: jest.fn()
	};
	app.__set__('db', db);

	it('Test Save signupUser', ()=>{
		const user={email: 'dele@tom.com', password: '123caobi'};

		const f = jest.fn();
		f(user);
		expect(f).toHaveBeenCalledWith({email: 'dele@tom.com', password: '123caobi'});
	});

	it('should call saveUser with user object', ()=>{
		var email = 'yonglin@tom.com';
		var password = 'yonglin';

		app.handleSignup(email, password);
		expect(db.saveUser).toHaveBeenCalledWith({email, password});
	});
});

