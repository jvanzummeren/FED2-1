// Score app voor iets met frisbees
//
// Laad 3 pagina's


// namespace is SCOREAPP

var SCOREAPP = SCOREAPP || {};


// nog een keertje in een anonymous function

(function(){
  var app = SCOREAPP;

  // hoofdobject van de applicatie
	app.main = {

    // functie waar de applicatie mee gestart wordt
		init: function(){


    // als eerste de router activeren, zodat we kunnen bepalen welke pagina opgevraagd wordt
    SCOREAPP.router.init();


		}






	}

  // het router object maakt gebruik van de routie.js library om te bepalen welke pagina wordt opgevraag
	app.router = {

    // de init functie laadt via routie de juiste pagina functie in het pages object
    init: function(){

      //routie gebruikt het gedeelte achter het hekje(#) in de url om te bepalen wat er opgevraagd wordt
      routie({
        'game': function() {

          // we roepen de loadpage functie van het page object aan om de opgevraagde pagina te laden
          app.page.loadPage('game');

        },


        'schedule': function() {
          app.page.loadPage('schedule');

        },

        'ranking': function() {
          app.page.loadPage('ranking');

        },

        '*': function() {
          app.page.loadPage('game');

        }

      });

    },





	}

  // het page object laadt de data voor een pagina en maakt de pagina zichtbaar
  app.page = {

    // deze functie vult het bij de route behorende stukje template met data uit het data object
    loadPage: function(route){

      // we laden de data met de eval methode, dit mag omdat er niet rechtstreeks gebruikersinput wordt uitgevoerd door eval
      var data = eval('app.data.'+ route);

      // met de transparancy library stoppen we de data in de gebinde elementen in het html template
      Transparency.render(document.querySelector('[data-route=' + route + ']'), data, app.data.directives);

      // nu roepen we de render methode aan van het page object
      this.render(route);

    },

    // de render functie maakt alle pagina's onzichtbaar behalve de opgevraagde
    render: function(route){

      // we selecteren het element dat bij de geroutete pagina hoort
      var section = document.querySelector('[data-route='+ route +']');
      // en alle andere pagina elementen
      var sections = document.querySelectorAll('section');

      // we checken nog even of we echt een sectie hebben nu
      if (section) {
        // we halen de active class weg bij alle pagina secties'
        for (var i=0; i < sections.length; i++){
          sections[i].classList.remove('active');
        }
        // en zetten hem aan voor de gekozen sectie
        section.classList.add('active');
      } else {
        // basic errormelding
        console.log("requested section missing in template")

      }

    }




  }

  // het data object bestaat nu nog vooral uit json objecten, later zal dit veranderen

	app.data= {

	  game : {
      title: "Pool A - Score: Boomsquad vs. Burning Snow",
	    scores: [
        { score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
        { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
        { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
        { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
        { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
        { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
        { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
        { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
        { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
        { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
        { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
        { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
        { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
        { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
        { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
        { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
        { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
        { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
        { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
        { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
        { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
        { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
        { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
      ]
    },

    schedule: {

      title: "Pool A - Schedule",
      games: [
        { date: "Monday, 9:00am", team1: "Chasing", team1Score: 13, team2: "Amsterdam Money Gang", team2Score: 9},
        { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: 15, team2: "Beast Amsterdam", team2Score: 11},
        { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: 14, team2: "Amsterdam Money Gang", team2Score: 12},
        { date: "Monday, 10:00am", team1: "Chasing", team1Score: 5, team2: "Burning Snow", team2Score: 15},
        { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: 11, team2: "Amsterdam Money Gang", team2Score: 15},
        { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: 15, team2: "Beast Amsterdam", team2Score: 6},
        { date: "Monday, 12:00pm", team1: "Chasing", team1Score: 8, team2: "Beast Amsterdam", team2Score: 15},
        { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: 15, team2: "Burning Snow", team2Score: 8},
        { date: "Monday, 1:00pm", team1: "Chasing", team1Score: 15, team2: "Boomsquad", team2Score: 14},
        { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: 15, team2: "Amsterdam Money Gang", team2Score: 11}
      ]
    },

    ranking: {

      title: "Pool A - Ranking",
      teams: [
        { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
        { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
        { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
        { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
        { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
      ]
    },

    // directives zijn een manier om transparancy.js elementen te laten binden aan functies

    directives: {
      teams:{

        // dit directive berekent het puntentotaal van een team in de ranking
        Ptot:{
          text: function(params){
            return this.Pw - this.Pl;

          }

        }

      },

      // deze twee directives checken of een team de winnaar is en passen de class van het element met de teamnaam aan
      games: {
        team1: {
          text: function(params){
            return this.team1;
          },
          class: function(params){
            if (this.team1Score > this.team2Score){
              return params.value + " winner";
            }
          }
        },
        team2: {
          text: function(params){
            return this.team2;
          },
          class: function(params){
            if (this.team1Score < this.team2Score){
              return params.value + " winner";
            }
          }
        }
      }
    }


	}

  // ready.js zorgt ervoor dat de code pas wordt uitgevoerd als alle dom is ingeladen
  domready(function(){
     //we starten de app
     app.main.init();
  });




}());
