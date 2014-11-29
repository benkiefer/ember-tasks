var IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('task');
  }
});

export default IndexRoute;