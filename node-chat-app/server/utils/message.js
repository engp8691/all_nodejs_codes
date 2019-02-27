const moment = require('moment');

const generateMessage = (from, text)=>{
	const createdAt = moment().format('MM/DD/YYYY h:mm a');

	return {from, text, createdAt};
};

const generateLocationMessage = (from, latitude, longitude)=>{
	const createdAt = moment().format('MM/DD/YYYY h:mm a');

	const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
	return {from, url, createdAt};
};

module.exports = {generateMessage, generateLocationMessage};

