'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'uglify-save-license', 'del']
});

gulp.task('compass', function () {
    return gulp.src(['src/styles/*.scss'])
        .pipe($.sass({style: 'expanded'}))
        .on('error', function handleError(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('.tmp/styles/'));
});

gulp.task('styles', ['compass'], function(){
    var cssFilter = $.filter('**/*.css');

    return gulp.src(['.tmp/styles/*.css'])
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.rename(function (path)
        {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('dist/styles/'))
        .pipe($.size({ title: 'dist/styles/', showFiles: true }));
});

gulp.task('scripts', function(){
    var jsFilter = $.filter('**/*.js');

    return gulp.src(['src/scripts/*.js'])
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.angularFilesort())
        .pipe($.concat('angular-piechart.min.js'))
        .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(jsFilter.restore())
        .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('clean', function (done) {
    $.del(['dist/', '.tmp/'], done);
});

gulp.task('build', ['styles', 'scripts']);