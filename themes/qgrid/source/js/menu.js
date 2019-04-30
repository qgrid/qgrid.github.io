const VISIBLE_MENU_TAG_COUNT = 2;

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
		const a = searchTarget.querySelector('a');
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
		for (let tag of getTags(menuItem)) {
			if (search && tag.toLowerCase().indexOf(search) >= 0) {
				appendTagText(menuItem, tag, search);
				const menuTag = menuItem.querySelector('.tag');
				highlightText(menuTag, search);
				break;
			}
			removeTagText(menuItem, search);
		}
		highlightText(title, search);
	}
}

function appendTagText(menuItem, tag, search) {
	menuItem.classList.remove('hidden');
	const title = menuItem.querySelector('.title');
	title.classList.add('menu-item');
	if (!menuItem.querySelector('.tag')) {
		menuItem.insertBefore(document.createElement('a'), menuItem.querySelector('.title'));
		menuItem.querySelector('a').classList.add('tag');
	}
	if (!menuItem.querySelector('.border')) {
		const border = menuItem.insertBefore(document.createElement('span'), menuItem.querySelector('.title'));
		border.classList.add('border');
		border.textContent = '/ ';
	}
	const menuTag = menuItem.querySelector('.tag');
	menuTag.textContent = formatTag(tag, search);
	menuTag.setAttribute('href', menuItem.querySelector('.title').getAttribute('href'));
}

function removeTagText(menuItem, search) {
	menuItem.querySelector('.title').classList.remove('menu-item');
	if (search) {
		menuItem.classList.add('hidden');
	}
	else {
		menuItem.classList.remove('hidden');
	}
	if (menuItem.querySelector('.tag')) {
		menuItem.removeChild(menuItem.querySelector('.tag'));
	}
	if (menuItem.querySelector('.border')) {
		menuItem.removeChild(menuItem.querySelector('.border'));
	}
}

function highlightText(item, search) {
	const { textContent } = item;
	const searchContains = new RegExp(escapeRegexp(search), 'ig');
	if (search && searchContains.test(textContent.toLowerCase())) {
		item.innerHTML = textContent.replace(searchContains, elem => `<span class="highlight">${elem}</span>`);
		item.parentElement.classList.remove('hidden');
		return true;
	}
	item.innerHTML = textContent;
}

function formatTag(tag, search) {
	let tagItems = split(tag);
	const index = indexOf(tagItems, search);
	if (tagItems.length > VISIBLE_MENU_TAG_COUNT) {
		if (index < tagItems.length - VISIBLE_MENU_TAG_COUNT) {
			tagItems.splice(index + VISIBLE_MENU_TAG_COUNT, tagItems.length, ' ...');
		}
		if (index > 0) {
			tagItems.splice(0, index, '...');
		}
	}
	return tagItems.join('');
}

function indexOf(tagItems, search) {
	const searchItems = split(search);
	for (let i = 0; i < tagItems.length; i++) {
		let item = 0;
		let index = tagItems[i].toLowerCase().indexOf(searchItems[item]);
		while (index >= 0) {
			if (item === searchItems.length - 1) {
				return i;
			}
			item++;
			index = tagItems[i + item].toLowerCase().indexOf(searchItems[item]);
		}
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

function split(text) {
	const pattern = new RegExp(/\s?[a-z,A-Z,0-9,&,$,-]+/, 'g');
	return text.match(pattern) || text.match(/\s/, 'g');
}

function escapeRegexp(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function setSearch(search) {
	location.hash = (search) ? 'search=' + search : '';
}

function getSearch() {
	const search = new RegExp(/^#search=/);
	return (search.test(location.hash))
		? location.hash.substr(search.source.length - 1).replace(/%20/g, ' ').toLowerCase()
		: '';
}

function getTags(menuItem) {
	const tags = menuItem.dataset.tag || '';
	return tags.split(',');
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
		const logo = nav.getElementsByTagName('a')[0];
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