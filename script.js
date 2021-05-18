var input = document.getElementById("inputEM");

input.oninput = function () {
	var dist = document.getElementById("inputEM").value;
	document.getElementById("outputTime").innerHTML = dist * 25;
};

var rocket = document.getElementById("rocket");

var miles = document.getElementById("miles")

var pos = 10;

var dist = 225000000;

var trip = 0;


window.onkeypress = function () {

	var spbar = event.keyCode;

	if (pos == 65) {
		rocket.style.transform = "rotate(270deg)";
	} else {
		if (spbar == 32) {
			pos += 11;
			rocket.style.left = (pos + "vw");
			trip += dist / 5;
			miles.innerHTML = trip + "/225000000 KM";
			console.log(trip);
		}
	}

}
