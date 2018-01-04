const path = require('path');
const fstream = require('fstream');
const unzip = require('unzip');
const glob = require('glob');

glob('ng/*.@(zip)', (er, files) => {
    files.forEach(file => {
        const version = path.parse(file).name;

        fstream.Reader(file)
            .pipe(unzip.Parse())
            .on('entry', entry => {
                if (entry.path.indexOf('app.component') > 0) {
                    const {name, ext} = path.parse(entry.path);
                    entry.pipe(fstream.Writer(path.join('dist', version, `${name}.${ext}`)));
                }
            });
    });
});
