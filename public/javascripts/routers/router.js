App.Router = Backbone.Router.extend({
  routes: {
    "tags"          : "renderTagsIndex",
    "tags/:tag"     : "goToTagPage",
    "photos/"       : "redirectToHome",
    "photos/new"    : "renderNewPhoto", 
    "photos/:slug"  : "showPhoto",
    "login"         : "renderLogin",
    "register"      : "renderRegister",
    ""              : "renderIndexRoute",
  },

  renderLogin: function() {
    new App.Login();
  },

  renderRegister: function() {
    new App.Register();
  },

  renderNewPhoto: function() {
    new App.PhotoNew();
  },

  redirectToHome: function() {
    app.router.navigate("/");
    this.renderIndexRoute();
  },

  showPhoto: function(slug) {
    var model = new App.Photo({_id: slug});
    model.fetch().done(function(photo) {
      new App.PhotosShow({model: model});
    });
  },

  goToTagPage: function(tag) {
    app.collection.fetch({
      traditional: true,
      data: {tag: tag}
    }).done(function(data){
      new App.TagsShow({collection: data, tag: tag })
    });
  },

  renderTagsIndex: function() {
    $.ajax({
      url: '/tags',
    })
    .done(function(data) {
      app.page.html(new App.TagsIndex({
        collection: data
      }).$el );
    })
    app.collection.fetch();
  },

  renderIndexRoute: function() {
    new App.Index();
  }


})