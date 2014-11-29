var gulp = require('gulp'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    del = require('del'),
    es6ModuleTranspiler = require("gulp-es6-module-transpiler"),
    filter = require('gulp-filter'),
    gulpIf = require('gulp-if'),
    handlebars = require('gulp-handlebars'),
    lint = require('gulp-jshint'),
    karma = require('karma').server,
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare');

var config = {
    notMinifiedJs: '!**/*.min.js',
    templates: ['templates/**/*.hbs'],
    lint: [
        'app/js/**/*.js',
        'test/**/*.js'
    ],
    scripts: [
        'vendor/jquery/dist/jquery.min.js',
        'vendor/es5-shim/es5-shim.min.js',
        'vendor/handlebars/handlebars.min.js',
        'vendor/ember/ember.js',
        'vendor/ember-loader/loader.js',
        'vendor/ember-resolver/dist/ember-resolver.js',
        'app/js/**/*.js'
    ],
    css: ['app/css/*.css']
};

gulp.task('lint', function () {
    return gulp.src(config.lint)
        .pipe(lint())
        .pipe(lint.reporter('default'));
});

gulp.task('scripts', ['clean-js', 'lint'], function () {
    var vendorFilter = filter(function (file) {
        return file.base.indexOf('vendor') === -1;
    });
    var minJsFilter = filter(function (file) {
        return file.base.indexOf('.min.js') === -1;
    });

    return gulp.src(config.scripts)
        .pipe(vendorFilter)
        .pipe(es6ModuleTranspiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(vendorFilter.restore())
        .pipe(minJsFilter)
        .pipe(uglify())
        .pipe(minJsFilter.restore())
        .pipe(concat('dist.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['clean-css'], function () {
    return gulp.src(config.css)
        .pipe(minifycss())
        .pipe(concatCss('dist.min.css'))
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