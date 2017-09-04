const request = require('request')

var getWeather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/96a1cc55b31d55c9b981e55a7d74fd3d/${lat},${lng}`,
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
