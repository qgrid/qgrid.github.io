const path = require('path');
const fs = require('fs');
const marked = require('marked');

const apiGithubUrl = file => {
	const path = file
		.slice(file.indexOf('/core/') + 1)
		.slice(0, -'.d.ts'.length);

	return `https://github.com/qgrid/ng2/tree/master/${path}.js`;
};

const apiGithubName = file => {
	const name = path.basename(file).slice(0, -'.d.ts'.length);
	return `${name}.js`;
};

const apiType = meta => {
	const type = meta.name || meta.type;
	if (meta.elementType) {
		return type === 'array'
			? `${meta.elementType.name}[]`
			: `${type}<${meta.elementType.name}>`;
	}

	return type;
};

const apiComment = comment => {
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
	return marked(result.join('\n'));
};


const helper = args => {
	const jsonPath = args[0];
	const json = fs.readFileSync(jsonPath);
	const unit = JSON.parse(json);
	const unitCls = unit.children[0];
	const unitMeta = unitCls.children;
	const lines = (unitMeta || [])
		.filter(m => !!(m.comment && m.comment.shortText))
		.map(m => `<tr><td class="name">${m.name}</td><td class="type"><code>${apiType(m.type)}</code></td><td class="comment">${apiComment(m.comment)}</td></tr>`);

	const template = lines.length
		? `
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Type</th>
				<th>Description
					<a class="github-link2" target="_blank" href="${apiGithubUrl(unit.originalName)}">
						<span>${apiGithubName(unit.originalName)}</span>
					</a>
				</th>
			</tr>
		</thead>
		<tbody>
			${lines.join('')}
		</tbody>
	</table>`
		: '';

	return template;
};

hexo.extend.tag.register("docTable", helper);
hexo.extend.helper.register("docTable", helper);
