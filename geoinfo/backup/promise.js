const request = require("request");

const geocodeAddress = (theAddress) =>{
	const myAddress = encodeURIComponent(theAddress);

	return new Promise((resolve, reject)=>{
		console.log(7, `https://maps.googleapis.com/maps/api/geocode/json?address=${myAddress}&key=AIzaSyBCjSgx5xV5gumA-dUbPzGEwKqVEJBpZ7Y`);

		request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${myAddress}&key=AIzaSyBCjSgx5xV5gumA-dUbPzGEwKqVEJBpZ7Y`, json: true},
			(error, response, body)=>{
				if(error){
					reject(error);
				}else if(body.status === 'ZERO_RESULTS'){
					reject('Unable to find that address.');
				}else if(body.status === 'OK'){
					resolve({
						Address: `${body.results[0].formatted_address}`,
						Latitude: `${body.results[0].geometry.location.lat}`,
						Longitude: body.results[0].geometry.location.lng
					});
				}
		});
	});
}

geocodeAddress('02445').then((location)=>{
	console.log(location);
}, (errorMessage)=>{
	console.log(errorMessage);
});

geocodeAddress('shejingdele00000').then((location)=>{
	console.log(location);
}, (errorMessage)=>{
	console.log(errorMessage);
});

