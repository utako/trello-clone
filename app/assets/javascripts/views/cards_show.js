window.Trellino.Views.cardsShow = Backbone.View.extend({
  template: JST["cards/show"],
  
  render: function() {
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
});