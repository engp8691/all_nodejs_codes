const generateMessage = (from, text)=>{
	const createdAt = Date.now();

	return { from, text, createdAt };
};

module.exports = {generateMessage};
