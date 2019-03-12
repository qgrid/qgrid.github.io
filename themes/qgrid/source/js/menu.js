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

function replaceSymbol(text) {
	return text.replace(/%20/g, ' ');
}

function searchOnLoad(e) {
	e.stopImmediatePropagation();
	const active = document.getElementsByClassName('active-topic')[0];
	if (active) {
		if (location.hash) {
			localStorage.setItem('input', replaceSymbol(location.hash.substr(8)));
		}
		else {
			if (localStorage.getItem('input')) {
				location.hash = 'search=' + localStorage.getItem('input');
			}
		}
		searchOnPage();
	}
	localStorage.removeItem('input');
}

window.onhashchange = function () {
	searchOnPage();
}

function filter(e) {
	e.stopImmediatePropagation();
	const input = e.target || e.srcElement;
	const filter = input.value.toLowerCase();
	if (filter) { location.hash = 'search=' + filter; }
	else { location.hash = ''; }
	searchOnPage();
	tagSearch();
	selectSymbols();
	localStorage.setItem('input', location.hash.substr(8));
}

function searchOnPage() {
	const h2 = document.getElementsByTagName('h2');
	const p = document.getElementsByTagName('p');
	const code = document.getElementsByTagName('code');
	const text = [...h2, ...p, ...code];
	for (let i = text.length - 1; i >= 0; i--) {
		const title = text[i].textContent;
		const symbol = title.split('');
		const search = replaceSymbol(location.hash.substr(8)).toLowerCase();
		const index = title.toLowerCase().indexOf(search);
		if (index > -1 && search != '') {
			const space = parseInt(text[i].getBoundingClientRect().top);
			document.body.scrollTop += space;
			document.documentElement.scrollTop += space;
			for (let j = 0; j < search.length; j++) {
				symbol[index + j] = '<font style=background-color:#ffee00>' + symbol[index + j] + '</font>';
			}
			text[i].innerHTML = symbol.join('');
		}
		else {
			let font = text[i].getElementsByTagName('font');
			for (let i = 0; i < font.length; i++) {
				font[i].style.backgroundColor = '';
			}
		}
	}
}

function tagSearch() {
	const nav = document.getElementById('nav');
	const li = nav.getElementsByTagName('li');
	const tags = [];
	const active = document.getElementsByClassName('active-topic')[0];
	for (let i = 0; i < li.length; i++) {
		tags[i] = li[i].dataset.tag;
	}
	const search = replaceSymbol(location.hash.substr(8)).toLowerCase();
	for (let i = tags.length - 1; i >= 0; i--) {
		if (tags[i]) {
			const tag = tags[i].split(',');
			let dataFound;
			next: for (let j = 0; j < tag.length; j++) {
				const foundTag = tag[j].split(' ');
				for (let k = 0; k < foundTag.length; k++) {
					const index = foundTag[k].toLowerCase().indexOf(search);
					const title = li[i].getElementsByClassName('title')[0];
					if (index > -1 && li[i] != active && search != '') {
						li[i].style.display = '';
						title.style.width = '50%';
						title.style.display = 'inline';
						title.style.font = 'italic normal 10pt arial'
						title.style.paddingLeft = '8.8%';
						title.style.color = "grey";
						if (li[i].getElementsByTagName('data-found').length === 0) {
							title.prepend("/ ");
							let select = document.createElement('data-found');
							let link = document.createElement('a');
							if (foundTag.length > 2 && k != foundTag.length - 1 && k != foundTag.length - 2) {
								link.innerHTML = foundTag[k] + ' ' + foundTag[k + 1] + ' ...';
							}
							else if (foundTag.length > 2 && (k == foundTag.length - 1 || k == foundTag.length - 2)) {
								link.innerHTML = '... ' + foundTag[k - 1] + ' ' + foundTag[k];
							}
							else {
								link.innerHTML = tag[j];
							}
							select.appendChild(link);
							li[i].insertBefore(select, li[i].children[0]);
							dataFound = li[i].getElementsByTagName('data-found')[0];
							const a = dataFound.getElementsByTagName('a')[0];
							dataFound.style.display = 'inline';
							a.style.display = 'inline';
							a.setAttribute('href', title.getAttribute('href'));
						}
						else {
							if (title.innerHTML.indexOf("/ ") == -1) {
								title.prepend("/ ");
							}
							dataFound = li[i].getElementsByTagName('data-found')[0].getElementsByTagName('a')[0];
							if (foundTag.length > 2 && k != foundTag.length - 1 && k != foundTag.length - 2) {
								dataFound.innerHTML = foundTag[k] + ' ' + foundTag[k + 1] + ' ...';
							}
							else if (foundTag.length > 2 && (k == foundTag.length - 1 || k == foundTag.length - 2)) {
								dataFound.innerHTML = '... ' + foundTag[k - 1] + ' ' + foundTag[k];
							}
							else {
								dataFound.innerHTML = tag[j];
							}
							li[i].getElementsByTagName('data-found')[0].style.display = 'inline';
							dataFound.setAttribute('href', title.getAttribute('href'));

							dataFound.style.display = 'inline';
						}
						break next;
					}
					else {
						dataFound = li[i].getElementsByTagName('data-found')[0];
						if (dataFound) {
							dataFound.style.display = 'none';
							title.style.font = '';
							title.style.paddingLeft = '';
							title.style.color = '';
							title.innerHTML = title.innerHTML.replace("/ ", '');
						}
					}
				}
			}
		}
	}
}

function selectSymbols() {
	const search = replaceSymbol(location.hash.substr(8)).toLowerCase();
	const li = document.getElementsByTagName('li');
	let foundTitle = [];
	for (let i = 0; i < li.length; i++) {
		foundTitle[i] = 0;
		for (let count = 0; count <= li[i].getElementsByTagName('a').length; count++) {
			const a = li[i].getElementsByTagName('a')[count];
			if (a) {
				const index = a.text.toLowerCase().indexOf(search);
				if (index > -1) {
					foundTitle[i]++;
					const symbol = a.text.split('');
					li[i].style.display = '';
					for (let j = 0; j < search.length; j++) {
						symbol[index + j] = '<font>' + symbol[index + j] + '</font>';
					}
					a.innerHTML = symbol.join('');
					let font = li[i].getElementsByTagName('font');
					for (let i = 0; i < font.length; i++) {
						font[i].style.backgroundColor = '#efdf00';
					}
				} else {
					foundTitle[i]--;
					let font = a.getElementsByTagName('font');
					for (let j = 0; j < font.length; j++) {
						font[j].style.backgroundColor = '';
					}
					if (-foundTitle[i] == li[i].getElementsByTagName('a').length) {
						li[i].style.display = 'none';
					}


				}
			}
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
	}

	const search = document.getElementById('search');
	if (search) {
		search.addEventListener('keyup', filter, true);
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