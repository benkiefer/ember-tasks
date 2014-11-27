App.TaskRoute = Ember.Route.extend({
    model: function() {
        return App.Task.find();
    }
});