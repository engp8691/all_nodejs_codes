// Behavior driven development
const expect = require('expect');
const utils = require('./utils');

it('Should add two numbers', ()=>{
	var res = utils.add(2, 4);

	expect(res).toBe(6);
	expect(res).not.toBeNaN();
});

it('should squre a number', ()=>{
	const res = utils.square(6);

	expect(res).toEqual(36, `Expect 36, but get ${res}`);
});


