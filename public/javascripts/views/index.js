App.Index = Backbone.View.extend({
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
    app.collection.fetch( {data: {skip: self.skip}, remove: false }).
      done(function(collection) {
        console.log(collection);
        self.skip += self.skip_increment;

        _.each(collection, function(photo) {
            self.$el.find("#photos_list").append(new App.PhotoPreview({model: new App.Photo(photo)}).$el);
          });
        self.loading = false;
      });
  },

  initialize: function(tag) {
    this.skip_increment = 5;
    this.skip = this.skip_increment;

    _.bindAll(this, 'scrollWhere');
    $(window).scroll(this.scrollWhere);
    this.render(tag);

  },

  render: function(tag) {
    var self = this;
    this.$el.html(this.template);
    app.page.html(this.$el);

    if (tag === undefined) {
      app.collection.fetch().done(function(){
          _.each(app.collection.toArray(), function(photo) {
          app.page.find("#photos_list").append(new App.PhotoPreview({model: photo}).$el);
          });
      });
    } else {
      app.collection.fetch({
        data: {
          tag: tag
        }
      }).done(function(collection) {
        _.each(collection.toArray(), function(photo) {
        app.page.find("#photos_list").append(new App.PhotoPreview({model: photo}).$el);
        });
      })
    } 
  }
});