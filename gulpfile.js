var gulp = require('gulp'),
    concat = require('gulp-concat'),
    concatcss = require('gulp-concat-css'),
    del = require('del'),
    gulpFilter = require('gulp-filter'),
    lint = require('gulp-jshint'),
    mainBowerFiles = require('main-bower-files'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var config = {
    scripts: ['src/js/**/*.js'],
    css: ['src/css/**/*.css']
};

gulp.task('lint', function () {
    return gulp.src(config.scripts)
        .pipe(lint())
        .pipe(lint.reporter('default'));
});

gulp.task('scripts', ['clean-js', 'lint'], function () {
    return gulp.src(config.scripts)
        .pipe(uglify())
        .pipe(concat('dist.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['clean-css'], function () {
    return gulp.src(config.css)
        .pipe(minifycss())
        .pipe(concatcss('dist.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('clean-js', function (cb) {
    del(['build/js'], cb);
});

gulp.task('clean-css', function (cb) {
    del(['build/css'], cb);
});

gulp.task('watch', function () {
    gulp.watch(config.scripts, ['scripts']);
    gulp.watch(config.css, ['css']);
});

gulp.task('default', ['watch', 'scripts', 'css']);
gulp.task('build', ['scripts', 'css']);