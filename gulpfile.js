'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');



gulp.task('sass', function() {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/sass'));
});



gulp.task('default', function() {
    nodemon({
        script: 'index.js',
        ext: 'js html',
        env: {},
        ignore: ['public']
    });
    gulp.watch('./public/sass/*.scss', ['sass']);
});



var script1 = [
    './public/libs/jQuery/dist/jquery.js',
    './public/js/bootstrap-4.0.0/dist/js/bootstrap.min.js',
    './public/js/owl.carousel.min.js',
    './public/js/jquery.sticky.js',
    './public/libs/angular/angular.min.js',
    './public/js/popper.js',
    './public/js/easing.min.js',
    './public/js/hoverIntent.js',
    './public/js/superfish.min.js',
    './public/js/parallax.min.js',
    './public/js/main.js',
    './public/libs/angular-route/angular-route.min.js',
    './public/libs/angular-toastr/dist/angular-toastr.tpls.js',
    './public/libs/angular-sanitize/angular-sanitize.min.js',
    './public/libs/angular-ui-router/release/angular-ui-router.min.js',
    './public/libs/angular-resource/angular-resource.min.js',
    './public/libs/angular-mocks/angular-mocks.js',
    './public/libs/angular-cookies/angular-cookies.js',
    './public/libs/angular-bootstrap/ui-bootstrap-tpls.js',
    './public/libs/angular-animate/angular-animate.min.js'
];



gulp.task('js', function() {
    return gulp.src(script1)
        .pipe(concat('script-1.min.js'))
        // .pipe(gulp.dest('public/iccaches/'));
        .pipe(gulp.dest('public/js/'));
});



gulp.task('all', ['js']);
