const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const {globs, folders, files} = require('./config/paths');

gulp.task('build:sass', () => {
  return gulp.src(files.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(folders.css))
    .pipe(browserSync.stream({match: globs.css}))
});

gulp.task('copy:html', () => {
  return gulp.src(globs.html).pipe(gulp.dest(folders.build))
});

gulp.task('watch', () => {
  browserSync.init({
      server: 'build',
      ghostMode: false,
      open: false
  });
  gulp.watch(globs.sass, ['build:sass']);
  gulp.watch(globs.html).on('change', (file) => {
    gulp
      .src(file.path)
      .pipe(gulp.dest(folders.build))
      .on('end', browserSync.reload)
  });
});

gulp.task('dev', ['copy:html', 'build:sass', 'watch']);
gulp.task('build', ['copy:html', 'build:sass']);
