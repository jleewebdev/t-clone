App.PhotoPreview = Backbone.View.extend({
  template: App.templates.photo_preview,
  tagName: "li",
  className: "photo_preview",

  render: function() {
    var id = this.model.get("_id");
    this.$el.attr("id", "photo_" + id);
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  initialize: function() {
    this.render();
  }
})