//team model

define(['backbone'], function(Backbone){

 var Team = Backbone.Model.extend({


    id:null,

    // correct api path;
    urlRoot:'teams/',

    url:function(){
      return this.urlRoot + this.id + '/';
    }


  });

  return Team;

});
