App.Task = Ember.Object.extend({
    name: ''
});

App.Task.reopenClass({
    tasks: [],
    add: function(hash) {
        var task = App.Task.create(hash);
        this.tasks.pushObject(task);
    },
    remove: function(task) {
        this.tasks.removeObject(task);
    },
    find: function() {
        return this.tasks;
    }
});