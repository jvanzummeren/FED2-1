//teams collection

define(['models/team','backbone'], function(Team, Backbone){


  console.log('cols/teams.js')

  var Teams = Backbone.Collection.extend({


    //use model

    model: Team,

    url:'tournament_teams/',


    // only use the actual data objects
    parse: function(response) {
      return response.objects;
    }

    //,comparator:'name'


  });


return Teams;

});
