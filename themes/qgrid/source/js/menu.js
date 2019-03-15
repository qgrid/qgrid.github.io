var nav, li;
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
	const search = replaceWhiteSpace(location.hash.substr(8)).toLowerCase();
	nav = document.getElementById('nav');
	li = nav.getElementsByTagName('li');
	if (active) {
		if (search) {
			pageTextSearch(search);
			tagSearch(search);
			menuItemsSearch(search);
		}
		else {
			if (localStorage.getItem('input')) {
				location.hash = 'search=' + localStorage.getItem('input');
			}
		}
	}
	localStorage.removeItem('input');
}
window.onhashchange = function () {
	const search = replaceWhiteSpace(location.hash.substr(8)).toLowerCase();
	if (search) {
		pageTextSearch(search);
	}
}
function filterMenu(e) {
	e.stopImmediatePropagation();
	const input = e.target || e.srcElement;
	const filter = input.value.toLowerCase();
	if (filter) { location.hash = 'search=' + filter; }
	else { location.hash = ''; }
	const search = replaceWhiteSpace(location.hash.substr(8)).toLowerCase();
	pageTextSearch(search);
	tagSearch(search);
	menuItemsSearch(search);
	localStorage.setItem('input', search);
}
function replaceWhiteSpace(text) {
	return text.replace(/%20/g, ' ');
}
function pageTextSearch(search) {
	const h2 = document.getElementsByTagName('h2');
	const p = document.getElementsByTagName('p');
	const elements = [...h2, ...p];
	for (let i = elements.length - 1; i >= 0; i--) {
		const a = elements[i].getElementsByTagName('a')[0];
		if (a && a.textContent) {
			elements[i] = a;
		}
		const index = elements[i].textContent.toLowerCase().indexOf(search);
		highlightSymbol(elements[i], search);
		if (index > -1 && search != '') {
			const space = parseInt(elements[i].getBoundingClientRect().top);
			document.body.scrollTop += space;
			document.documentElement.scrollTop += space;
		}
	}
}
function tagSearch(search) {
	const tags = [];
	const active = document.getElementsByClassName('active-topic')[0];
	for (let i = li.length - 1; i >= 0; i--) {
		tags[i] = li[i].dataset.tag;
		if (tags[i]) {
			const tag = tags[i].split(',');
			next: for (let j = 0; j < tag.length; j++) {
				const indexTag = tag[j].toLowerCase().indexOf(search);
				const menuItem = li[i].getElementsByClassName('title')[0];
				if (indexTag > -1 && li[i] != active && search != '' && search != ' ') {
					li[i].style.display = '';
					menuItem.style.width = '50%';
					menuItem.style.display = 'inline';
					menuItem.style.font = 'italic normal 10pt arial'
					menuItem.style.paddingLeft = '8.8%';
					menuItem.style.color = "grey";
					if (menuItem.innerHTML[0] != '/') {
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
					menuItem.style.font = '';
					menuItem.style.paddingLeft = '';
					menuItem.style.color = '';
					if (search == ' ' || search == '') {
						const font = menuItem.getElementsByTagName('font')[0];
						if (font) {
							const a = font.parentNode;
							while (font.firstChild) {
								a.insertBefore(font.firstChild, font);
							}
						}
						menuItem.innerHTML = menuItem.innerHTML.replace("/ ", '');
					}
				}
			}
		}
	}
}
function menuItemsSearch(search) {
	let foundTitle = [];
	for (let i = 0; i < li.length; i++) {
		foundTitle[i] = 0;
		const elements = li[i].getElementsByTagName('a');
		for (let count = 0; count <= elements.length; count++) {
			if (elements[count]) {
				const index = elements[count].textContent.toLowerCase().indexOf(search);
				highlightSymbol(elements[count], search);
				if (index > -1 && search != '') {
					foundTitle[i]++;
					li[i].style.display = '';
				}
				else {
					foundTitle[i]--;
					if (-foundTitle[i] == li[i].getElementsByTagName('a').length) {
						li[i].style.display = 'none';
					}
					if (search == '') {
						li[i].style.display = '';
					}
				}
			}
		}
	}
}
function displayTag(line, tag, indexTag, search) {
	const foundTag = tag.split(' ');
	for (let k = 0; k < foundTag.length; k++) {
		const index = foundTag[k].toLowerCase().indexOf(search);
		if (index > -1 || search[0] == ' ') {
			if (line.getElementsByTagName('data-found').length === 0) {
				let select = document.createElement('data-found');
				select.appendChild(document.createElement('a'));
				line.insertBefore(select, line.children[0]);
			}
			let dataFound = line.getElementsByTagName('data-found')[0];
			const a = dataFound.getElementsByTagName('a')[0];
			if (foundTag.length > 2 && k != foundTag.length - 1 && k != foundTag.length - 2) {
				a.innerHTML = foundTag[k] + ' ' + foundTag[k + 1] + ' ...';
			}
			else if (foundTag.length > 2 && (k == foundTag.length - 1 || k == foundTag.length - 2)) {
				a.innerHTML = '... ' + foundTag[k - 1] + ' ' + foundTag[k];
			}
			else {
				a.innerHTML = tag;
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
function highlightSymbol(element, search) {
	const text = element.textContent;
	const index = text.toLowerCase().indexOf(search);
	if (index > -1 && search != '') {
		const highlightedSymbol = text.split('');
		for (let j = 0; j < search.length; j++) {
			highlightedSymbol[index + j] = '<font>' + highlightedSymbol[index + j] + '</font>';
		}
		element.innerHTML = highlightedSymbol.join('');
		let font = element.getElementsByTagName('font');
		for (let j = 0; j < font.length; j++) {
			font[j].style.backgroundColor = '#efdf00';
		}
	}
	else {
		let font = element.getElementsByTagName('font');
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
		search.addEventListener('keyup', filterMenu, true);
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