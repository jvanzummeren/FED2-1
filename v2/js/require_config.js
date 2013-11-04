//define the dependancies using weburl first and local as fallback


requirejs.config({

    baseUrl: 'js',

    // hack to make sure no cached files are used during dev
    urlArgs: "v=" +  (new Date()).getTime(),

    paths:{
      'jquery': ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min', 'libs/jquery.min'],
      'underscore': ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min', 'libs/underscore-min'],
      'backbone': ['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min', 'libs/backbone-min'],
      'text': ['//raw.github.com/requirejs/text/latest/text', 'libs/text'],
      'date':['//cdnjs.cloudflare.com/ajax/libs/datejs/1.0/date.min', 'libs/date']

    },
    shim:{
      'backbone':{
        deps:['jquery','underscore'],
        exports:'Backbone'
      },
      'underscore':{
        exports:'_'

      },
      'date':{
        exports:'Date'

      }
    }

});

//require app main to start app

require(['main'], function(main) {
  console.log("Starting app");

});
