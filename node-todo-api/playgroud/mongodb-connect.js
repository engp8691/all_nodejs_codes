const {MongoClient, ObjectID} = require('mongodb');
const test = require('assert');

MongoClient.connect('mongodb://yonglin:turqu01se@ds237955.mlab.com:37955/todoapp', (err, client)=>{
	if(err){
		return console.log('Unable to connect to mondodb server');
	}
	console.log('Connect to mondodb server');

	const dbName='todoapp';

	const col = client.db(dbName).collection('Todos');
	col.insertOne({text: 'Call the dentist', completed: false}, function(err, result) {
		test.equal(null, err);
	});

//	col.find({_id: ObjectID('5c6794aa009dfd66bea82c03')}).toArray().then((docs)=>{
	col.find({text: `She Jing De Le`}).toArray().then((docs)=>{
		console.log(19, docs);
	}, (err)=>{
		console.log(err);
	});

	col.findOneAndUpdate({
		text: `Call the dentist`
	}, {
		$set: {text: `She Jing De Le`}
	}, {
		returnOriginal: false
	}).then((docs)=>{
		console.log(30, docs);
	}, (err)=>{
		console.log(err);
	});

	// col.deleteMany({text: `Call the dentist`}).then((docs)=>{
	// 	console.log(docs);
	// }, (err)=>{
	// 	console.log(err);
	// });

	col.deleteOne({text: `Call the dentist`}).then((docs)=>{
		console.log(docs);
	}, (err)=>{
		console.log(err);
	});




	const timestamp = ObjectID('5c6794aa009dfd66bea82c03').getTimestamp();
	console.log(24, timestamp);

	client.close();
});


