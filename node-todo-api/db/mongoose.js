mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://yonglin:turqu01se@ds237955.mlab.com:37955/todoapp');

const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});


var newTodo = new Todo({
	text: '  To get the paint    '
});

newTodo.save().then((doc)=>{
	console.log('Saved todo', doc);
}, (e)=>{
	console.log('Unable to save todo');
});


const User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 6,
		trim: true
	}
});

const user = new User({
	email: 'Yonglin@tom.com'
});

user.save().then((doc)=>{
	console.log('Saved todo', doc);
}, (e)=>{
	console.log("Error");
});


