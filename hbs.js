const hbs = require('handlebars')
const path = require('path');

function isArray(x) {
	return x.constructor === Array.prototype.constructor;
}

function print(xs) {
	if (isArray(xs)) {
		return new hbs.SafeString(xs.join('\n'));
	}

	return new hbs.SafeString(xs);
}

function split(comment) {
	const result = [];
	if (comment) {
		if (comment.shortText) {
			result.push(comment.shortText);
		}

		if (comment.text) {
			const lines = comment.text.split(/\r?\n/);
			result.push(...lines);
		}
	}
	return result;
};

hbs.registerHelper('api-title', unit => {
	return print(unit.children.map(x => x.name).join(', '));
});

hbs.registerHelper('api-path', file => {
	const name = path.basename(file).slice(0, -'.d.ts'.length).replace(/\./g, '-');
	return print(`source/api/model/${name}.json`);
});

hbs.registerHelper('api-description', comment => {
	const lines = split(comment);
	const result = [];
	for (const line of lines) {
		if (line[0] === '#') {
			break;
		}

		result.push(line);
	}

	return print(result);
});


hbs.registerHelper('api-comment', comment => {
	const lines = split(comment);
	const result = [];
	let isComment = false;
	for (const line of lines) {
		if (!isComment && line[0] === '#') {
			isComment = true;
		}

		if (isComment) {
			result.push(line);
		}
	}

	return print(result);
});

hbs.registerHelper('api-order', unit => unit.order);

module.exports = hbs;