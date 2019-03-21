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

function searchOnLoad() {
	const active = document.getElementsByClassName('active-topic')[0];
	const search = getSearch();
	if (active && search) {
		pageTextSearch(search);
		tagSearch(search);
		menuItemsSearch(search);
	}
}

function searchOnHashChange() {
	const search = getSearch();
	pageTextSearch(search);
	tagSearch(search);
	menuItemsSearch(search);
}

function onSearchChange(e) {
	e.stopImmediatePropagation();
	const input = e.target || e.srcElement;
	const filter = input.value.toLowerCase();
	setSearch(filter);
	updateLinksInMenu();
}

function setSearch(filter) {
	if (filter) {
		location.hash = 'search=' + filter;
	}
	else {
		location.hash = '';
	}
}

function getSearch() {
	const contains = new RegExp(/^#search=/);
	if (contains.test(location.hash)) {
		return location.hash.substr(8).replace(/%20/g, ' ').toLowerCase();
	}
	return '';
}

function updateLinksInMenu() {
	const nav = document.getElementById('nav');
	const menuItems = nav.getElementsByTagName('li');
	for (let i = 0; i < menuItems.length; i++) {
		const a = menuItems[i].querySelector('.title');
		const dataFound = menuItems[i].getElementsByTagName('data-found')[0];
		if (a) {
			let href = a.getAttribute('href');
			const search = getSearch();
			if (href.indexOf('#search=') == -1) {
				href = href + '#search=';
			}
			else {
				href = href.substr(0, href.indexOf('=') + 1);
			}
			if (search == '') {
				href = href.replace(/#search=/, '');
			}
			if (dataFound) {
				const tag = dataFound.getElementsByTagName('a')[0];
				tag.setAttribute('href', href + search);
			}
			a.setAttribute('href', href + search);
		}
	}
}

function pageTextSearch(search) {
	const h2 = document.getElementsByTagName('h2');
	const p = document.getElementsByTagName('p');
	for (let searchTarget of [...h2, ...p]) {
		const a = searchTarget.getElementsByTagName('a')[0];
		if (a && a.textContent) {
			searchTarget = a;
		}
		highlightSymbols(searchTarget, search);
	}
	for (let searchTarget of [...h2, ...p]) {
		const index = searchTarget.textContent.toLowerCase().indexOf(search);
		if (index > -1 && search != '') {
			searchTarget.scrollIntoView();
			return;
		}
	}
}

function tagSearch(search) {
	const active = document.getElementsByClassName('active-topic')[0];
	const nav = document.getElementById('nav');
	const menuItems = nav.getElementsByTagName('li');
	for (let i = menuItems.length - 1; i >= 0; i--) {
		const tags = menuItems[i].dataset.tag;
		if (tags) {
			const tag = tags.split(',');
			next: for (let j = 0; j < tag.length; j++) {
				const indexTag = tag[j].toLowerCase().indexOf(search);
				const title = menuItems[i].querySelector('.title');
				if (title) {
					if (indexTag > -1 && menuItems[i] != active && search != '' && search != ' ') {
						menuItems[i].style.display = '';
						title.classList.add('menu-item');
						if (title.textContent[0] != '/') {
							title.prepend("/ ");
						}
						displayTag(menuItems[i], tag[j], indexTag, search);
						break next;
					}
					else {
						let dataFound = menuItems[i].getElementsByTagName('data-found')[0];
						if (dataFound) {
							dataFound.style.display = 'none';
						}
						title.classList.remove('menu-item');
						if (search == ' ' || search == '') {
							const font = title.getElementsByTagName('font')[0];
							if (font) {
								const a = font.parentNode;
								while (font.firstChild) {
									a.insertBefore(font.firstChild, font);
								}
							}
						}
						title.textContent = title.textContent.replace("/ ", '');
					}
				}
			}
		}
	}
}

function menuItemsSearch(search) {
	const nav = document.getElementById('nav');
	const menuItems = nav.getElementsByTagName('li');
	for (let i = 0; i < menuItems.length; i++) {
		const title = menuItems[i].querySelector('.title');
		const dataFound = menuItems[i].getElementsByTagName('data-found')[0];
		if (title || dataFound) {
			let indexMenu, indexTag;
			if (title) {
				indexMenu = title.textContent.toLowerCase().indexOf(search);
				highlightSymbols(title, search);
			}
			if (dataFound) {
				const tag = dataFound.getElementsByTagName('a')[0];
				indexTag = tag.textContent.toLowerCase().indexOf(search);
				highlightSymbols(tag, search);
			}
			if (indexMenu > -1 || indexTag > -1) {
				menuItems[i].style.display = '';
			}
			else {
				menuItems[i].style.display = 'none';
			}
		}
	}
}

function displayTag(line, tag, indexTag, search) {
	const foundTag = tag.split(' ');
	for (let i = 0; i < foundTag.length; i++) {
		const index = foundTag[i].toLowerCase().indexOf(search);
		if (index > -1) {
			if (line.getElementsByTagName('data-found').length === 0) {
				let select = document.createElement('data-found');
				select.appendChild(document.createElement('a'));
				line.insertBefore(select, line.children[0]);
			}
			let dataFound = line.getElementsByTagName('data-found')[0];
			const a = dataFound.getElementsByTagName('a')[0];
			if (foundTag.length > 2) {
				if (i < foundTag.length - 2) {
					a.textContent = foundTag[i] + ' ' + foundTag[i + 1] + ' ...';
				}
				else {
					a.textContent = '... ' + foundTag[i - 1] + ' ' + foundTag[i];
				}
			}
			else {
				a.textContent = tag;
			}
			dataFound.style.display = 'inline';
			a.setAttribute('href', line.querySelector('.title').getAttribute('href'));
			a.style.display = 'inline';
		}
		else {
			if (indexTag > -1 && line.getElementsByTagName('data-found').length > 0) {
				line.getElementsByTagName('data-found')[0].style.display = '';
			}
		}
	}
}

function highlightSymbols(foundText, search) {
	const text = foundText.textContent;
	const index = text.toLowerCase().indexOf(search);
	if (index > -1 && search != '') {
		const highlightedSymbol = text.split('');
		for (let j = 0; j < search.length; j++) {
			highlightedSymbol[index + j] = '<font>' + highlightedSymbol[index + j] + '</font>';
		}
		foundText.innerHTML = highlightedSymbol.join('');
		let font = foundText.getElementsByTagName('font');
		for (let j = 0; j < font.length; j++) {
			font[j].style.backgroundColor = '#efdf00';
		}
	}
	else {
		let font = foundText.getElementsByTagName('font');
		for (let j = 0; j < font.length; j++) {
			font[j].style.backgroundColor = '';
		}
	}
}

window.onhashchange = searchOnHashChange;

function init() {
	addEventListener('load', searchOnLoad, true);

	const navTrigger = document.getElementById('nav-trigger');
	if (navTrigger) {
		navTrigger.addEventListener('click', toggleVisibility, true);
	}

	const overlay = document.getElementById('overlay');
	overlay.addEventListener('click', toggleVisibility, true);

	const nav = document.getElementById('nav');
	if (nav) {
		nav.addEventListener('click', toggleVisibility, true);
		const logo = nav.getElementsByTagName('a')[0]
		if (logo) {
			logo.addEventListener('click', searchOnLoad, true);
		}
	}

	const search = document.getElementById('search');
	if (search) {
		search.addEventListener('keyup', onSearchChange, true);
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