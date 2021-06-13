var lat;
var long;


//MapBox API stuff below
mapboxgl.accessToken = 'pk.eyJ1Ijoid29sZWduYSIsImEiOiJja3B2NHNkdHUwaWNnMndwYXVweHVlOTNwIn0.X7_jLGP0-ISl8CV6ngP3BQ';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/dark-v10',
	//center: [lat, long]

});

map.addControl(
	new mapboxgl.NavigationControl()
);




//GeoCoding API
function getGeoCode() {
	var cityName = document.getElementById('cityName').value;
	var geoReq = 'https://app.geocodeapi.io/api/v1/autocomplete?apikey=53e35620-cc3a-11eb-9bab-550fa636e3b6&text=' + cityName;


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
			})
}
			document.getElementById('getCity').onclick = function () {
				getGeoCode();
			};