const expect = require("expect");
const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
	it('should generate correct message object', ()=>{
		const from = "Yonglin";
		const text = "Hi, I am good today";
		const message = generateMessage(from, text);

		expect(typeof message.createdAt === "number").toBeTruthy();
		expect(message).toMatchObject({from, text});

		// To demonstrate how to use the expect.toMatchObject function
		expect([{foo: 'bar'}, {baz: 1, extra: 'quux'}]).toMatchObject([{foo: 'bar'}, {baz: 1}]);
	});
});


