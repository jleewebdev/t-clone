App.Photos = Backbone.Collection.extend({
  model : App.Photo,
  url: "http://localhost:3000/photos"
});