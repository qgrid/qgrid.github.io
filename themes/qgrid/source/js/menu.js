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

function onSearchChange(e) {
	e.stopImmediatePropagation();
	const input = e.target || e.srcElement;
	const search = input.value.toLowerCase();
	setSearch(search);
}

function searchOnLoad() {
	const active = document.querySelector('.active-topic');
	const search = getSearch();
	if (active && search) {
		pageTextSearch(search);
		tagsSearch(search);
		menuItemsSearch(search);
	}
}

function searchOnHashChange() {
	const search = getSearch();
	updateMenuLinks(search);
	pageTextSearch(search);
	tagsSearch(search);
	menuItemsSearch(search);
}

function pageTextSearch(search) {
	const h2 = document.getElementsByTagName('h2');
	const p = document.getElementsByTagName('p');
	let scrolled = false;
	for (let searchTarget of [...h2, ...p]) {
		const a = searchTarget.getElementsByTagName('a')[0];
		if (a && a.textContent) {
			searchTarget = a;
		}
		if (highlightText(searchTarget, search) && !scrolled) {
			scrolled = true;
			searchTarget.scrollIntoView();
		}
	}
}

function tagsSearch(search) {
	const active = document.querySelector('.active-topic');
	const nav = document.getElementById('nav');
	const menuItems = nav.getElementsByTagName('li');
	for (let menuItem of menuItems) {
		const tags = menuItem.dataset.tag || '';
		for (let tag of tags.split(',')) {
			const index = tag.toLowerCase().indexOf(search);
			const title = menuItem.querySelector('.title');
			if (title) {
				if (index >= 0 && menuItem != active && search != '') {
					menuItem.style.display = '';
					title.classList.add('menu-item');
					if (title.textContent[0] != '/') {
						title.prepend("/ ");
					}
					showTag(menuItem, tag, search);
					break;
				}
				else {
					const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
					if (dataShowTag) {
						dataShowTag.style.display = 'none';
					}
					title.classList.remove('menu-item');
					title.textContent = title.textContent.replace("/ ", '');
				}
			}
		}
	}
}

function menuItemsSearch(search) {
	const nav = document.getElementById('nav');
	const menuItems = nav.getElementsByTagName('li');
	for (let menuItem of menuItems) {
		const title = menuItem.querySelector('.title');
		const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
		let foundText = [];
		let indexMenu = 0;
		let indexTag = -1;
		if (title) {
			indexMenu = title.textContent.toLowerCase().indexOf(search);
			foundText = foundText.concat(title);
		}
		if (dataShowTag) {
			const tag = dataShowTag.getElementsByTagName('a')[0];
			indexTag = tag.textContent.toLowerCase().indexOf(search);
			foundText = foundText.concat(tag);
		}
		for (let searchTarget of foundText) {
			highlightText(searchTarget, search);
		}
		if (indexMenu >= 0 || indexTag >= 0) {
			menuItem.style.display = '';
		}
		else {
			menuItem.style.display = 'none';
		}
	}
}

function highlightText(searchTarget, search) {
	const { textContent } = searchTarget;
	const index = textContent.toLowerCase().indexOf(search);
	if (index >= 0 && search != '' && textContent[index - 1] != '/') {
		let hightlightContent = textContent;
		for (let i = 1; i <= search.length; i++) {
			hightlightContent = textContent.substring(0, index) + '<span>' + textContent.substring(index, index + i) + '</span>' + textContent.substring(index + i);
		}
		searchTarget.innerHTML = hightlightContent;
		let span = searchTarget.getElementsByTagName('span');
		for (let searchSpan of span) {
			searchSpan.classList.add('highlight');
		}
		return true;
	}
	else {
		let span = searchTarget.getElementsByTagName('span');
		for (let searchSpan of span) {
			searchSpan.classList.remove('highlight');
		}
		return false;
	}
}

function showTag(menuItem, tag, search) {
	for (let searchTarget of tag.split(' ')) {
		let indexTarget = -1;
		let foundMatch = false;
		for (let arraySearch of search.split(' ')) {
			if (indexTarget < 0 && !foundMatch) {
				if (arraySearch != '') {
					foundMatch = true;
					indexTarget = searchTarget.toLowerCase().indexOf(arraySearch);
				}
			}
		}
		const indexSearch = search.split(' ').indexOf(searchTarget.toLowerCase());
		if (indexTarget >= 0 || indexSearch >= 0 || search == ' ') {
			if (menuItem.getElementsByTagName('data-show-tag').length === 0) {
				const newTag = document.createElement('data-show-tag');
				newTag.appendChild(document.createElement('a'));
				menuItem.insertBefore(newTag, menuItem.children[0]);
			}
			const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
			dataShowTag.style.display = '';
			const a = dataShowTag.getElementsByTagName('a')[0];
			a.textContent = getTagsContent(tag, searchTarget);
			a.setAttribute('href', menuItem.querySelector('.title').getAttribute('href'));
			a.style.display = 'inline';
			break;
		}
	}
}

function updateMenuLinks(search) {
	const nav = document.getElementById('nav');
	for (title of nav.querySelectorAll('.title')) {
		const hash = '#search=';
		let href = title.getAttribute('href');
		const index = href.indexOf(hash);
		if (index < 0) {
			href += hash;
		}
		else {
			if (search == '') {
				href = href.slice(0, index);
			}
			else {
				href = href.substr(0, index + hash.length);
			}
		}
		title.setAttribute('href', href + search);
	}
}

function getTagsContent(tag, searchTag) {
	const searchTarget = tag.split(' ');
	const index = searchTarget.indexOf(searchTag);
	if (searchTarget.length > 2) {
		if (index == 0) {
			return searchTarget[index] + ' ' + searchTarget[index + 1] + ' ...';
		}
		else if (index == searchTarget.length - 1) {
			return '... ' + searchTarget[index - 1] + ' ' + searchTarget[index];
		}
		else {
			return '... ' + searchTarget[index] + ' ' + searchTarget[index + 1] + ' ...';
		}
	}
	else {
		return tag;
	}
}

function setSearch(search) {
	if (search) {
		location.hash = 'search=' + search;
	}
	else {
		location.hash = '';
	}
}

function getSearch() {
	const search = new RegExp(/^#search=/);
	if (search.test(location.hash)) {
		return location.hash.substr(search.source.length - 1).replace(/%20/g, ' ').toLowerCase();
	}
	return '';
}

function init() {
	document.addEventListener('load', searchOnLoad, true);

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

window.onhashchange = searchOnHashChange;

document.addEventListener('DOMContentLoaded', init);