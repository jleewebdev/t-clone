App.PhotoNew = Backbone.View.extend({
  template: App.templates.photos_new,
  attributes: {
    id: "photos_new"
  },

  events: {
    "click #create_photo": "create_photo"
  },

  validate_form: function() {
    return !!$("#title_input").value
  },

  create_photo: function() {
      var values = {};
      _.each($(".form_photos_new input"), function(input){
        values[input.name] = input.value;
      });

      values["body"] = $("#body_input").val();

      if (values.tags === "") {
        values.tags = ["untagged"];
      } else {
        values.tags = values.tags.split(" ").map(function(el) {
          el.replace(/[^a-zA-Z\d]/g, "-")
          console.log(el)
          console.log(el.toLowerCase())
          return el.toLowerCase();
        });
      }
      app.collection.create(values, {wait : true,    // waits for server to respond with 200 before adding newly created model to collection

        success : function(model){
          app.router.navigate("photos/" + model.get("slug"), {trigger: true, replace: true})
        }
      });

  },

  render: function() {
    this.$el.html(this.template());
    app.page.html(this.$el)
  },

  initialize: function() {
    this.render();
  }
})