var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var clean = require('gulp-clean');
var jade = require('gulp-jade');
//var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var server = require('gulp-server-livereload');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

// Task to RUN the proyect
gulp.task('run', ['css', 'jade', 'watch', 'webserver']);


// Task clean folder Dist
gulp.task('clean-dist', function () {
	return gulp.src('./dist', {read: true})
	.pipe(clean());
});

// Task make Jade to HTML
gulp.task('jade', ['clean-dist'], function() {
	gulp.src('./app/view/**/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('./dist'))
	//.pipe(livereload());
});

// Task make Stylus to CSS
gulp.task('css', ['clean-dist'], function() {
	gulp.src('./app/styles/**/*.styl')
	.pipe(stylus())
	//.pipe(minifyCSS())
	.pipe(gulp.dest('./dist/css/'))
	//.pipe(livereload());
});

// Task for watch the folders Styles and View
gulp.task('watch', ['clean-dist'], function() {
	//livereload.listen();
	gulp.watch(
		['./app/styles/**/*.styl', './app/view/**/*.jade'], 
		['css', 'jade']
	)
});

gulp.task('webserver', function() {
	gulp.src('dist')
		.pipe(server({
			livereload: true,
			defaultFile: 'index.html',
			open: true
		}));
});