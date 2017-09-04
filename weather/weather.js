const request = require('request')

const env = require('../env.json');

var DARK_SKY_API_SECRET = env.DARK_SKY_API_SECRET;

var getWeather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${DARK_SKY_API_SECRET}/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Forecast.io server.');
		} else if(body.code === 400) {
			callback('Unable to fetch weather');
		} else {
			callback(undefined, {
				actualTemperature: body.currently.temperature,
				feelsTemperature: body.currently.apparentTemperature
			});
		}
	});
}

module.exports = {
	getWeather
}
