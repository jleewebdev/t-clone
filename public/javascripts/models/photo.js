Backbone.Model.prototype.idAttribute = "_id";
App.Photo = Backbone.Model.extend({
  urlRoot: "/photos",
  defualts: {
    body: "No body",
    author: "Unknown",
    categories: ["untitled"],
  },

  initialize: function() {
    this.on("invalid", function() {
      alert("Please enter a title");
    });
  },

  validate: function(attrs){
    if (!attrs.title) {
      return "Need a title"
    }
  }

});