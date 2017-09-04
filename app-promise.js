const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios({
	method: 'get',
	url: geocodeURL
})
.then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.');
	} else {
		var lat = response.data.results[0].geometry.location.lat;
		var lng = response.data.results[0].geometry.location.lng;
		var weatherURL = `https://api.darksky.net/forecast/96a1cc55b31d55c9b981e55a7d74fd3d/${lat},${lng}`;

		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherURL);
	}
})
.then((response) => {
	var temp = response.data.currently.temperature;
	var apparentTemp = response.data.currently.apparentTemperature;

	console.log(`It is currently ${temp}. It feels like ${apparentTemp}`);  	
})
.catch((error) => {
	if (error.code === 'ENOTFOUND') {
		console.log('Unable to connect to api servers.');
	} else {
		console.log(error.message);
	}
})
