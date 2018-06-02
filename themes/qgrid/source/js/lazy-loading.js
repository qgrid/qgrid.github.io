function isVisible(elem) {

	const coords = elem.getBoundingClientRect();

	const windowHeight = document.documentElement.clientHeight;

	const topVisible = coords.top > 0 && coords.top < windowHeight;
	const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

	return topVisible || bottomVisible;
}

function showVisible() {
	const editors = document.querySelectorAll('.editor iframe');
	for (let i = 0; i < editors.length; i++) {

		const editor = editors[i];
		const src = editor.dataset.src;

		if (src && isVisible(editor)) {
			editor.src = src;
			editor.removeAttribute('data-src');
		}
	}

}

window.onscroll = showVisible;

document.addEventListener('DOMContentLoaded', showVisible);
