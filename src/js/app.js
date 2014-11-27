App = Ember.Application.create();

App.Router.map(function() {
    this.resource("task", { path: "/" });
});

App.TaskRoute = Ember.Route.extend({
    model: function() {
        return App.Task.find();
    }
});

App.TaskController = Ember.ArrayController.extend({
    actions: {
        add: function() {
            var name = {
                name: this.get('name')
            };
            App.Task.add(name);
        },
        remove: function(task) {
            App.Task.remove(task);
        }
    }
});

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


