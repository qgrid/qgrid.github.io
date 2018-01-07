const hbs = require('handlebars')
const path = require('path');

const isArray = x => x.constructor === Array.prototype.constructor;
const br = x => x.replace(/\n/g, '<br />');
const escape = x => x;
const print = xs => {
	if (isArray(xs)) {
		return new hbs.SafeString(xs.map(escape).join(' '));
	}

	return new hbs.SafeString(escape(xs));
};

hbs.registerHelper('api-github', file => {
	const name = path.basename(file).slice(0, -'.d.ts'.length);
	return print(`https://github.com/qgrid/ng2/core/${name}.js`);
});

hbs.registerHelper('api-title', unit => {
	return print(unit.children.map(x => x.name).join(', '));
});

hbs.registerHelper('api-type', meta => {
	if (meta.elementType) {
		return print(`${meta.name || meta.type}<${meta.elementType.name}>`);
	}

	return print(meta.name || meta.type);
});

hbs.registerHelper('api-comment', comment => {
	const lines = [];
	if (comment) {
		if (comment.shortText) {
			lines.push(comment.shortText);
		}

		if (comment.text) {
			lines.push(comment.text);
		}
	}

	return print(lines);
});

hbs.registerHelper('api-comment-inline', comment => {
	const lines = [];
	if (comment) {
		if (comment.shortText) {
			lines.push(br(comment.shortText));
		}

		if (comment.text) {
			lines.push(br(comment.text));
		}
	}

	return print(lines);
});

hbs.registerHelper('api-order', unit => unit.order);

module.exports = hbs;