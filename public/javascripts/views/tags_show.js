App.TagsShow = Backbone.View.extend({
  template: App.templates.index,

  loading: false,

  scrollWhere: function() {
    var position = window.pageYOffset / $(window).height();
    if (position > 0.60 && this.loading === false) {
      console.log("Load more!")
      this.showMore();
    }
  },

  showMore: function() {
    this.loading = true;
    var self = this;
    var params = {skip: this.skip, tag: this.tag}
    app.collection.fetch( {data: params, remove: false }).
      done(function(collection) {
        self.skip += self.skip_increment;

        _.each(collection, function(photo) {
            self.$el.find("#photos_list").append(new App.PhotoPreview({model: new App.Photo(photo)}).$el);
          });
        self.loading = false;
      });
  },

  initialize: function(args) {
    this.tag = args["tag"]
    this.skip_increment = 5;
    this.skip = this.skip_increment;
    _.bindAll(this, 'scrollWhere');
    $(window).scroll(this.scrollWhere);
    this.render();

  },

  render: function() {
    var self = this;
    this.$el.html(this.template);
    app.page.html(this.$el);

    app.collection.fetch({
      data: { tag: this.tag },
      processData: true
    })

    _.each(app.collection.toArray(), function(photo) {
      app.page.find("#photos_list").append(new App.PhotoPreview({model: photo}).$el);
    });
  }
});