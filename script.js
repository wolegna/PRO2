var inputTime = document.getElementById("inputED");

var rocket = document.getElementById("rocket");

var miles = document.getElementById("miles");

var inputFood = document.getElementById("inputFD");

var button = document.getElementById("calculate");

var outputFood = document.getElementById("outputFD");

var pos = 10;

var dist = 225000000;

var trip = 0;

button.onclick = function () {
	var z = 100 - inputFood.value;
	outputFood.innerHTML = z * 36;
};


inputTime.oninput = function () {
	var dist = document.getElementById("inputED").value;
	document.getElementById("outputTime").innerHTML = dist * 25;
};

window.onkeypress = function () {
	var spbar = event.keyCode;
	if (pos == 75) {
		document.getElementById("end").style.visibility = "visible";
		document.getElementById("flight").style.visibility = "hidden";
		rocket.style.transform = "rotate(270deg)";

	} else {
		if (spbar == 32) {
			pos += 13;
			rocket.style.left = (pos + "vw");
			trip += dist / 5;
			miles.innerHTML = trip + "/225000000 KM";
			console.log(trip);
		}
	}

}
