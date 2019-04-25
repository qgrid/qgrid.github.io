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
				const dataShowTag = menuItem.querySelector('.tag');
				highlightText(dataShowTag, search);
				break;
			}
			removeTagText(menuItem, search);
		}
		highlightText(title, search);
	}
}

function appendTagText(menuItem, tag, search) {
	menuItem.classList.remove('hidden');
	if (!menuItem.querySelector('.tag')) {
		menuItem.insertBefore(document.createElement('a'), menuItem.querySelector('.title'));
		menuItem.querySelector('a').classList.add('tag');
	}
	const title = menuItem.querySelector('.title');
	title.classList.add('menu-item');
	if (!menuItem.querySelector('.border')) {
		const border = menuItem.insertBefore(document.createElement('span'), menuItem.querySelector('.title'));
		border.classList.add('border');
		border.textContent = '/ ';
	}
	const menuTag = menuItem.querySelector('.tag');
	menuTag.classList.remove('hidden');
	menuTag.textContent = formatTag(tag, search);
	menuTag.setAttribute('href', menuItem.querySelector('.title').getAttribute('href'));
}

function removeTagText(menuItem, search) {
	const title = menuItem.querySelector('.title');
	if (search) {
		menuItem.classList.add('hidden');
	}
	else {
		menuItem.classList.remove('hidden');
	}
	const tag = menuItem.querySelector('.tag');
	if (tag) {
		tag.classList.add('hidden');
	}
	title.classList.remove('menu-item');
	if (menuItem.querySelector('.border')) {
		menuItem.removeChild(menuItem.querySelector('.border'));
	}
}

function highlightText(item, search) {
	const { textContent } = item;
	const searchContains = new RegExp(search, 'ig');
	if (search && searchContains.test(textContent)) {
		item.innerHTML = textContent.replace(searchContains, elem => `<span class="highlight">${elem}</span>`);
		item.parentElement.classList.remove('hidden');
		return true;
	}
	item.innerHTML = textContent;
}

function formatTag(tag, search) {
	let tagsContent = split(tag);
	const index = getIndexOfTag(tagsContent, search);
	const visibleWordCount = 2;
	if (tagsContent.length > visibleWordCount) {
		if (index < tagsContent.length - visibleWordCount) {
			tagsContent.splice(index + visibleWordCount, tagsContent.length, ' ...');
		}
		if (index > 0) {
			tagsContent.splice(0, index, '...');
		}
	}
	return tagsContent.join('');
}

function getIndexOfTag(tag, search) {
	const arraySearch = split(search);
	for (let indexTag = 0; indexTag < tag.length; indexTag++) {
		let indexSearch = 0;
		let index = tag[indexTag].toLowerCase().indexOf(arraySearch[indexSearch]);
		while (index >= 0) {
			if (indexSearch == arraySearch.length - 1) {
				return indexTag;
			}
			indexSearch++;
			index = tag[indexSearch + indexTag].toLowerCase().indexOf(arraySearch[indexSearch]);
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
	const template = new RegExp(/\s?[a-z,A-Z,0-9,&,-]+/, 'g');
	return text.match(template) || text.match(/\s/, 'g');
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