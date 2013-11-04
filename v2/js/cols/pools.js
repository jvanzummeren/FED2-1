// pools collection
define(['models/pool','backbone'], function(Pool, Backbone){


  console.log('cols/pools.js')

  var Pools = Backbone.Collection.extend({

    // only get these fields
    fields:'[id,name,standings]',
    url: function (){ return 'pools/?fields='+ this.fields;},

    // only use the actual data objects
    parse: function(response) {
      return response.objects;
    },

    // use model order by name
    model: Pool,
    comparator:'name'


  });


return Pools;

});
