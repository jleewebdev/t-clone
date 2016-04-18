App.Router = Backbone.Router.extend({
  routes: {
    ""              : "renderIndexRoute"
  },

  renderIndexRoute: function() {
    new App.Index();
  }


})