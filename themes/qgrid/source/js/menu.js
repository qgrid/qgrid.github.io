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
		currentPageSearch(search);
		menuItemsSearch(search);
	}
}

function searchOnHashChange() {
	const search = getSearch();
	updateMenuLinks(search);
	currentPageSearch(search);
	menuItemsSearch(search);
}

function currentPageSearch(search) {
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

function menuItemsSearch(search) {
	const nav = document.getElementById('nav');
	const titles = nav.querySelectorAll('.title');
	for (let title of titles) {
		const menuItem = title.parentElement;
		const tags = menuItem.dataset.tag || '';
		for (let tag of tags.split(',')) {
			if (tag.toLowerCase().indexOf(search) >= 0 && search != '') {
				const matchingTag = findMatchingTag(tag, search);
				showTag(menuItem, tag, matchingTag);
				const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0].querySelector('a');
				highlightText(dataShowTag, search);
				break;
			}
			hideTag(menuItem, search);
		}
		highlightText(title, search)
	}
}

function findMatchingTag(tag, search) {
	for (let searchTarget of tag.split(' ')) {
		let indexTarget = -1;
		for (let arraySearch of search.split(' ')) {
			if (indexTarget < 0 && arraySearch != '') {
				indexTarget = searchTarget.toLowerCase().indexOf(arraySearch);
				break;
			}
		}
		const indexSearch = search.split(' ').indexOf(searchTarget.toLowerCase());
		if ((indexTarget >= 0 || indexSearch >= 0 || search == ' ') && search != '') {
			return searchTarget;
		}
	}
}

function showTag(menuItem, tag, searchTarget) {
	if (menuItem.getElementsByTagName('data-show-tag').length === 0) {
		createDataShowTag(menuItem);
	}
	focusOnTag(menuItem);
	const a = menuItem.getElementsByTagName('data-show-tag')[0].firstChild;
	a.textContent = getFormattedTagsContent(tag, searchTarget);
	a.setAttribute('href', menuItem.querySelector('.title').getAttribute('href'));
	a.style.display = 'inline';
}

function hideTag(menuItem, search) {
	const title = menuItem.querySelector('.title');
	menuItem.style.display = (search == '') ? '' : 'none';
	const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
	if (dataShowTag) {
		dataShowTag.style.display = 'none';
	}
	title.classList.remove('menu-item');
	title.textContent = title.textContent.replace("/ ", '');
}

function createDataShowTag(menuItem) {
	const newTag = document.createElement('data-show-tag');
	newTag.appendChild(document.createElement('a'));
	menuItem.insertBefore(newTag, menuItem.children[0]);
}

function focusOnTag(menuItem) {
	const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
	dataShowTag.style.display = '';
	const title = menuItem.querySelector('.title');
	menuItem.style.display = '';
	title.classList.add('menu-item');
	if (title.textContent[0] != '/') {
		title.prepend("/ ");
	}
}

function highlightText(item, search) {
	const { textContent } = item;
	searchContains = new RegExp(search, 'ig');
	if (textContent[0] != '/' && searchContains.test(textContent) && search) {
		item.innerHTML = textContent.replace(searchContains, elem => `<span class="highlight">${elem}</span>`);
		item.parentElement.style.display = '';
		return true;
	}
	else {
		item.innerHTML = textContent;
		return false;
	}
}

function updateMenuLinks(search) {
	const nav = document.getElementById('nav');
	const hash = search ? '#search=' + search : '';
	for (let title of nav.querySelectorAll('.title')) {
		let href = title.getAttribute('href');
		const index = href.indexOf('#search=');
		href = (index >= 0) ? href.slice(0, index) : href;
		title.setAttribute('href', href + hash);
	}
}

function getFormattedTagsContent(tag, foundText) {
	let tagsContent = tag.split(' ');
	const index = tagsContent.indexOf(foundText);
	if (tagsContent.length > 2) {
		if (index < tagsContent.length - 2) {
			tagsContent.splice(index + 2, tagsContent.length, '...');
		}
		if (index > 0) {
			tagsContent.splice(0, index, '...');
		}
	}
	return tagsContent.join(' ');
}

function setSearch(search) {
	location.hash = (search) ? 'search=' + search : ''
}

function getSearch() {
	const search = new RegExp(/^#search=/);
	return (search.test(location.hash))
		? location.hash.substr(search.source.length - 1).replace(/%20/g, ' ').toLowerCase()
		: ''
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