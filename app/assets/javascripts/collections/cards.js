window.Trellino.Collections.Cards = Backbone.Collection.extend({

  model: Trellino.Models.Card,
  
  url: function() {
    return this.list.url() + "/cards";
  }, 
  
  initialize: function(model, options) {
    this.board = options.board;
    this.list = options.list;
  },
  
  getOrFetch: function(id) {
    var model;
    var lists = this;
    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new Trellino.Models.Card({ id: id });
      model.fetch({
        success: function () { lists.add(model) }
      });
      return model;
    }
  },

  comparator: "rank",
});

