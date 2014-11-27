var gulp = require('gulp'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    concatcss = require('gulp-concat-css'),
    del = require('del'),
    gulpIf = require('gulp-if'),
    lint = require('gulp-jshint'),
    minifycss = require('gulp-minify-css'),
    karma = require('karma').server,
    uglify = require('gulp-uglify'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare');


var config = {
    notMinifiedJs: '!**/*.min.js',
    templates: ['templates/**/*.hbs'],
    scripts: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/handlebars/handlebars.min.js',
        'bower_components/ember/ember.min.js',
        'src/js/**/*.js'
    ],
    css: ['src/css/**/*.css']
};

gulp.task('lint', function () {
    return gulp.src(config.scripts)
        .pipe(gulpIf(config.notMinifiedJs, lint()))
        .pipe(lint.reporter('default'));
});

gulp.task('scripts', ['clean-js', 'lint'], function () {
    return gulp.src(config.scripts)
        .pipe(gulpIf(config.notMinifiedJs, uglify()))
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

gulp.task('clean-templates', function (cb) {
    del(['build/templates'], cb);
});

gulp.task('clean-css', function (cb) {
    del(['build/css'], cb);
});

gulp.task('watch', function () {
    gulp.watch(config.templates, ['templates']);
    gulp.watch(config.css, ['css']);
    gulp.watch(config.scripts, ['scripts']);
});

gulp.task('templates', function () {
    gulp.src(config.templates)
        .pipe(handlebars({
            handlebars: require('ember-handlebars')
        }))
        .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Ember.TEMPLATES',
            noRedeclare: true
        }))
        .pipe(uglify())
        .pipe(concat('templates.min.js'))
        .pipe(gulp.dest('build/templates/'));
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('build', ['templates', 'scripts', 'css']);