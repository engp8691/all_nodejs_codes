const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abci!';
bcrypt.genSalt(10, (err, salt)=>{
	bcrypt.hash(password, salt, (err, hash)=>{
		console.log(hash);
	});
});


/*

var data = {
	id: 10
};

const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token, 'abc123');
console.log(decoded);


let message = 'I am user number 3';
let hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);


*/

