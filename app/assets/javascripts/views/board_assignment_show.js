window.Trellino.Views.assignmentsShow = Backbone.View.extend({
  template: JST["board_assignments/show"],
  
  render: function() {
    var renderedContent = this.template({
      assignment: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

});
