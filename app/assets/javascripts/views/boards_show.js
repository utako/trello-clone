window.Trellino.Views.boardsShow = Backbone.View.extend({
  template: JST["boards/show"],
  
  initialize: function (){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    
    var listNewView = new Trellino.Views.listsNew({
      board: this.model
    });
    this.addSubview(".list-new", listNewView);
  },
  
  addList: function(list) {
    var listsShowView = new Trellino.Views.listsShow({
      model: list
    });
    
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },
  
  render: function() {
    var renderedContent = this.template({
      board: this.model,
      lists: this.model.lists().sort()
    });
    this.$el.html(renderedContent);
    
    return this;
  },

});