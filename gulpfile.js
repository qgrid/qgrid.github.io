const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const path = require('path');
const fs = require('fs')
const hbs = require('handlebars')

const API_FOLDER = './source/api/'
const API_JSON_PATH = path.join(API_FOLDER, 'index.json');
const API_TEMPLATE = fs.readFileSync(path.join(API_FOLDER, 'index.hbs'));


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
    project.children.forEach(file => {
        console.log(API_TEMPLATE);

        const link = hbs.compile(API_TEMPLATE);
        const output = link({ file });
        fs.writeFileSync(path.join(API_FOLDER, 'model', file.name), output);
    });

    done();
});

gulp.task('api', gulp.series('typedoc', 'markdown'));
