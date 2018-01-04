const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const path = require('path');
const fs = require('fs')
const hbs = require('./hbs');

const API_FOLDER = './source/api/'
const API_JSON_PATH = path.join(API_FOLDER, 'index.json');
const API_TEMPLATE = fs.readFileSync(path.join(API_FOLDER, 'index.hbs'), 'utf8');

gulp.task('typedoc', () =>
    gulp
        .src(['./node_modules/ng2-qgrid/core/**/*.model.d.ts'])
        .pipe(typedoc({
            module: 'commonjs',
            target: 'es5',
            includeDeclarations: true,
            json: API_JSON_PATH,
            name: 'qgrid',
            ignoreCompilerErrors: true,
            excludeExternals: true
        }))
);

gulp.task('markdown', done => {
    const input = fs.readFileSync(API_JSON_PATH);
    const project = JSON.parse(input);
    project.children.forEach(unit => {
        const link = hbs.compile(API_TEMPLATE);
        const output = link({ unit });
        fs.writeFileSync(
            path.join(API_FOLDER, 'model', `${path.basename(unit.originalName).slice(0, -'.d.ts'.length)}.md`),
            output,
            {flag: 'w'}
        );
    });

    done();
});

gulp.task('api', gulp.series('typedoc', 'markdown'));
