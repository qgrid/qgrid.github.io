const gulp = require("gulp");
const unzip = require("gulp-unzip");
const path = require("path");
const minimist = require("minimist");
const minimatch = require("minimatch");

const options = minimist(process.argv.slice(2));

gulp.task("unzip", () => {
  return gulp
    .src("ng/*.{tar,tar.bz2,tar.gz,zip}")
    .pipe(
      unzip({
        filter: entry => minimatch(entry.path, "**/*.ts")
      })
    )
    .pipe(gulp.dest(path.join("dist", options.version)));
});
