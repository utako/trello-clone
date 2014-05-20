window.Trellino.Views.cardsNew = Backbone.View.extend({
  template: JST["cards/new"],
  
  events: {
    "submit form": "submit"
  },
  
  render: function() {
    var renderedContent = this.template({
      card: this.model,
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    view = this;
    if (this.model.cards().last()) {
      rank = this.model.cards().last().get("rank") + 1;
    } else {
      rank = 0;
    }
    var listID = this.model.get('id');
    var boardID = this.model.get('board_id');
    var inputData = $(event.currentTarget).serializeJSON()["card"];
    var newCard = new Trellino.Models.Card(inputData);
    newCard.set("rank", rank);
    newCard.set("list_id", listID);
    this.model.cards().create(newCard, {
      success: function(response) {
        view.$('input[name=list\\[title\\]]').val("");  
        Backbone.history.navigate("#/boards/"+boardID, {trigger: true});
      }
    });
  },
  
});