'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');


// browser-sync
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'src'
		},
	});
});


// scss
gulp.task('sass', function () {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer(['last 10 versions'], 
			{ cascade: false }))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}));
});


// scripts minimization
// gulp.task('scripts', function () {
// 	 return gulp.src([
//     'src/libs/jquery/dist/jquery.min.js',
//     'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
// 	 	])
// 	 .pipe(concat('libs.min.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('src/js'));
// });


// css minimization
gulp.task('css-min', ['sass'], function () {
	 return gulp.src('src/css/*.css')
	 .pipe(cssnano())
	 .pipe(gulp.dest('dist/css'));
});


// watch
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/*.jade', browserSync.reload);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**.js', browserSync.reload);
});


// clean
gulp.task('clean', function () {
	 return del.sync('dist');
});


// images
gulp.task('img', function() {
   return gulp.src('src/img/**/*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'));
});


// build
gulp.task('build', ['clean', 'img', 'sass',  'css-min'], function () {

	 var buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

   var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));

   var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

   var buildFavicons = gulp.src('src/favicons/**/*')
    .pipe(gulp.dest('dist/favicons'));
});


// default
gulp.task('default', ['watch']);