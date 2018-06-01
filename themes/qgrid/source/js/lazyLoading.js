function inViewport(el) {

	if (!el || 1 !== el.nodeType) {
		return false;
	}
	const html = document.documentElement;
	const r = el.getBoundingClientRect();

	return (!!r
		&& r.bottom >= 0
		&& r.right >= 0
		&& r.top <= html.clientHeight
		&& r.left <= html.clientWidth
	);

}

function check(editors) {
	for (let editor of editors) {
		if (inViewport(editor)) {
			console.log(editor.dataset.src);
		}
	}
}

function init() {
	const editors = document.querySelectorAll('.editor');
	document.addEventListener('scroll', check(editors));
}

document.addEventListener('DOMContentLoaded', init);
