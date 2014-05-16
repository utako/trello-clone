window.Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  
  url: function() {
    return this.board.url() + "/lists";
  }, 
  
  getOrFetch: function(id) {
    var model;
    var boards = this;
    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new Trellino.Models.List({ id: id });
      model.fetch({
        success: function () { boards.add(model) }
      });
      return model;
    }
  },
});

window.Trellino.Collections.lists = new Trellino.Collections.Lists();