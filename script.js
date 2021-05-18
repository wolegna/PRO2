var input = document.getElementsById('inputEM');

input.oninput = function () {
	var dist = document.getElementById('inputEM').value;
	document.getElementById('outputTime').innerHTML = dist * 1.045;
};

var rocket = document.getElementById("rocket");

rocket.onclick = function() {
	
	rocket.style.left = "250"
}