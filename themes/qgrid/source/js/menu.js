function toggleVisibility(e) {
	const target = e.target || e.srcElement;
	if (target.dataset.hasOwnProperty('stopPropagation')) {
		e.stopImmediatePropagation();
		return;
	}
	const nav = document.getElementById('nav');
	const overlay = document.getElementById('overlay');
	if (nav.style.display === 'none' || nav.style.display === '') {
		nav.style.display = 'block';
		overlay.style.display = 'block';
	} else {
		nav.style.display = 'none';
		overlay.style.display = 'none';
	}
}

function filter(e) {
	e.stopImmediatePropagation();
	const input = e.target || e.srcElement;
	const filter = input.value.toLowerCase();
	const nav = document.getElementById('nav');
	const li = nav.getElementsByTagName('li');

	for (let i = 0; i < li.length; i++) {
		const a = li[i].getElementsByTagName('a')[0];
		if (a) {
			if (a.text.toLowerCase().indexOf(filter) > -1) {
				li[i].style.display = '';
			} else {
				li[i].style.display = 'none';
			}
		}
	}
}

function init() {
	const navTrigger = document.getElementById('nav-trigger');
	if (navTrigger) {
		navTrigger.addEventListener('click', toggleVisibility, true);
	}
	const overlay = document.getElementById('overlay');
	overlay.addEventListener('click', toggleVisibility, true);

	const nav = document.getElementById('nav');
	if (nav) {
		nav.addEventListener('click', toggleVisibility, true);
	}

	const search = document.getElementById('search');
	if (search) {
		search.addEventListener('keyup', filter, true);
	}

	const searchTrigger = document.getElementById('search-trigger');
	if (searchTrigger) {
		searchTrigger.addEventListener('click', activateSearch, true);
	}

	const activeTopic = document.getElementsByClassName('active-topic')[0];
	if (activeTopic) {
		activeTopic.scrollIntoView();
	}
}

document.addEventListener('DOMContentLoaded', init);
