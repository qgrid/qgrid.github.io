function toggleDisplay () {
	var nav = document.getElementById("nav");
    var overlay = document.getElementById("overlay");
	if (nav.style.display==='block'){
        nav.style.display='none';
        overlay.style.display='none';
	} else {
        nav.style.display='block';
        overlay.style.display='block';
    }
}

function init() {

	const triggerBtns = document.getElementsByClassName("nav-trigger");
	for (var i = 0; i < triggerBtns.length; i++) {
		triggerBtns[i].addEventListener('click', toggleDisplay, false);
	}

}

document.addEventListener("DOMContentLoaded", init);
