// USD, CAD, 20
// 20 USD is worth 26 CAD, you can spend there in the following countries: Canada

// http://data.fixer.io/api/latest?access_key=9ac7b8c179870b6c3411fdb49015bc2b&format=1

const axios = require('axios');

const getExchangeRate = (from, to)=>{
	return axios.get('http://data.fixer.io/api/latest?access_key=9ac7b8c179870b6c3411fdb49015bc2b').then((response)=>{
		const euro = 1 / response.data.rates[from];
		const rate = euro*response.data.rates[to];

		return rate;
	});
};

const getExchangeRateASync = async (from, to)=>{
	try{
		const response = await axios.get('http://data.fixer.io/api/latest?access_key=9ac7b8c179870b6c3411fdb49015bc2b');
		const euro = 1 / response.data.rates[from];
		const rate = euro*response.data.rates[to];

		if(isNaN(rate)){
			throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
		}

		return rate;
	}catch(e){
		throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
	}
};

getExchangeRate('USD', 'SGD').then((rate)=>{
	console.log(27, rate);
});

getExchangeRateASync('USD', 'SGD').then((rate)=>{
	console.log(31, rate);
}).catch((e)=>{
	console.log(37, e);
});

const getCountries = (currencyCode)=>{
	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=>{
		return response.data.map((country)=>{
			return country.name;
		});
	});
};

const getCountriesASync = async (currencyCode)=>{
	try{
		const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

		return response.data.map((country)=>{
			return country.name;
		});
	}catch(e){
		throw new Error(`Unable to get countries for the currency code ${currencyCode}`);
	}
};

getCountries('JPY').then((countries)=>{
	console.log(51, countries);
});

getCountriesASync('JPY').then((countries)=>{
	console.log(55, countries);
});

const convertCurrency = (from, to, amount)=>{
	let convertedAmount;

	return getExchangeRate(from, to).then((rate)=>{
		convertedAmount = (amount*rate).toFixed(2);

		return getCountries(to);
	}).then((countries)=>{
		// return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(', ')}`;
		return Promise.resolve(`${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(', ')}`);
	})
};

convertCurrency('USD', 'SGD', 100).then((message)=>{
	console.log(72, message);
});

const convertCurrencyASync = async (from, to, amount)=>{
	const rate = await getExchangeRate(from, to);
	const countries = await getCountries(to);

	const convertedAmount = (amount*rate).toFixed(2);

	return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(', ')}`;
};

convertCurrencyASync('USD', 'SGD', 100).then((message)=>{
	console.log(86, message);
}).catch((e)=>{
});

const addfunc = (a,b,c)=>{
	return Promise.resolve(a+b).then((first)=>{
		return first+c;
	});
}

addfunc(1,3,5).then((result)=>{
	console.log(81, result);
});
