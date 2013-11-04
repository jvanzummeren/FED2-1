define(['backbone'], function(Backbone){

  // for debuging purposes
  console.log('views/pools.js')

  // create new view (multiple pools)

  var PoolList = Backbone.View.extend({

    // element used to fill in
    el: '.page',

    // render function loads the data and puts it in the template
    render: function(){

      // saving this to a var so we can reach it from within the require callback
      var t = this;

      // loading collection and template file

      require(['cols/pools','text!views/templates/pools.html'], function(Pools,templateFile){

        // new collection instance
        var pools = new Pools();

        //fetch the data from the api
        pools.fetch({

          // only pools from this tournament
          data:{'tournament_id': 19389},

          // run this when the data is loaded
          success: function(pools){

            // fill underscore template with loaded data
            var template = _.template(templateFile, {pools: pools.models});

            // insert template html into container
            t.$el.html(template);
          },

          complete: function(){
            console.log('loaded');
          }


        });

        console.log('loading');

      });


    },

    // interface events

    events:{

      "click button.pool": 'navigatePool',
      "click td.team": 'navigateTeam'

    },

    //navigation functions

    navigatePool: function(ev){

        // get the pool id from the event target

        var id = $(ev.currentTarget).attr('id');

        // trigger router navigation to new route
        FRSB.router.navigate('/pool/'+id, {trigger:true});

        // remove event listener
        $(this.el).undelegate('button.pool', 'click')

        // prevent default behaviour
        return false

    },

    navigateTeam: function(ev){



        var id = $(ev.currentTarget).attr('id');

        FRSB.router.navigate('/team/'+id, {trigger:true});
        $(this.el).undelegate('button.team', 'click');
        return false

    }

  });

  // create new view (single pool)

  var PoolShow = Backbone.View.extend({

    // element used to fill in
    el: '.page',

    // render function loads the data and puts it in the template
    render: function(id){

      // saving this to a var so we can reach it from within the require callback
      var t = this;

      // loading collection and template file
      require(['models/pool','cols/games','text!views/templates/pool.html'], function(Pool,Games,templateFile){



        // new model instance
        var pool = new Pool();

        // set the id of the model to the requested id
        pool.id = id;

        // create a promise from the model fetch
        var promise1 =pool.fetch({

          success: function(pool){

            return pool;

          },
          error: function(error){


          }


        });

        // also fetch games for this pool to show a schedule
        var games = new Games();

        // second promise
        var promise2 = games.fetch({

          data:{'pool_id': id},

          success: function(games){

            return games;

          },
          error: function(error){


          }


        });

        // check if both promises have fullfiled then render the template
        $.when(promise1,promise2).then(function(){
          var template = _.template(templateFile, {pool: pool, games:games.models});

            t.$el.html(template);

        })



      });


    },

    //interfac events

    events:{

      "click button.back": 'navigateBack',
      "click button.game": 'navigateGame',
      "click td.team": 'navigateTeam'



    },

    navigateBack: function(ev){



        var id = $(ev.currentTarget).attr('id');

        FRSB.router.navigate('/pools', {trigger:true});
        $(this.el).undelegate('button.back', 'click');
        return false

    },

    navigateGame: function(ev){



        var id = $(ev.currentTarget).attr('id');

        FRSB.router.navigate('/game/'+id, {trigger:true});
        $(this.el).undelegate('button.game', 'click');
        return false

    },

    navigateTeam: function(ev){



        var id = $(ev.currentTarget).attr('id');

        FRSB.router.navigate('/team/'+id, {trigger:true});
        $(this.el).undelegate('button.team', 'click');
        return false

    }


  });

// return views when file is required

return {PoolList:PoolList, PoolShow:PoolShow};

});
