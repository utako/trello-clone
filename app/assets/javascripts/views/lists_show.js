window.Trellino.Views.ListsShow = Backbone.View.extend({
  render: function() {
    var renderedContent = this.template()({
      list: this.model
    });
    this.$el.append(renderedContent);
    return this;
  },
});