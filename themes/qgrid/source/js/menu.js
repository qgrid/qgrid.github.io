function toggleVisibility(e) {
	var target = e.target || e.srcElement;
	if (target.dataset.stopPropagate) {
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

function init() {
	var trigger = document.getElementById("nav-trigger");
	if (trigger) {
		trigger.addEventListener('click', toggleVisibility, true);
	}
	var overlay = document.getElementById("overlay");
	overlay.addEventListener('click', toggleVisibility, true);

	var nav = document.getElementById("nav");
	nav.addEventListener('click', toggleVisibility, true);

	var search = document.getElementById('search');
	if (search) {
		search.addEventListener("keyup", filter, true);
	}

}

document.addEventListener("DOMContentLoaded", init);
