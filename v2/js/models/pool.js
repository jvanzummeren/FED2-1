// pool model
define(['backbone'], function(Backbone){

 var Pool = Backbone.Model.extend({

    id:null,

    // correct api path
    urlRoot:'pools/',

    url:function(){
      return this.urlRoot + this.id + '/';
    }


  });

  return Pool;

});
