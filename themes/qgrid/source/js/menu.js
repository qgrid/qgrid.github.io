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
	const h2 = document.getElementsByTagName('h2');
	if (filter) location.hash = 'search=' + filter;
	else location.hash = '';
	for (let i = 0; i < li.length; i++) {
		const a = li[i].getElementsByTagName('a')[0];
		if (a) {
			const entr = a.text.toLowerCase().indexOf(filter);
			if (entr > -1) {
				const word = a.text.split('');
				li[i].style.display = '';
				for (let i = 0; i < filter.length; i++) {
					word[entr + i] = '<font style=background-color:#efdf00>' + word[entr + i] + '</font>';
				}
				a.innerHTML = word.join('');
			} else {
				li[i].style.display = 'none';
			}
		}
	}
	for (let i = h2.length - 1; i >= 0; i--) {
		const title = h2[i].textContent;
		const words = title.split('');
		const entry = title.toLowerCase().indexOf(filter);
		if (entry > -1 && filter != '') {
			const low = parseInt(h2[i].getBoundingClientRect().top);
			document.body.scrollTop += low;
			document.documentElement.scrollTop += low;
			for (let i = 0; i < filter.length; i++) {
				words[entry + i] = '<font style=background-color:#ffee00>' + words[entry + i] + '</font>';
			}
			h2[i].innerHTML = words.join('');
		}
		else {
			let font = h2[i].getElementsByTagName('font');
			for (let i = 0; i < font.length; i++) {
				font[i].setAttribute('style', 'background-color:#ffffff');
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