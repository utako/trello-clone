window.Trellino.Views.listsShow = Backbone.View.extend({
  template: JST["lists/show"],
  
  render: function() {
    debugger
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
});