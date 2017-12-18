function toggleVisibility(e) {
	e.stopImmediatePropagation();
	var nav = document.getElementById("nav");
	var overlay = document.getElementById("overlay");
	if (nav.style.display === 'block') {
		nav.style.display = 'none';
		overlay.style.display = 'none';
	} else {
		nav.style.display = 'block';
		overlay.style.display = 'block';
	}
}

function filter() {
	var input = document.getElementById('search');
	var filter = input.value.toLowerCase();
	var nav = document.getElementById("nav");
	var li = nav.getElementsByTagName('li');

	for (var i = 0; i < li.length; i++) {
		var a = li[i].getElementsByTagName("a")[0];
		if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

function init() {
	// two nav-triggers should exist for different definitions in different templates (nav and header)
	var triggerBtns = document.getElementsByClassName("nav-trigger");
	for (var i = 0; i < triggerBtns.length; i++) {
		triggerBtns[i].addEventListener('click', toggleVisibility, true);
	}
	var overlay = document.getElementById("overlay");
	overlay.addEventListener('click', toggleVisibility, true);

	var nav = document.getElementById("nav");
	nav.addEventListener('click', toggleVisibility, true);

	var search = document.getElementById('search');
	if (search) {
		search.addEventListener("keyup", filter, true)
	}

}

document.addEventListener("DOMContentLoaded", init);
