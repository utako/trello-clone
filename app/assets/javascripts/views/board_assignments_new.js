window.Trellino.Views.assignmentsNew = Backbone.View.extend({
  template: JST["board_assignments/new"],
  
  events: {
    "submit form": "submit" 
  },
  
  render: function() {
    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    var inputData = $(event.currentTarget).serializeJSON();
    var newBoardAssignment = new Trellino.Models.BoardAssignment(inputData);
    newBoardAssignment.save({}, {
      success: function(response) {
        var id = response.get("id");
        Backbone.history.navigate("#/boards/"+id, {trigger: true});
      }
    });
  },
});