import Task from 'js/models/task';

var TaskRoute = Ember.Route.extend({
    model: function() {
        console.log('finding');
        return Task.find();
    }
});

export default TaskRoute;