const NUMBER_OF_VISIBLE_TAGS = 2;
const SEARCHABLE_ELEMENTS = ['H2', 'H3', 'P'];

function toggleVisibility(e) {
	const target = e.target || e.srcElement;
	if (target.dataset.hasOwnProperty('stopPropagation')) {
		e.stopImmediatePropagation();
		return;
	}

	const nav = document.getElementById('nav');
	const overlay = document.getElementById('overlay');
	if(e.target.nodeName != 'H3') {
		if (nav.style.display === 'none' || nav.style.display === '') {
			nav.style.display = 'block';
			overlay.style.display = 'block';
		} else {
			nav.style.display = 'none';
			overlay.style.display = 'none';
		}
	}
}

function onTogglerClick(event) {
	targetElement = event.target.parentElement;
	if(targetElement.classList.contains('hide-list')) {
		targetElement.classList.remove('hide-list')
	} else {
		targetElement.classList.add('hide-list')
	}
}

function menuItemOpen(item) {
	if (!item.parentElement.classList.contains('hide-list')) {
		item.parentElement.classList.add('hide-list');
	}
}

function menuItemHide(item) {
	if (item.parentElement.classList.contains('hide-list')) {
		item.parentElement.classList.remove('hide-list');
	}
}

function onSearchChange(e) {
	e.stopImmediatePropagation();
	const input = e.target || e.srcElement;
	const search = input.value.toLowerCase();
	const highlightsCount = document.querySelectorAll('.highlight').length;
	const searchValueLenght = document.querySelector('#search').value.length;
	const menuClasses = document.querySelector('aside').classList;

	highlightsCount > 0 && searchValueLenght != 0 ? menuClasses.add('has-highlight') :
	menuClasses.remove('has-highlight');

	setSearch(search);
}

function searchOnLoad() {
	const active = document.querySelector('.active-topic');
	const search = getSearch();
	updateExampleLink(search);

	if (active && search) {
		document.getElementById('search').value = search;
		currentPageSearch(search);
		menuItemsSearch(search);
	}
}

function searchOnHashChange() {
	const search = getSearch();
	document.getElementById('search').value = search;
	if (!search) {
		document.getElementById('search').focus();
	}

	updateExampleLink(search);
	currentPageSearch(search);
	menuItemsSearch(search);
}

function currentPageSearch(search) {
	const active = document.querySelector('.active-topic');
	active.classList.remove('hide');
	let scrolled = false;
	document.querySelectorAll('.page-wrapper *').forEach(node => {
		if (SEARCHABLE_ELEMENTS.includes(node.nodeName)) {
			const a = node.querySelector('a:last-child');
			const pageItem = (a && a.textContent) ? a : node;
			const { textContent } = pageItem;
			const words = splitToWords(search);
			const firstMatch = (testSearch(textContent, search)) ? words[indexOfSearch(textContent, words)] : '';
			const searchTarget = (textContent.toLowerCase().includes(search)) ? search : firstMatch;
			if (highlightText(pageItem, searchTarget) && !scrolled) {
				scrolled = true;
				pageItem.scrollIntoView();
			}
		}
	});

	if (!scrolled && !active.textContent.toLowerCase().includes(search)) {
		active.classList.add('hide');
	}
}

function menuItemsSearch(search) {
	const nav = document.getElementById('nav');
	const titles = nav.querySelectorAll('.title');
	for (let title of titles) {
		const menuItem = title.parentElement;
		for (let tag of getTags(menuItem)) {
			if (!title.parentElement.classList.contains('active-topic')) {
				updateMenuLinks(title, tag, search);
			}
			if (testSearch(tag, search)) {
				appendTagText(menuItem, tag, search);
				const menuTag = menuItem.querySelector('.tag');
				menuItemHide(menuItem.parentElement);
				const { textContent } = menuTag;
				const words = splitToWords(search);
				const firstMatch = words[indexOfSearch(textContent, words)];
				const searchTarget = (textContent.toLowerCase().includes(search)) ? search : firstMatch;
				highlightText(menuTag, searchTarget);
				break;
			}

			removeTagText(menuItem, search);
		}

		highlightText(title, search);
	}
}

function testSearch(tag, search) {
	const words = splitToWords(search);
	let matchCount = 0;
	for (let word of words) {
		if (tag.toLowerCase().includes(word)) {
			matchCount++;
		}
	}

	return (words.length > 0 && matchCount == words.length);
}

function appendTagText(menuItem, tag, search) {
	menuItem.classList.remove('hide');
	if (!menuItem.querySelector('.border')) {
		const border = menuItem.appendChild(document.createElement('span'));
		border.classList.add('border');
		border.textContent = '/ ';
	}

	if (!menuItem.querySelector('.tag')) {
		const tag = menuItem.appendChild(document.createElement('a'));
		tag.classList.add('tag');
	}
	const menuTag = menuItem.querySelector('.tag');
	menuTag.textContent = formatTag(tag, search);

	if (menuItem.querySelector('.title').getAttribute('href')) {
		menuTag.setAttribute('href', menuItem.querySelector('.title').getAttribute('href'));
	}
}

function removeTagText(menuItem, search) {
	menuItem.querySelector('.title').classList.remove('menu-item');

	if (search) {
		menuItem.classList.add('hide');
	}
	else {
		menuItem.classList.remove('hide');
		menuItemOpen(menuItem.parentElement);
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
			if (tagWords[i].toLowerCase().includes(searchWord)) {
				minIndex = Math.min(minIndex, i);
			}
		}
	}

	return minIndex;
}

function highlightText(item, search) {
	const { textContent } = item;
	const searchContains = new RegExp(escape(search), 'i');
	const aTags = item.querySelectorAll('a');
	if (search && searchContains.test(textContent.toLowerCase())) {
		item.innerHTML = textContent.replace(searchContains, elem => `<span class="highlight">${elem}</span>`);
		for (let a of aTags) {
			item.insertBefore(a, item.firstChild);
		}
		item.parentElement.classList.remove('hide');
		return true;
	}

	item.innerHTML = textContent;
	for (let a of aTags) {
		item.insertBefore(a, item.firstChild);
	}

	return false;
}

function formatTag(tag, search) {
	let tagWords = splitToWords(tag);
	const searchWords = splitToWords(search);
	const index = indexOfTag(tag, searchWords);
	if (tagWords.length > NUMBER_OF_VISIBLE_TAGS) {
		if (index < tagWords.length - NUMBER_OF_VISIBLE_TAGS) {
			tagWords.splice(index + NUMBER_OF_VISIBLE_TAGS, tagWords.length, '...');
		}
		if (index > 0) {
			tagWords.splice(0, index, '...');
		}
	}

	return tagWords.join(' ');
}

function updateMenuLinks(item, tag, search) {
	let href = item.getAttribute('href');
	const index = href.indexOf('#');
	href = (index >= 0) ? href.slice(0, index) : href;
	const anchor = search ? '#' + tag.replace(/(?= (?!-))(?=(?<!-) )|\./g, '-').replace('&', 'amp').replace(/(?<=-) | (?=-)|\$/mg, '') : '';
	const hash = search ? ';search=' + search : '';

	item.setAttribute('href', href + anchor + hash);
}

function splitToWords(text) {
	return text.split(' ').filter(word => word);
}

function escape(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function updateExampleLink(search) {
	const example = document.querySelector('.qgrid-examples');
	const active = document.querySelector('.active-topic');
	if (active) {
		const tags = active.dataset.exampleTag || '';
		const searchBy = [tags, search || ''].filter(function (word) { return !!word }).join(',');
		const href = example.getAttribute('href').split('?')[0];
		const param = searchBy ? '?search=' + searchBy : '';
		example.setAttribute('href', href + param);
	}
}

function setSearch(search) {
	const indexSearch = location.hash.search(/(#|;)(?=search=)/);
	const indexAnchor = location.hash.search(/#(?!search=)/);
	const anchor = (indexSearch >= 0) ? location.hash.slice(0, indexSearch + 1) :
		(indexAnchor >= 0) ? location.hash + ';' : '';

	location.hash = (search) ? anchor + 'search=' + search : anchor.replace(/;$/, '');
}

function getSearch() {
	const search = new RegExp(/^#search=|;search=/);
	const index = location.hash.indexOf(location.hash.match(search));

	return (search.test(location.hash))
		? decodeURIComponent(location.hash.substring(index + location.hash.match(search)[0].length).toLowerCase())
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
	}

	const search = document.getElementById('search');
	if (search) {
		search.addEventListener('input', onSearchChange, true);
	}

	const activeTopic = document.getElementsByClassName('active-topic')[0];
	if (activeTopic) {
		activeTopic.scrollIntoView();
		activeTopic.parentNode.parentNode.classList.remove('hide-list');
	}

	const anchors = document.querySelectorAll('.page-wrapper ul li a[href]');
	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			const element = document.querySelector(`a[name="${anchor.getAttribute('href').slice(1)}"]`);
			var headerOffset = 75;
			var elementPosition = element.getBoundingClientRect().top;
			var offsetPosition = elementPosition - headerOffset;
		
			window.scrollTo({
				 top: offsetPosition,
				 behavior: "smooth"
			});
		});
	}
}

window.onhashchange = searchOnHashChange;

document.addEventListener('DOMContentLoaded', init);