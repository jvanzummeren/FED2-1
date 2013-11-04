define(['backbone'],function(Backbone){

  // The backbone router checks the url hash and determines which view to render based on that
  // adding routes that are accessable through url hash

  var Router = Backbone.Router.extend({
    routes: {
      '': 'pools',
      'pools': 'pools',
      'pool/:id':'pool',
      'teams': 'teams',
      'team/:id': 'team',
      'games': 'games',
      'game/:id': 'game',
      'schedule': 'schedule'
    },
    
    // route functions require.js loads the necessary view  then we call the render function
    pools: function(){

      require(['views/pools'],function(views){
        var poolList = new views.PoolList();
        poolList.render();
      });
      
    },

    pool: function(id){

      require(['views/pools'],function(views){
        var poolShow = new views.PoolShow();
        poolShow.render(id);
      });

    },

    teams: function(id){


      require(['views/teams'],function(views){
      var teamList = new views.TeamList();
        teamList.render();
      });


    },

    team: function(id){
      require(['views/teams'],function(views){
        var teamShow = new views.TeamShow();
        teamShow.render(id);
      });
    },

    games: function(id){

      require(['views/games'],function(views){
        var gameList = new views.GameList();
        gameList.render();
      });
    },

    game: function(id){

      require(['views/games'],function(views){
        var gameShow = new views.GameShow();
        gameShow.render(id);
      });
    }

  });

  // Router object is returned when file is required
  return Router;

});
