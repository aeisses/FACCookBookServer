var gulp = require('gulp');
var gmocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('mocha', function () {
  return gulp.src(['tests/**/*.js', '!tests/lib/**/*.js'], { read: false })
    .pipe(gmocha({
      reporter: 'spec'
    }));
});

gulp.task('watch', function () {
  return gulp.watch(
    ['lib/**/*.js', 'tests/**/*.js', '!tests/lib/**/*.js'], ['mocha']);
});

gulp.task('test', ['mocha']);
gulp.task('default', ['mocha']);
