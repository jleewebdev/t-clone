App.AppView = Backbone.View.extend({
  el: $("main"),

  template: App.templates["index_view"],

  initialize: function() {
    console.log("App started");
    this.render();
  },

  render: function() {
    console.log("rendering app_view")
  }
})