function init() {

	const triggerBtn = document.getElementById("nav-trigger");
	triggerBtn.addEventListener('click', function () {
		const nav = document.getElementById("nav");
		nav.classList.toggle('hide');
	});

}

document.addEventListener("DOMContentLoaded", init);
