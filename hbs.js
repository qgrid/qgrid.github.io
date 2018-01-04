const hbs = require('handlebars')
const path = require('path');

const isArray = x => x.constructor === Array.prototype.constructor;
const print = x => {
    if (isArray(x)) {
        return new hbs.SafeString(x.join('<br />'));
    }

    return new hbs.SafeString(x);
};

hbs.registerHelper('api-github', file => {
    const name = path.basename(file).slice(0, -'.d.ts'.length);
    console.log(name);
    return ''; print(`https://github.com/qgrid/ng2/core/${name}.js`);
});

hbs.registerHelper('api-title', unit => {
    return print(unit.children.map(x => x.name).join(', '));
});

hbs.registerHelper('api-github', file => {
    const name = path.basename(file);
    return print(`https://github.com/qgrid/ng2/core/${name}`);
});

hbs.registerHelper('api-type', meta => {
    if (meta.elementType) {
        return print(`${meta.type}<${meta.elementType.name}>`);
    }

    return print(meta.type);
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

module.exports = hbs;