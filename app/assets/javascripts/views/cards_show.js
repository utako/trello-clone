window.Trellino.Views.cardsShow = Backbone.View.extend({
  template: JST["cards/show"],
    
  events: {
    "mouseenter .card": "toggleCard",
    "mouseleave .card": "toggleCard",
    "click button.card-destroy": "destroyCard"
  },

  toggleCard: function() {
    this.$el.children().toggleClass("show hide");
  },
  
  destroyCard: function() {
    this.model.destroy();
  },
  
  render: function() {
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
});