import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    Resolver: Resolver['default'],
    modulePrefix: 'js',
    LOG_VIEW_LOOKUPS: true,
    LOG_ACTIVE_GENERATION: true,
    LOG_RESOLVER: true
});

export default App;