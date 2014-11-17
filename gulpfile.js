var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    concatcss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    del = require('del');

var paths = {
    scripts: ['src/js/**/*.js'],
    css: ['src/css/**/*.css']
};

gulp.task('scripts', ['clean-js'], function () {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('dist.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['clean-css'], function () {
    return gulp.src(paths.css)
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
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['watch', 'scripts', 'css']);
gulp.task('build', ['scripts', 'css']);