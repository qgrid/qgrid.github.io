function isVisible(element) {
	const rect = element.getBoundingClientRect();
	const top = document.documentElement.scrollTop;
	const bottom = top + document.documentElement.clientHeight;

	return rect.top < 0 && rect.bottom > 0 || Math.max(rect.top, top) <= Math.min(rect.bottom, bottom);
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

window.onscroll = liveUp;

document.addEventListener('DOMContentLoaded', liveUp);
