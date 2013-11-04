// game model

define(['backbone','date'], function(Backbone, Date){
  console.log('models/game.js');

  //default value when score is not yet known
  var Game = Backbone.Model.extend({
    default:{
      team_1_score: '?',
      team_2_score: '?'
    },

    id:null,

    //correct api path

    urlRoot:'games/',
    url:function(){
      return this.urlRoot + this.id + '/';
    },


    // parse model to add more useful date information
    parse:function(response){
      console.log(response.start_time);

      var date = Date.parse(response.start_time);

      response.day = date.toString('ddd') ;
      response.date = date.toString('d MMM, \'yy') ;
      response.time = date.toString('H:mm') ;


      return response;

    }
  });

  return Game;
});
