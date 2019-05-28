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
		document.getElementById('search').value = search;
		updateMenuLinks(search);
		currentPageSearch(search);
		menuItemsSearch(search);
	}
}

function searchOnHashChange() {
	const search = getSearch();
	document.getElementById('search').value = search;
	updateMenuLinks(search);
	currentPageSearch(search);
	menuItemsSearch(search);
}

function currentPageSearch(search) {
	let scrolled = false;
	document.querySelectorAll('.page-wrapper *').forEach(node => {
		if (node.nodeName == 'H2' || node.nodeName == 'H3' || node.nodeName == 'P') {
			const a = node.querySelector('a');
			const pageItem = (a && a.textContent) ? a : node;
			const { textContent } = pageItem;
			if (isCorrectSearch(textContent, search)) {
				const searchWords = splitToWords(search);
				const firstMatch = searchWords[indexOfSearch(textContent, searchWords)];
				const searchValue = (textContent.toLowerCase().includes(search)) ? search : firstMatch;
				if (highlightText(pageItem, searchValue) && !scrolled) {
					scrolled = true;
					pageItem.scrollIntoView();
				}
			}
			else {
				pageItem.innerHTML = textContent;
			}
		}
	});
}

function menuItemsSearch(search) {
	const nav = document.getElementById('nav');
	const titles = nav.querySelectorAll('.title');
	for (let title of titles) {
		const menuItem = title.parentElement;
		for (let tag of getTags(menuItem)) {
			if (isCorrectSearch(tag, search)) {
				appendTagText(menuItem, tag, search);
				const menuTag = menuItem.querySelector('.tag');
				const { textContent } = menuTag;
				const searchWords = splitToWords(search);
				const firstMatch = searchWords[indexOfSearch(textContent, searchWords)];
				const searchValue = (textContent.toLowerCase().includes(search)) ? search : firstMatch;
				highlightText(menuTag, searchValue);
				break;
			}
			removeTagText(menuItem, search);
		}
		highlightText(title, search);
	}
}

function isCorrectSearch(tag, search) {
	const searchWords = splitToWords(search);
	let countMatches = 0;
	for (let searchWord of searchWords) {
		if (tag.toLowerCase().includes(searchWord)) {
			countMatches++;
		}
	}
	return (searchWords.length > 0 && countMatches == searchWords.length) ? true : false;
}

function appendTagText(menuItem, tag, search) {
	menuItem.classList.remove('hidden');
	if (!menuItem.querySelector('.border')) {
		const border = menuItem.appendChild(document.createElement("span"));
		border.classList.add('border');
		border.textContent = '/ ';
	}
	if (!menuItem.querySelector('.tag')) {
		const tag = menuItem.appendChild(document.createElement('a'));
		tag.classList.add('tag');
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

function indexOfSearch(tag, searchWords) {
	const tagWords = splitToWords(tag);
	const firstFoundWord = tagWords[indexOfTag(tag, searchWords)];
	let index = 0;
	let minIndexWord = firstFoundWord.length;
	for (let i = 0; i < searchWords.length; i++) {
		let indexWord = firstFoundWord.toLowerCase().indexOf(searchWords[i]);
		if (indexWord >= 0 && indexWord < minIndexWord) {
			minIndexWord = indexWord;
			index = i;
		}
	}
	return index;
}

function indexOfTag(tag, searchWords) {
	const tagWords = splitToWords(tag);
	let minIndex = tagWords.length;
	for (let searchWord of searchWords) {
		for (let i = 0; i < tagWords.length; i++) {
			if (tagWords[i].toLowerCase().indexOf(searchWord) >= 0) {
				minIndex = Math.min(minIndex, i);
			}
		}
	}
	return minIndex;
}

function highlightText(item, search) {
	const { textContent } = item;
	const searchContains = new RegExp(escape(search), 'i');
	if (search && searchContains.test(textContent.toLowerCase())) {
		item.innerHTML = textContent.replace(searchContains, elem => `<span class="highlight">${elem}</span>`);
		item.parentElement.classList.remove('hidden');
		return true;
	}
	item.innerHTML = textContent;
	return false;
}

function formatTag(tag, search) {
	let tagWords = splitToWords(tag);
	const searchWords = splitToWords(search);
	const index = indexOfTag(tag, searchWords);
	if (tagWords.length > VISIBLE_MENU_TAG_COUNT) {
		if (index < tagWords.length - VISIBLE_MENU_TAG_COUNT) {
			tagWords.splice(index + VISIBLE_MENU_TAG_COUNT, tagWords.length, '...');
		}
		if (index > 0) {
			tagWords.splice(0, index, '...');
		}
	}
	return tagWords.join(' ');
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

function splitToWords(text) {
	return text.split(' ').filter(x => x);
}

function escape(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function setSearch(search) {
	location.hash = (search) ? 'search=' + search : '';
}

function getSearch() {
	const search = new RegExp(/^#search=/);
	return (search.test(location.hash))
		? decodeURIComponent(location.hash.substr(search.source.length - 1).toLowerCase())
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
		search.addEventListener('input', onSearchChange, true);
	}

	const activeTopic = document.getElementsByClassName('active-topic')[0];
	if (activeTopic) {
		activeTopic.scrollIntoView();
	}
}

window.onhashchange = searchOnHashChange;

document.addEventListener('DOMContentLoaded', init);