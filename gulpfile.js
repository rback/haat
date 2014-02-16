var gulp = require('gulp')
var gutil = require('gulp-util')
var bower = require('gulp-bower');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('bower', function() {
  bower()
  .pipe(gulp.dest('./dist/js/components'))
});

gulp.task('copy', function () {
	// Copy all application files except *.less and .js into the `dist` folder
    return gulp.src(['public/**', '!public/js/**', '!public/less/**'])
	    .pipe(gulp.dest('./dist'))
});

gulp.task('less', function () {
  gulp.src('./public/less/styles.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'public') ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function() {
  gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('dist', ['copy', 'bower', 'less', 'scripts']);

gulp.task('default', function(){
  // place code for your default task here
})