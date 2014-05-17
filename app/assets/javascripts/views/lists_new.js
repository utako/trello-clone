window.Trellino.Views.listsNew = Backbone.View.extend({
  template: JST["lists/new"],
  
  events: {
    "submit form": "submit" 
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    view = this;
    debugger
    var inputData = $(event.currentTarget).serializeJSON()["list"];
    var newList = new Trellino.Models.List(inputData);
    newList.save({}, {
      success: function(response) {
        var id = response.get("id");
        Trellino.Collections.lists.add(newList);
        view.$('input[name=list\\[title\\]]').val("");
        view.renderPreview();
      }
    });
  }
});

