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

window.onhashchange = function () {
	const search = getSearch();
	pageTextSearch(search);
	tagSearch(search);
	menuItemsSearch(search);
}

function onInputChange(e) {
	e.stopImmediatePropagation();
	const input = e.target || e.srcElement;
	const filter = input.value.toLowerCase();
	if (filter) {
		location.hash = 'search=' + filter;
	}
	else {
		location.hash = '';
	}
	updateHrefs();
}

function updateHrefs() {
	const nav = document.getElementById('nav');
	const li = nav.getElementsByTagName('li');
	for (let i = 0; i < li.length; i++) {
		const a = li[i].getElementsByClassName('title')[0];
		const dataFound = li[i].getElementsByTagName('data-found')[0];
		if (a) {
			let href = a.getAttribute('href');
			if (href.indexOf('#search=') > -1) {
				href = href.substr(0, href.indexOf('#'));
			}
			if (dataFound) {
				const tag = dataFound.getElementsByTagName('a')[0];
				tag.setAttribute('href', href + location.hash);
			}
			a.setAttribute('href', href + location.hash);
		}
	}
}

function getSearch() {
	return location.hash.substr(8).replace(/%20/g, ' ').toLowerCase();
}

function pageTextSearch(search) {
	const h2 = document.getElementsByTagName('h2');
	const p = document.getElementsByTagName('p');
	const textOnPage = [...h2, ...p];
	for (let i = 0; i < textOnPage.length; i++) {
		const a = textOnPage[i].getElementsByTagName('a')[0];
		if (a && a.textContent) {
			textOnPage[i] = a;
		}
		highlightSymbols(textOnPage[i], search);
	}
	for (let i = 0; i < textOnPage.length; i++) {
		const index = textOnPage[i].textContent.toLowerCase().indexOf(search);
		if (index > -1 && search != '') {
			textOnPage[i].scrollIntoView();
			return;
		}
	}
}

function tagSearch(search) {
	const tags = [];
	const active = document.getElementsByClassName('active-topic')[0];
	const nav = document.getElementById('nav');
	const li = nav.getElementsByTagName('li');
	for (let i = li.length - 1; i >= 0; i--) {
		tags[i] = li[i].dataset.tag;
		if (tags[i]) {
			const tag = tags[i].split(',');
			next: for (let j = 0; j < tag.length; j++) {
				const indexTag = tag[j].toLowerCase().indexOf(search);
				const menuItem = li[i].getElementsByClassName('title')[0];
				if (menuItem) {
					if (indexTag > -1 && li[i] != active && search != '' && search != ' ') {
						li[i].style.display = '';
						menuItem.classList.add('menuItem');
						if (menuItem.textContent[0] != '/') {
							menuItem.prepend("/ ");
						}
						displayTag(li[i], tag[j], indexTag, search);
						break next;
					}
					else {
						let dataFound = li[i].getElementsByTagName('data-found')[0];
						if (dataFound) {
							dataFound.style.display = 'none';
						}
						menuItem.classList.remove('menuItem');
						if (search == ' ' || search == '') {
							const font = menuItem.getElementsByTagName('font')[0];
							if (font) {
								const a = font.parentNode;
								while (font.firstChild) {
									a.insertBefore(font.firstChild, font);
								}
							}
						}
						menuItem.innerHTML = menuItem.textContent.replace("/ ", '');
					}
				}
			}
		}
	}
}

function menuItemsSearch(search) {
	const nav = document.getElementById('nav');
	const li = nav.getElementsByTagName('li');
	for (let i = 0; i < li.length; i++) {
		const menuItems = li[i].getElementsByClassName('title')[0];
		const dataFound = li[i].getElementsByTagName('data-found')[0];
		if (menuItems || dataFound) {
			let indexMenu, indexTag;
			if (menuItems) {
				indexMenu = menuItems.textContent.toLowerCase().indexOf(search);
				highlightSymbols(menuItems, search);
			}
			if (dataFound) {
				const tag = dataFound.getElementsByTagName('a')[0];
				indexTag = tag.textContent.toLowerCase().indexOf(search);
				highlightSymbols(tag, search);
			}
			if (indexMenu > -1 || indexTag > -1) {
				li[i].style.display = '';
			}
			else {
				li[i].style.display = 'none';
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
			a.setAttribute('href', line.getElementsByClassName('title')[0].getAttribute('href'));
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
		search.addEventListener('keyup', onInputChange, true);
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