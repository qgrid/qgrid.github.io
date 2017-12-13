function init() {

	const triggerBtns = Array.from(document.getElementsByClassName("nav-trigger"));
	triggerBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			const nav = document.getElementById("nav");
			nav.classList.toggle('hide');
			const overlay = document.getElementById("overlay");
			overlay.classList.toggle('hide');
		})
	});

}

document.addEventListener("DOMContentLoaded", init);
