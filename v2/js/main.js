
// own namespace for frisbee app
var FRSB = FRSB || {};

define(['jquery', 'underscore', 'backbone', 'date'], function($, _, Backbone, Date){





    // jquery ajax config so we can easily us the api and are authorized to post


    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
      };



    // always prefix this to request urls

    $.ajaxPrefilter( function( options, originalOptions, jqXHR ){
      options.url = "https://api.leaguevine.com/v1/" + options.url;

    });


    // authentication (thanks Joost)


    $.ajaxSetup({
      headers: {
        'Content-Type' : "application/json; charset=utf-8",
        'Accept' : "application/json",
        'Authorization' : "bearer a32a1bd7cd"
      }

    });


    // hackish transitions that arent realy properly waiting for render to finish

    $(document).ajaxSend(function(event, jqXHR, settings) {
        $('#loading ').fadeIn('35');
        $('.page').css({'transform':'translate3d(100%,0,0)'});
    });

    $(document).ajaxComplete(function(event, jqXHR, settings) {
        $('#loading ').fadeOut('500',function(){
          $('.page').css({'transform':'translate3d(0,0,0)'});
        });

    });





    // now that that's out of the way, we load the router with require.js (path: ./config/router.js)

    require(['config/router'], function(Router){

        // with the router instanciated we can start routing by starting the history (backbone convention)

        FRSB.router = new Router();

        Backbone.history.start();

    });












});
