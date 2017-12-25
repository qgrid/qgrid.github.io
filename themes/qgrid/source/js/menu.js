function toggleVisibility(e) {
	var target = e.target || e.srcElement;
	if (target.dataset.hasOwnProperty('stopPropagation')) {
		e.stopImmediatePropagation();
		return;
	}
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

function filter(e) {
	e.stopImmediatePropagation();
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

function showSearch(e) {
	var target = e.target || e.srcElement;
	target.style.display = "none";
	var search = document.getElementById('search');
	console.log(search);
	search.style.display = "";
}

function init() {
	var navTrigger = document.getElementById("nav-trigger");
	if (navTrigger) {
		navTrigger.addEventListener('click', toggleVisibility, true);
	}
	var overlay = document.getElementById("overlay");
	overlay.addEventListener('click', toggleVisibility, true);

	var nav = document.getElementById("nav");
	if (nav) {
		nav.addEventListener('click', toggleVisibility, true);
	}

	var search = document.getElementById('search');
	if (search) {
		search.addEventListener("keyup", filter, true);
	}
	var searchTrigger = document.getElementById('search-trigger');
	if (searchTrigger) {
		searchTrigger.addEventListener("click", showSearch, true);
	}

}

document.addEventListener("DOMContentLoaded", init);
