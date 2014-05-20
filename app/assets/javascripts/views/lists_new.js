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
    var view = this;
    var $form = $(event.currentTarget);
    var rank;
    if (this.model.lists().last()) {
      rank = this.model.lists().last().get("rank") + 1;
    } else {
      rank = 0;
    }
    var inputData = $form.serializeJSON()["list"];
    var newList = new Trellino.Models.List(inputData);
    newList.set("rank", rank);
    this.model.lists().create(newList, {
      success: function(response) {
        view.$('input[name=list\\[title\\]]').val("");  
        view.$('input[name=list\\[rank\\]]').val("");  
        Backbone.history.navigate("#/boards/"+newList.attributes.board_id, {trigger: true});
      },
      error: function() {
        $form.addClass('has-error');
      }
    });
  },
});

