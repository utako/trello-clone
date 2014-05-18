window.Trellino.Collections.Members = Backbone.Collection.extend({

  model: Trellino.Models.Member,

  initialize: function(model, options) {
    this.board = options.board
  },
  
  // getOrFetch: function(id) {
  //   var model;
  //   var boards = this;
  //   if (model = this.get(id)) {
  //     model.fetch();
  //     return model;
  //   } else {
  //     model = new Trellino.Models.List({ id: id });
  //     model.fetch({
  //       success: function () { boards.add(model) }
  //     });
  //     return model;
  //   }
  // },

});

