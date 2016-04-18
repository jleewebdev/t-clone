App.BoardsNewView = Backbone.View.extend({
  template: App.templates["boards_new_view"],


  initialize: function() {
    this.render();
  },

  render: function() {
    console.log("A new boards form view was rendered")
  }

})