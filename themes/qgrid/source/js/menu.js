function toggleNav () {
	var nav = document.getElementById("nav");
	nav.classList.toggle('hide');
	var overlay = document.getElementById("overlay");
	overlay.classList.toggle('hide');
}

function init() {

	const triggerBtns = document.getElementsByClassName("nav-trigger");
	for (var i = 0; i < triggerBtns.length; i++) {
		triggerBtns[i].addEventListener('click', toggleNav, false);
	}

}

document.addEventListener("DOMContentLoaded", init);
