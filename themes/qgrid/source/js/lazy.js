function isVisible(element) {
	const rect = element.getBoundingClientRect();
	return rect.top >= 0 && (rect.bottom - rect.height / 2) <= window.innerHeight;
}

function liveUp() {
	const elements = document.querySelectorAll('[data-src]');
	for (let element of elements) {
		const src = element.dataset.src;
		if (src && isVisible(element)) {
			element.setAttribute('src', src);
			element.removeAttribute('data-src');
		}
	}
}

var isScrolling;
window.addEventListener('scroll', function () {
	window.clearTimeout(isScrolling);
	isScrolling = setTimeout(function () {
		liveUp();
	}, 66);
}, false);

document.addEventListener('DOMContentLoaded', liveUp);
