const hbs = require('handlebars')
const path = require('path');

function isArray(x) {
	return x.constructor === Array.prototype.constructor;
}

function br(x) { 
	return x.replace(/\r?\n/g, '<br>');
}

function print(xs) {
	if (isArray(xs)) {
		return new hbs.SafeString(xs.join('\n'));
	}

	return new hbs.SafeString(xs);
};

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

hbs.registerHelper('api-path', file => {
	const name = path.basename(file).slice(0, -'.d.ts'.length);
	return print(`/api/${name}.json`);
});
	

hbs.registerHelper('api-description', comment => {
	const lines = split(comment);
	const result = [];
	for(const line of lines) {
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
	for(const line of lines) {
		if (!isComment && line[0] === '#') {
			isComment = true;
		}

		if (isComment) {
			result.push(line);
		}
	}

	return print(result);
});

hbs.registerHelper('api-comment-inline', comment => {
	const lines = split(comment);
	const result = br(lines.join(' '));
	return print(result);
});

hbs.registerHelper('api-order', unit => unit.order);

module.exports = hbs;