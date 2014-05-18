window.Trellino.Views.listsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.model.cards().each(this.addCard.bind(this));
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model,
      cards: this.model.cards
    });
    this.$el.html(renderedContent);
    this.renderSubview();
    return this;
  },
  
  addCard: function(card) {
    var cardsShowView = new Trellino.Views.cardsShow({
      model: list
    });
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
  },
  
  
});