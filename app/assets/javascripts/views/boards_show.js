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
    "click button.destroy": "destroy",
    "sortstart .lists": "handleListsSortableStart",
    "sortstop .lists": "handleListsSortableStop",
    "sortstart .cards": "handleCardsSortableStart",
    "sortstop .cards": "handleCardsSortableStop",
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
    $('.lists').sortable({
      placeholder: 'list-ui-placeholder',
      });
    $('.lists').disableSelection();
    return this;
  },
  
  handleListsSortableStart: function(event, ui) {
    var height = ui.helper[0].style.height;
    $('.list-ui-placeholder').css("height", height);
    ui.item.addClass('dragged');
  },
  
  handleListsSortableStop: function(event, ui) {
    if (ui.item.hasClass('list')) {
      var prevRank = ui.item.prev().data('rank');
      var nextRank = ui.item.next().data('rank');
      var newRank;
      var objectID = ui.item.data('id');
      if (prevRank && nextRank) {
        newRank = (prevRank + nextRank)/2;
      } else if (typeof prevRank == "undefined" && typeof nextRank != "undefined") {
        newRank = nextRank - 1;
      } else if (typeof nextRank == "undefined" && typeof prevRank != "undefined") {
        newRank = prevRank + 1;
      } else {
        newRank = 0;
      }
      var modList = this.model.lists().get(objectID);
      modList.set("rank", newRank);
      modList.save();
    }
    ui.item.removeClass('dragged');
  }, 
   
  handleCardsSortableStart: function(event, ui) {
    var height = ui.helper[0].style.height;
    $('.card-ui-placeholder').css("height", height);
    ui.item.addClass('dragged');
  },
  
  handleCardsSortableStop: function(event, ui) {
    if (ui.item.hasClass('card')) {
      var prevRank = ui.item.prev().data('rank');
      var nextRank = ui.item.next().data('rank');
      var oldListID = ui.item.data('list-id');
      var newListID = ui.item.parent().parent().data('id');
      var newRank;
      var objectID = ui.item.data('id');
      if (prevRank && nextRank) {
        newRank = (prevRank + nextRank)/2;
      } else if (typeof prevRank == "undefined" && typeof nextRank != "undefined") {
        newRank = nextRank - 1;
      } else if (typeof nextRank == "undefined" && typeof prevRank != "undefined") {
        newRank = prevRank + 1;
      } else {
        newRank = 0;
      }
      var list = this.model.lists().get(oldListID);
      var modCard = list.cards().get(objectID);
      modCard.set("rank", newRank);
      modCard.set("list_id", newListID);
      modCard.save();
    }
    ui.item.addClass('dragged');
    $('.cards').sortable({
      connectWith: '.cards',
      placeholder: 'card-ui-placeholder',
    });
  },
  
  destroy: function() {
    
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("/#", {trigger: true});
      }
    });
  }

});