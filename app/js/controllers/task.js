import Task from 'js/models/task';

var TaskController = Ember.ArrayController.extend({
    actions: {
        add: function() {
            var name = {
                name: this.get('name')
            };
            Task.add(name);
        },
        remove: function(task) {
            Task.remove(task);
        }
    }
});

export default TaskController;
