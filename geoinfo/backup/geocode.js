const request = require("request");
// 51bd7031b48805f3bc2d6c7364ef57d6
// https://api.darksky.net/forecast/51bd7031b48805f3bc2d6c7364ef57d6/37.8267,-122.4233

const geocodeAddress = (theAddress, callBack) => {
	const myAddress = encodeURIComponent(theAddress);

	request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${myAddress}&key=AIzaSyBCjSgx5xV5gumA-dUbPzGEwKqVEJBpZ7Y`, json: true},
	(error, response, body)=>{
		if(error){
			// console.log('Unable to connect to Google servers.');
			callBack(error, null);
		}else if(body.status === 'ZERO_RESULTS'){
			// console.log('Unable to find that address.');
			callBack(null, 'Unable to find that address.');
		}else if(body.status === 'OK'){
			callBack(null, {
				Address: `${body.results[0].formatted_address}`,
				Latitude: `${body.results[0].geometry.location.lat}`,
				Longitude: body.results[0].geometry.location.lng
			});
			// console.log(`Address: ${body.results[0].formatted_address}`);
			// console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
			// console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
		}
	});
}

module.exports.geocodeAddress = geocodeAddress;



