var Router = Ember.Router.extend();

Router.map(function() {
    console.log(Ember.keys(Ember.TEMPLATES));
    this.route("task", { path: "/task" });
});

export default Router;
