window.Trellino.Views.cardsShow = Backbone.View.extend({
  template: JST["cards/show"],
  
  attributes: function() {
    var rank = this.model.get('rank');
    var id = this.model.get('id');
    var listID = this.model.collection.list.id;
    return { 
      "data-rank": rank,
      "data-id": id,
      "data-list-id": listID
    }
  },
    
  tagName: "li",
  
  className: "card",
  
  events: {
    "mouseenter .cardsub": "toggleCard",
    "mouseleave .cardsub": "toggleCard",
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