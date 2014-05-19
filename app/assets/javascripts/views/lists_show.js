window.Trellino.Views.listsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    this.model.cards().each(this.addCard.bind(this));
    this.renderSubview();
  },
  
  events: {
    "click button.add": "addNewCardView",
    "click button.list-destroy": "destroy"
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
      model: card
    });
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
  },
  
  removeCard: function(card) {
    var cardsShowView = _(this.subviews()[".cards"]).find(function (subview) {
      return subview.model == card;
    });
    this.removeSubview(".cards", cardsShowView);
  },
  
  addNewCardView: function() {
    var cardNewView = new Trellino.Views.cardsNew({
      model: this.model
    });
    this.addSubview(".card-new", cardNewView);
    cardNewView.render();
    this.renderSubview();
  }, 
  
  destroy: function() {
    this.model.destroy();
  }
  
  
});