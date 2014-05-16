window.Trellino.Views.boardsNew = Backbone.View.extend({
  template: JST["boards/new"],
  
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
    var inputData = $(event.currentTarget).serializeJSON()["board"];
    var newBoard = new Trellino.Models.Board(inputData);
    newBoard.save({}, {
      success: function(response) {
        var id = response.get("id");
        debugger
        Trellino.Collections.boards.add(newBoard);
        Backbone.history.navigate("#/boards/"+id, {trigger: true});
      }
    });
  },
});