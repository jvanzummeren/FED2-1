// game_scores collection
define(['models/game_score','backbone'], function(Game_score, Backbone){

  console.log('cols/game_scores.js')

  var Game_scores = Backbone.Collection.extend({

    // only get these fields
    fields: '[id,team_1,team_1_score,team_2,team_2_score,time]',

    url: function (){ return 'game_scores/?fields='+ this.fields;},

    // only use the actual data objects
    parse: function(response) {
      return response.objects;
    },
    // use model
    model: Game_score

  });

  return Game_scores;

});
