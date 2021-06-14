//MapBox API stuff below
mapboxgl.accessToken = 'pk.eyJ1Ijoid29sZWduYSIsImEiOiJja3B2NHNkdHUwaWNnMndwYXVweHVlOTNwIn0.X7_jLGP0-ISl8CV6ngP3BQ';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/dark-v10',
});

map.addControl(
	new mapboxgl.NavigationControl()
);




//GeoCoding API
function makeStuffHappen() {
	var cityName = document.getElementById('cityName').value;
	var city = cityName.charAt(0).toUpperCase() + cityName.slice(1);
	var geoAPI = '53e35620-cc3a-11eb-9bab-550fa636e3b6';
	var geoReq = 'https://app.geocodeapi.io/api/v1/autocomplete?apikey=' + geoAPI + '&text=' + cityName;

	fetch(geoReq)

		.then(function (response) {
			return response.json();
		})

		.then(function (response) {
			console.log(response);

			var lat = response.features[0].geometry.coordinates[0];
			var long = response.features[0].geometry.coordinates[1];
			var country = response.features[0].properties.country;

			console.log(lat + ',' + long);
			map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/dark-v10',
				center: [lat, long],
				zoom: 11.5
			})

			//Elevation API
			var elevAPI = 'FGlkktJTcpAif2plHLpL8QjvOyYZgJaCofd1grqmFpdMmrMfESsdRakdQBxHl800';
			var elevReq = 'https://api.jawg.io/elevations?locations=' + lat + ',' + long + '&access-token=' + elevAPI;

			fetch(elevReq)

				.then(function (output) {
					return output.json();
				})

				.then(function (output) {
					console.log(output);
					var elevation = output[0].elevation;
					document.getElementById('stats').innerHTML = 'City: ' + city + '<br>' +
						'Country: ' + country + '<br>' +
						'Elevation: ' + elevation + "<br>" +
						'Coordinates:' + '<br>' + 'latitude ' + lat + '<br>' + 'longitude ' + long;
				})

			// Weather API
			var weatherAPI = 'a7aaa449b761b3a12a8dbd5a6468668d';
			var weatherReq = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=' + weatherAPI;

			fetch(weatherReq)

				.then(function (response) {
					return response.json();
				})

				.then(function (response) {
					console.log(response);
					var degC = Math.floor(response.current.temp - 273.15) + ' C';
					var feelsLike = Math.floor(response.current.feels_like - 273.15) + ' C';
					var currentWeather = response.current.weather[0].description;
					if (degC === feelsLike) {
						document.getElementById('weather').innerHTML =
							degC +
							'<br>' + currentWeather +
							'<br>' + 'Visibility: ' + Math.round(response.current.visibility / 100) + '%' +
							'<br>' + 'Clouds: ' + response.current.clouds + '%' +
							'<br>' + 'Wind Speed: ' +
							response.current.wind_speed + ' km/h' + '<br>' +
							'Humidity: ' + response.current.humidity + ' %';
					} else {
						document.getElementById('weather').innerHTML =
							degC + ', Feels like ' + feelsLike +
							'<br>' + currentWeather +
							'<br>' + 'Visibility: ' + Math.round(response.current.visibility / 100) + '%' +
							'<br>' + 'Clouds: ' + response.current.clouds + '%' +
							'<br>' + 'Wind Speed: ' +
							response.current.wind_speed + ' km/h' + '<br>' +
							'Humidity: ' + response.current.humidity + ' %';
					};
				})
		})
}
document.getElementById('getCity').onclick = function () {
	makeStuffHappen();
};