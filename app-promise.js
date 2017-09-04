const yargs = require('yargs');
const axios = require('axios');

const env = require('./env.json');

var DARK_SKY_API_SECRET = env.DARK_SKY_API_SECRET;

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
		var weatherURL = `https://api.darksky.net/forecast/${DARK_SKY_API_SECRET}/${lat},${lng}`;

		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherURL);
	}
})
.then((response) => {
	var temp = response.data.currently.temperature;
	var apparentTemp = response.data.currently.apparentTemperature;

	console.log(`It is currently ${temp}˚F. It feels like ${apparentTemp}˚F`);  	
})
.catch((error) => {
	if (error.code === 'ENOTFOUND') {
		console.log('Unable to connect to api servers.');
	} else {
		console.log(error.message);
	}
})
