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
    project.children.forEach((unit, i) => {
        if (!unit.children.some(x => x.comment && x.comment.shortText)) {
            // omit files without documentaion
            return;
        }

        unit.order = i;
        
        const link = hbs.compile(API_TEMPLATE);
        const output = link({ unit });
        const name = path
            .basename(unit.originalName)
            .slice(0, -'.d.ts'.length)
            .replace(/\./g, '-');

        console.log(`process: ${name}`);

        fs.writeFileSync(
            path.join(API_FOLDER, 'model', `${name}.md`),
            output,
            { flag: 'w' }
        );

        fs.writeFileSync(
            path.join(API_FOLDER, 'model', `${name}.json`),
            JSON.stringify(unit, null, 3),
            { flag: 'w' }
        );
    });

    done();
});

gulp.task('api', gulp.series('typedoc', 'markdown'));
