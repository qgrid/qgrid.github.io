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
	const tags = [];
	const filter = input.value.toLowerCase();
	const nav = document.getElementById('nav');
	const li = nav.getElementsByTagName('li');
	const active = document.getElementsByClassName('active-topic')[0];
	for (let i = 0; i < li.length; i++) {
		tags[i] = li[i].dataset.tag;
	}
	if (filter) { location.hash = 'search=' + filter; }
	else { location.hash = ''; }
	const search = location.hash.substr(8).replace(/%20/g, ' ').toLowerCase();
	searchOnPage();
	for (let i = tags.length - 1; i >= 0; i--) {
		if (tags[i]) {
			const tag = tags[i].split(',');
			let dataFound;
			next: for (let j = 0; j < tag.length; j++) {
				const foundTag = tag[j].split(' ');
				for (let k = 0; k < foundTag.length; k++) {
					const index = foundTag[k].toLowerCase().indexOf(search);
					if (index > -1 && li[i] != active && filter != '') {
						const title = li[i].getElementsByClassName('title')[0];
						li[i].style.display = '';
						title.style.width = '50%';
						title.style.display = 'inline';
						title.style.font = 'italic normal 10pt arial'
						if (li[i].getElementsByTagName('data-found').length === 0) {
							title.prepend("| ");
							let select = document.createElement('data-found');
							let link = document.createElement('a');
							if (foundTag.length > 2 && k != foundTag.length - 1 && k != foundTag.length - 2) {
								link.innerHTML = foundTag[k] + ' ' + foundTag[k + 1] + ' ...';
							}
							else if (foundTag.length > 2 && (k == foundTag.length - 1 || k == foundTag.length - 2)) {
								link.innerHTML = '... ' + foundTag[k - 1] + ' ' + foundTag[k];
							}
							else {
								link.innerHTML = tag[j];
							}
							select.appendChild(link);
							li[i].insertBefore(select, li[i].children[0]);
							dataFound = li[i].getElementsByTagName('data-found')[0];
							const a = dataFound.getElementsByTagName('a')[0];
							dataFound.style.display = 'inline';
							a.style.display = 'inline';
							a.setAttribute('href', li[i].getElementsByClassName('title')[0].getAttribute('href'));
						}
						else {
							if (li[i].getElementsByClassName('title')[0].innerHTML.indexOf('| ') == -1) {
								li[i].getElementsByClassName('title')[0].prepend("| ");
							}
							dataFound = li[i].getElementsByTagName('data-found')[0].getElementsByTagName('a')[0];
							if (foundTag.length > 2 && k != foundTag.length - 1 && k != foundTag.length - 2) {
								dataFound.innerHTML = foundTag[k] + ' ' + foundTag[k + 1] + ' ...';
							}
							else if (foundTag.length > 2 && (k == foundTag.length - 1 || k == foundTag.length - 2)) {
								dataFound.innerHTML = '... ' + foundTag[k - 1] + ' ' + foundTag[k];
							}
							else {
								dataFound.innerHTML = tag[j];
							}
							li[i].getElementsByTagName('data-found')[0].style.display = 'inline';
							dataFound.setAttribute('href', li[i].getElementsByClassName('title')[0].getAttribute('href'));

							dataFound.style.display = 'inline';
						}
						break next;
					}
					else {

						if (li[i].getElementsByTagName('data-found')[0]) {
							li[i].getElementsByTagName('data-found')[0].style.display = 'none';
							li[i].getElementsByClassName('title')[0].style.font = '';
							li[i].getElementsByClassName('title')[0].innerHTML = li[i].getElementsByClassName('title')[0].innerHTML.replace('| ', '');



						}

					}
				}
			}
		}
	}
	let foundTitle = [];
	for (let i = 0; i < li.length; i++) {
		foundTitle[i] = 0;
		for (let count = 0; count <= li[i].getElementsByTagName('a').length; count++) {
			const a = li[i].getElementsByTagName('a')[count];
			if (a) {
				const index = a.text.toLowerCase().indexOf(search);
				if (index > -1) {
					foundTitle[i]++;
					const symbol = a.text.split('');
					li[i].style.display = '';
					for (let j = 0; j < filter.length; j++) {
						symbol[index + j] = '<font>' + symbol[index + j] + '</font>';
					}
					a.innerHTML = symbol.join('');
					let font = li[i].getElementsByTagName('font');
					for (let i = 0; i < font.length; i++) {
						font[i].style.backgroundColor = '#efdf00';
					}
				} else {
					foundTitle[i]--;
					let font = a.getElementsByTagName('font');
					for (let j = 0; j < font.length; j++) {
						font[j].style.backgroundColor = '';
					}
					if (-foundTitle[i] == li[i].getElementsByTagName('a').length) {
						li[i].style.display = 'none';
					}


				}
			}
		}
	}
	localStorage.setItem('input', location.hash.substr(8));
}

function searching(e) {
	e.stopImmediatePropagation();
	if (location.hash) { localStorage.setItem('input', location.hash.substr(8).replace(/%20/g, ' ')); };
	const active = document.getElementsByClassName('active-topic')[0];
	if (active) {
		const tags = active.dataset.tag;
		const index = tags.toLowerCase().indexOf(localStorage.getItem('input').replace(/%20/g, ' '));
		if (index > -1 && localStorage.getItem('input')) {
			location.hash = 'search=' + localStorage.getItem('input');
			searchOnPage();
		}
	}
	localStorage.removeItem('input');
}

window.onhashchange = function () {
	searchOnPage();
}

function searchOnPage() {
	const h2 = document.getElementsByTagName('h2');
	for (let i = h2.length - 1; i >= 0; i--) {
		const title = h2[i].textContent;
		const symbol = title.split('');
		const search = location.hash.substr(8).replace(/%20/g, ' ').toLowerCase();
		const index = title.toLowerCase().indexOf(search);
		if (index > -1 && search != '') {
			const space = parseInt(h2[i].getBoundingClientRect().top);
			document.body.scrollTop += space;
			document.documentElement.scrollTop += space;
			for (let j = 0; j < search.length; j++) {
				symbol[index + j] = '<font style=background-color:#ffee00>' + symbol[index + j] + '</font>';
			}
			h2[i].innerHTML = symbol.join('');
		}
		else {
			let font = h2[i].getElementsByTagName('font');
			for (let i = 0; i < font.length; i++) {
				font[i].style.backgroundColor = '';
			}
		}
	}
}

function init() {
	addEventListener('load', searching, true);

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