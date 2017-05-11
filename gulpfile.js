const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('build:sass', () => {
  return gulp.src('./src/sass/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream({match: "**/*.css"}))
});

gulp.task('watch', () => {
  browserSync.init({
      server: ['src', 'build'],
      ghostMode: false,
      open: false
  });
  gulp.watch('src/sass/**/*.*', ['build:sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('dev', ['build:sass', 'watch'])
