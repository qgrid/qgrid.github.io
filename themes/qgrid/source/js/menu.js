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
		for (let tag of getTags(menuItem)) {
			if (search && tag.toLowerCase().indexOf(search) >= 0) {
				appendTagText(menuItem, tag, search);
				const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0].querySelector('a');
				highlightText(dataShowTag, search);
				break;
			}
			removeTagText(menuItem, search);
		}
		if (title.textContent[0] != '/') {
			highlightText(title, search)
		}
	}
}

function appendTagText(menuItem, tag) {
	menuItem.style.display = '';
	if (menuItem.getElementsByTagName('data-show-tag').length === 0) {
		const newTag = document.createElement('data-show-tag');
		newTag.appendChild(document.createElement('a'));
		menuItem.insertBefore(newTag, menuItem.children[0]);
	}
	const title = menuItem.querySelector('.title');
	title.classList.add('menu-item');
	if (title.textContent[0] != '/') {
		title.prepend("/ ");
	}
	const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
	dataShowTag.style.display = '';
	dataShowTag.firstChild.textContent = formatTag(tag);
	dataShowTag.firstChild.setAttribute('href', menuItem.querySelector('.title').getAttribute('href'));
}

function removeTagText(menuItem, search) {
	const title = menuItem.querySelector('.title');
	menuItem.style.display = (search) ? 'none' : '';
	const dataShowTag = menuItem.getElementsByTagName('data-show-tag')[0];
	if (dataShowTag) {
		dataShowTag.style.display = 'none';
	}
	title.classList.remove('menu-item');
	title.textContent = title.textContent.replace("/ ", '');
}

function highlightText(item, search) {
	const { textContent } = item;
	const searchContains = new RegExp(search, 'ig');
	if (search && searchContains.test(textContent)) {
		item.innerHTML = textContent.replace(searchContains, elem => `<span class="highlight">${elem}</span>`);
		item.parentElement.style.display = '';
		return true;
	}
	item.innerHTML = textContent;
}

function formatTag(tag) {
	let tagsContent = getSplitText(tag);
	const matchingText = matchText(tagsContent);
	const index = tagsContent.indexOf(matchingText);
	if (tagsContent.length > 3) {
		if (index < tagsContent.length - 3) {
			tagsContent.splice(index + 2, tagsContent.length - 1, ' ...');
		}
		if (index > 0) {
			tagsContent.splice(0, index, '...');
		}
	}
	return tagsContent.join('');
}

function matchText(tag) {
	for (let searchTarget of tag) {
		let indexSearch = -1;
		const search = getSearch();
		for (let arraySearch of getSplitText(search)) {
			indexSearch = (indexSearch < 0 && arraySearch.length > 1) ? searchTarget.toLowerCase().indexOf(arraySearch) : indexSearch;
		}
		const indexTarget = searchTarget.toLowerCase().indexOf(search);
		if (indexTarget >= 0 || indexSearch >= 0) {
			return searchTarget;
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

function getSplitText(text) {
	const template = new RegExp(/\s?[a-z,A-Z,0-9,&,-]*/, 'g');
	return text.match(template);
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