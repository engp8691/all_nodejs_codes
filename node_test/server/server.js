const express = require("express");

const app = express();

app.get('/', (req, res)=>{
	res.status(404).send("Hello world!");
});

app.get('/users', (req, res)=>{
	res.send([{name: 'Yonglin', age: 48}, {name: 'Marlyn', age: 14}]);
});

app.listen(3000, ()=>{
	console.log("Express web server is listening to port 3000");
});

module.exports.app = app;

