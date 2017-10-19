# Weather App
A CLI app that takes in an address, locates it using Google Maps API and finds the weather for that address using Dark Sky API. 

## Installing and running the app
### Prerequisites
```
node v6.9.5
Dark Sky API key
```

Once you have your Dark Sky API secret key, create the ```env.json``` file in the root of the project and store the secret key as ```DARK_SKY_API_SECRET``` 

Launch a terminal and enter the following commands in order:
```
1. git clone git@github.com:kowshik-sundararajan/weather-app.git
2. npm install
3. node app.js
```

## Tech Stack
* [Node.js](https://nodejs.org/) - The web framework used
* [Google Maps API](https://maps.googleapis.com/maps/api/geocode/) - Used to validate location
* [Dark Sky API](https://api.darksky.net/forecast/) - Used to get the weather for specified location

## Authors
Kowshik Sundararajan

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## References
[https://api.darksky.net/forecast/](https://api.darksky.net/forecast/)  
[https://maps.googleapis.com/maps/api/geocode/](https://maps.googleapis.com/maps/api/geocode/)
