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
