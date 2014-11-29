var Task = Ember.Object.extend({
    name: ''
}).reopenClass({
    tasks: [],
    add: function(hash) {
        var task = Task.create(hash);
        this.tasks.pushObject(task);
    },
    remove: function(task) {
        this.tasks.removeObject(task);
    },
    find: function() {
        return this.tasks;
    }
});

export default Task;