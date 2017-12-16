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
function filter() {
    var input = document.getElementById('search');
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("myUL");
    var li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function init() {

	var triggerBtns = document.getElementsByClassName("nav-trigger");
	for (var i = 0; i < triggerBtns.length; i++) {
		triggerBtns[i].addEventListener('click', toggleDisplay, false);
	}

    var search = document.getElementById('search');
		search.addEventListener("keyup", filter, false);

}

document.addEventListener("DOMContentLoaded", init);
