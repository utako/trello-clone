window.Trellino.Views.listsNew = Backbone.CompositeView.extend({
  template: JST["lists/new"],
  
  events: {
    "submit form": "submit" 
  },
  
  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    view = this;
    var inputData = $(event.currentTarget).serializeJSON()["list"];
    var newList = new Trellino.Models.List(inputData);
    this.model.lists().create(newList, {
      success: function(response) {
        view.$('input[name=list\\[title\\]]').val("");  
        view.$('input[name=list\\[rank\\]]').val("");  
        Backbone.history.navigate("#/boards/"+newList.attributes.board_id, {trigger: true});
      }
    });
  },
});

