App.BoardsView = Backbone.View.extend({
  template: App.templates["boards_view"],


  initialize: function() {
    this.render();
  },

  render: function() {
    console.log("A new boards view was rendered")
  }

})