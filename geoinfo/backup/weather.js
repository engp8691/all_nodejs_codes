const request = require("request");

const getWeather = (lat, lng, callBack) => {
	request({
		url: `https://api.darksky.net/forecast/51bd7031b48805f3bc2d6c7364ef57d6/${lat},${lng}`,
		json: true
	}, (error, response, body)=>{
		if(error){
			callBack('Unable to connect to darksky.net server.');
		}else if(response.statusCode===400){
			callBack('Unable to fetch weather.');
		}else if(response.statusCode === 200){
			callBack(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature,
				summary: body.currently.summary
			});
		}
	});
};

module.exports.getWeather = getWeather;

