
// clock timing functions

function currentTime() {

	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	hour = updateTime(hour);
	min = updateTime(min);
	sec = updateTime(sec);

	document.getElementById('clockHour').innerText = hour;
	document.getElementById('clockMin').innerText = min;
	document.getElementById('clockSec').innerText = sec;

	var t = setInterval(currentTime, 1000);

}

function updateTime(z) {
	if (z < 10) {
		return "0" + z;
	} else {
		return z;
	}
};

currentTime();

// clock rotate - click on clock to rotate

var clock = document.getElementById('clock');

clock.onclick = function () {
	clock.classList.toggle("clock");
	clock.classList.toggle("clockRotate")
};

// text change colour animation - press spacebar to activate/stop

var textAnimation = document.getElementById("welcomeMessage");

window.onkeypress = function () {
	if (event.keyCode == 32) {
		if (textAnimation.style.animationPlayState == "paused") {
		textAnimation.style.animationPlayState = "running";
		} else {
		textAnimation.style.animationPlayState = "paused";
		}
	}
	console.log(textAnimation.style.animationPlayState);
};