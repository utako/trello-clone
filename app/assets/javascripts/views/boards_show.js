window.Trellino.Views.boardsShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function (){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "add", this.addList);
    // this.listenTo(this.model.lists(), "sync", this.addAllLists);
    // this.listenTo(this.model.members(), "sync", this.addAllMembers);
    this.model.lists().each(this.addList.bind(this));
    // this.model.members().each(this.addMember.bind(this));
    debugger

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
    // this.addSubview(".board-members", assignmentShowView);
    // var assignmentShowView = new Trellino.Views.assignmentsShow({
    //   model: this.model
    // });
    this.renderSubview();
  },
  
  addList: function(list) {
    var listsShowView = new Trellino.Views.listsShow({
      model: list
    });
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },
  
  addAllLists: function() {
    this.model.lists().each(addList);
  },
  
  addMember: function(member) {
    var membersShowView = new Trellino.Views.assignmentsShow({
      model: member
    });
    this.addSubview(".board-members", assignmentShowView);
    membersShowView.render();
  },
  
  addAllMembers: function() {
    this.model.members().each(addMember);
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

});