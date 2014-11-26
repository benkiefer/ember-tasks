module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['qunit'],
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/ember/ember.js',
            'src/js/**/*.js',
            'test/js/*.js'
        ],
        logLevel: config.LOG_ERROR,
        exclude: [],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        preprocessors: {
            "**/*.handlebars": 'ember'
        }
    });
};
