define(['backbone'], function(Backbone){

  // for debuging purposes
  console.log('views/pools.js')

  // create new view (multiple games )
  var GameList = Backbone.View.extend({


    // element used to fill in
    el: '.page',

    // render function loads the data and puts it in the template
    render: function(){

      // saving this to a var so we can reach it from within the require callback
      var t = this;

      // loading collection and template file
      require(['cols/games','text!views/templates/games.html'], function(Games,templateFile){


        // new collection instance
        var games = new Games();

        //fetch the data from the api
        games.fetch({

          // only pools from this tournament
          data:{'tournament_id': 19389},

          // run this when the data is loaded
          success: function(games){

            // fill underscore template with loaded data
            var template = _.template(templateFile, {games: games.models});

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

      "click button.game": 'navigateGame'


    },

    //navigation functions
    navigateGame: function(ev){

        // get the game id from the event target
        var id = $(ev.currentTarget).attr('id');

        // trigger router navigation to new route
        FRSB.router.navigate('/game/'+id, {trigger:true});

        // remove event listener
        $(this.el).undelegate('button.game', 'click');

        // prevent default behaviour
        return false

    }

  });


  // create new view (single pool)
  var GameShow = Backbone.View.extend({

    // element used to fill in
    el: '.page',

    id:null,

    // render function loads the data and puts it in the template
    render: function(id){

      // saving this to a var so we can reach it from within the require callback
      var t = this;

      this.id = id;

      // loading collection and template file
      require(['models/game','cols/game_scores', 'models/game_score','text!views/templates/game.html'], function(Game, Game_scores, Game_score, templateFile){


       // new model instance

        var game = new Game();
        game.id = id;

        //promises (see pool view)

        var promise1 = game.fetch({

          success: function(game){

            return game;
          },
          error: function(error){


          },
          complete: function(){
            console.log('loaded');
          }


        });


        var game_scores = new Game_scores();

        var promise2 = game_scores.fetch({
           data:{'game_id': id},
           success: function(game_scores){

              return game_scores;

          },
          error: function(error){


          }


        });

        $.when(promise1,promise2).then(function(){
          var template = _.template(templateFile, {game:game, game_scores:game_scores.models});

            t.$el.html(template);

        })


      });

      console.log('loading');

    },

    //interface events

    events:{
    "submit .addScore": 'formSubmit'

    },

    // form submit event
    formSubmit: function(ev){

      // point to this for use in callback
      var t = this;

      // prevent actual submit
      ev.preventDefault();

      //convert form data to js object

      var score = $(ev.currentTarget).serializeObject();

      // new score model
      var game_score = new Game_score();

      //save the model with form data and render view when done
      game_score.save(score, {

        complete: function(){

          t.render(t.id);

        }

      });

    }

  });

  // return views when file is required
  return {GameList:GameList, GameShow:GameShow}

});
