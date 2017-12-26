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
	var input = e.target || e.srcElement;
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
	var header = document.getElementsByTagName("header")[0];
	var search = header.getElementsByClassName('search')[0];
	search.style.display = "";
}

function updateSearch(e) {
	var search = document.getElementById('search');
	var searchFields = document.getElementsByClassName('search');
	var searchFieldActive = e.target || e.srcElement;
	for (var i = 0; i < searchFields.length; i++) {
		if (searchFields[i] !== searchFieldActive) {
			searchFields[i].value = '';
		}
	}
	search.value = searchFieldActive.value;
	var event = new Event('searchEvent');
	search.dispatchEvent(event);
}

function init() {
	var search = document.getElementById('search');
	if (search) {
		search.addEventListener("searchEvent", filter, false);
	}
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

	var searchFields = document.getElementsByClassName('search');
	if (searchFields.length) {
		for (var i = 0; i < searchFields.length; i++) {
			searchFields[i].addEventListener("keyup", updateSearch, true);
		}
	}

	var searchTrigger = document.getElementById('search-trigger');
	if (searchTrigger) {
		searchTrigger.addEventListener("click", showSearch, true);
	}
}

document.addEventListener("DOMContentLoaded", init);
