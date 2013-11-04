//game_score model

define(['backbone','date'], function(Backbone,Date){

  Game_score = Backbone.Model.extend({


    id:null,

    // correct api path
    urlRoot:'game_scores/',
    url:function(){
      if (this.id !=null){
        return this.urlRoot + this.id + '/';
      }else{
        return this.urlRoot;
      }

    },

    // parse model to add more useful date information
    parse:function(response){

      var time = response.time.replace(/\..*?\+/, "+");
      console.log(response.time);
      console.log(time);

      var date = Date.parse(time);


      response.niceTime = date.toString('HH:mm') ;


      return response;

    }
  });


  return Game_score;

});
