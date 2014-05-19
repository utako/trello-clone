window.Trellino.Views.boardsShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function (){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "destroy", this.removeList);
    this.listenTo(this.model.members(), "add", this.addMember);
    this.model.lists().each(this.addList.bind(this));
    this.model.members().each(this.addMember.bind(this));

    var listNewView = new Trellino.Views.listsNew({
      model: this.model
    });
    this.addSubview(".list-new", listNewView);
    var assignmentNewView = new Trellino.Views.assignmentsNew({
      model: this.model
    });
    this.addSubview(".board-assignment", assignmentNewView);
    var assignmentShowView = new Trellino.Views.assignmentsShow({
      model: this.model
    });
    this.renderSubview();
  },
  
  events: {
    "click button.destroy": "destroy"
  }, 
  
  addList: function(list) {
    var listsShowView = new Trellino.Views.listsShow({
      model: list
    });
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },
  
  removeList: function(list) {
    var listsShowView = _(this.subviews()[".lists"]).find(function (subview) {
      return subview.model == list;
    });
    this.removeSubview(".lists", listsShowView);
  },
  
  addMember: function(member) {
    var membersShowView = new Trellino.Views.assignmentsShow({
      model: member
    });
    this.addSubview(".board-members", membersShowView);
    membersShowView.render();
  },
  
  render: function() {
    var renderedContent = this.template({
      board: this.model,
      lists: this.model.lists()
    });
    this.$el.html(renderedContent);
    this.renderSubview();
    return this;
  },
  
  destroy: function() {
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("/#", {trigger: true});
      }
    });
  }

});