var fs = require('fs');

var gulp = require('gulp');
var gmocha = require('gulp-mocha');
var gutil = require('gulp-util');
var gjshint = require('gulp-jshint');

gulp.task('mocha', function () {
  return gulp.src(['tests/**/*.js', '!tests/lib/**/*.js'], { read: false })
    .pipe(gmocha({
      reporter: 'spec'
    }));
});

gulp.task('jshint', function () {

  return gulp.src(['lib/**/*.js', 'tests/**/*.js', 'bin/**/*.js'])
    .pipe(gjshint())
    .pipe(gjshint.reporter('default', { verbose: true }))
    .pipe(gjshint.reporter('fail'));
});

gulp.task('watch', function () {
  return gulp.watch(
    ['lib/**/*.js', 'tests/**/*.js', '!tests/lib/**/*.js'], ['mocha']);
});

gulp.task('test', ['jshint', 'mocha']);
gulp.task('default', ['mocha']);
