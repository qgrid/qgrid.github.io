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
	const nav = document.getElementById('nav');
	const titlesOfMenuItems = nav.querySelectorAll('.title');
	for (let titleOfMenuItem of titlesOfMenuItems) {
		const menuItem = titleOfMenuItem.parentElement;
		const tags = menuItem.dataset.tag || '';
		for (let tag of tags.split(',')) {
			if (tagFormatting(menuItem, tag, search)) {
				showTag(menuItem, tag, search);
				const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0].querySelector('a');
				highlightText(dataShowTag, search);
				break;
			}
		}
	}
}

function menuItemsSearch(search) {
	const nav = document.getElementById('nav');
	const titlesOfMenuItems = nav.querySelectorAll('.title');
	for (let titleOfMenuItem of titlesOfMenuItems) {
		highlightText(titleOfMenuItem, search);
	}
}

function tagFormatting(menuItem, tag, search) {
	const titleOfMenuItem = menuItem.querySelector('.title');
	if (tag.toLowerCase().indexOf(search) >= 0 && search != '') {
		menuItem.style.display = '';
		titleOfMenuItem.classList.add('menu-item');
		if (titleOfMenuItem.textContent[0] != '/') {
			titleOfMenuItem.prepend("/ ");
		}
		return true;
	}
	else {
		if (search != '') {
			menuItem.style.display = 'none';
		}
		else {
			menuItem.style.display = '';
		}
		const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
		if (dataShowTag) {
			dataShowTag.style.display = 'none';
		}
		titleOfMenuItem.classList.remove('menu-item');
		titleOfMenuItem.textContent = titleOfMenuItem.textContent.replace("/ ", '');
		return false;
	}
}

function showTag(menuItem, tag, search) {
	for (let searchTarget of tag.split(' ')) {
		let indexTarget = -1;
		for (let arraySearch of search.split(' ')) {
			if (indexTarget < 0 && arraySearch != '') {
				indexTarget = searchTarget.toLowerCase().indexOf(arraySearch);
			}
		}
		const indexSearch = search.split(' ').indexOf(searchTarget.toLowerCase());
		if ((indexTarget >= 0 || indexSearch >= 0) && search != '') {
			if (menuItem.getElementsByTagName('data-show-tag').length === 0) {
				createDataShowTag(menuItem);
			}
			const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
			dataShowTag.style.display = '';
			const a = dataShowTag.getElementsByTagName('a')[0];
			a.textContent = getFoundTagsContent(tag, searchTarget);
			a.setAttribute('href', menuItem.querySelector('.title').getAttribute('href'));
			a.style.display = 'inline';
		}
	}
}

function createDataShowTag(menuItem) {
	const newTag = document.createElement('data-show-tag');
	newTag.appendChild(document.createElement('a'));
	menuItem.insertBefore(newTag, menuItem.children[0]);
}

function highlightText(foundElement, search) {
	const { textContent } = foundElement;
	const index = textContent.toLowerCase().indexOf(search);
	if (index >= 0 && search != '' && textContent[index - 1] != '/') {
		let hightlightContent = textContent;
		foundElement.parentElement.style.display = '';
		for (let i = 1; i <= search.length; i++) {
			hightlightContent = textContent.substring(0, index) + '<span>' + textContent.substring(index, index + i) + '</span>' + textContent.substring(index + i);
		}
		foundElement.innerHTML = hightlightContent;
		const span = foundElement.getElementsByTagName('span');
		for (let searchSpan of span) {
			searchSpan.classList.add('highlight');
		}
		return true;
	}
	else {
		const span = foundElement.getElementsByTagName('span');
		for (let searchSpan of span) {
			searchSpan.classList.remove('highlight');
		}
		return false;
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

function getFoundTagsContent(tag, foundText) {
	const searchTarget = tag.split(' ');
	const index = searchTarget.indexOf(foundText);
	let tagsContent = [];
	tagsContent = searchTarget;
	if (tagsContent.length > 2) {
		if (index < searchTarget.length - 2) {
			tagsContent.splice(index + 2, searchTarget.length - 2, '...');
		}
		if (index == searchTarget.length - 1) {
			tagsContent.splice(0, index - 1, '...');
		}
		else if (index >= searchTarget.length - index - 2) {
			tagsContent.splice(0, index, '...');
		}
	}
	return tagsContent.join(' ');
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