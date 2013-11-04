//games collection

define(['models/game','backbone'], function(Game, backbone){

console.log('cols/games.js')



var Games = Backbone.Collection.extend({

    // only get these fields
    fields:'[id,team_1,team_2,start_time, team_1_score, team_2_score]',

    url: function (){ return 'games/?fields='+ this.fields;},


    // only use the actual data objects
    parse: function(response) {

      var response = response.objects;



      return response
    },

    // use model order by start_time
    model:Game,

    comparator:'start_time'




  });

  return Games;

});
