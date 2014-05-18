window.Trellino.Collections.Members = Backbone.Collection.extend({

  model: Trellino.Models.Member,

  initialize: function(model, options) {
    this.board = options.board
  },

});

