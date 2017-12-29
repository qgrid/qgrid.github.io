const gulp = require("gulp");
const unzip = require("gulp-unzip");
const path = require("path");
const minimist = require("minimist");

var knownOptions = {
  string: "version",
  default: { version: "1.0.0" }
};

const options = minimist(process.argv.slice(2));

gulp.task("unzip", () => {
  return gulp
    .src("ng/*.{tar,tar.bz2,tar.gz,zip}")
    .pipe(unzip())
    .pipe(gulp.dest(path.join("dist", options.version)));
});
