var lat;
var long;


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
function getGeoCode() {
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
			lat = response.features[0].geometry.coordinates[0];
			long = response.features[0].geometry.coordinates[1];
			console.log(lat + ',' + long);
			document.getElementById('coordinates').value = lat + long;
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
					document.getElementById('city').innerHTML = city;
					document.getElementById('elevation').innerText = 'Elevation is ' + elevation + ' meters above sea level in ' + city;
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
				})



		})
}
document.getElementById('getCity').onclick = function () {
	getGeoCode();
};