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

hbs.registerHelper('api-github-url', file => {
	const path = file
		.slice(file.indexOf('/core/') + 1)
		.slice(0, -'.d.ts'.length);

	return print(`https://github.com/qgrid/ng2/tree/master/${path}.js`);
});

hbs.registerHelper('api-github-name', file => {
	const name = path.basename(file).slice(0, -'.d.ts'.length);
	return print(`${name}.js`);
});

hbs.registerHelper('api-title', unit => {
	return print(unit.children.map(x => x.name).join(', '));
});

hbs.registerHelper('api-type', meta => {
	const type = meta.name || meta.type;	
	if (meta.elementType) {
		return print(type === 'array'
			? `${meta.elementType.name}[]`
			: `${type}<${meta.elementType.name}>`);
	}

	return print(type);
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