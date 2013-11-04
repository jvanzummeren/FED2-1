define(['backbone'], function(Backbone){

  // for debuging purposes
  console.log('views/teams.js')

  // create new view (multiple teams )
  var TeamList = Backbone.View.extend({

    // element used to fill in
    el: '.page',

    // render function loads the data and puts it in the template
    render: function(){

      // saving this to a var so we can reach it from within the require callback
      var t = this;

      // loading collection and template file
      require(['cols/teams','text!views/templates/teams.html'], function(Teams,templateFile){

        // new collection instance
        var teams = new Teams();

        //fetch the data from the api
        teams.fetch({

           // only pools from this tournament
          data:{'tournament_id': [19389]},

          // run this when the data is loaded and put data into template
          success: function(teams){
            var template = _.template(templateFile, {teams: teams.models});
            t.$el.html(template);
          },
          error: function(error){


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

      "click td.team": 'navigateTeam'

    },

    // navigation functions
    navigateTeam: function(ev){

        // get id from clicked element and route

        var id = $(ev.currentTarget).attr('id');

        FRSB.router.navigate('/team/'+id, {trigger:true});
        $(this.el).undelegate('button.team', 'click');
        return false

    }

  });


  //new view similar to above view except for promises

  var TeamShow = Backbone.View.extend({

    el: '.page',
    render: function(id){



      var t = this;

      require(['models/team','cols/games','text!views/templates/team.html'], function(Team, Games, templateFile){




        var team = new Team();
        team.id = id;

        // create promises (see pools view)

        var promise1 = team.fetch({

          success: function(team){

            return team;
          },
          error: function(error){


          },
          complete: function(){
            console.log('loaded');
          }


        });


        var games = new Games();

        var promise2 = games.fetch({
           data:{'team_ids': '['+id+']'},
           success: function(games){

              return games;

          },
          error: function(error){


          }


        });

        //when promises are fullfiled render template

        $.when(promise1,promise2).then(function(){
          var template = _.template(templateFile, {team:team, games:games.models});

            t.$el.html(template);

        })


      });

      console.log('loading');

    },

    // interface events

    events:{

      "click button.back": 'navigateBack',
      "click button.game": 'navigateGame'



    },

    //navigation functions

    navigateBack: function(ev){



        var id = $(ev.currentTarget).attr('id');

        FRSB.router.navigate('/teams', {trigger:true});
        $(this.el).undelegate('button.back', 'click');
        return false

    },

     navigateGame: function(ev){



        var id = $(ev.currentTarget).attr('id');

        FRSB.router.navigate('/game/'+id, {trigger:true});
        $(this.el).undelegate('button.game', 'click');
        return false

    }

  });

  // return views if file is required

  return {TeamList:TeamList, TeamShow:TeamShow}

});
