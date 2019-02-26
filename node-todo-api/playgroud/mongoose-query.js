const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userid = "5c6b0e5934fe454892e57744";

/*
var id = "6c6d8d24eaf917294719a82e";

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}

Todo.find({
	_id: id
}).then((todos)=>{
	console.log('Todos', todos);
});

Todo.findOne({
	_id: id
}).then((todo)=>{
	console.log('Todo', todo);
});

Todo.findById(id).then((todo)=>{
	if(!todo){
		return ({result: 'Todo is not found'});
	}
	console.log('Todo', todo);
}).catch((e)=>{
	console.log(e);
});
*/

User.find().then((users)=>{
	console.log(users);
});

User.findById(userid).then((user)=>{
	if(!user){
		console.log('User not found');
	}

	console.log(user);
}).catch((e)=>{
	console.log(e);
});
