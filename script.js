zomatoURL = "https://developers.zomato.com/documentation#/";
eventsUrl =   "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=XTM9Wf57rB9TMAKZ1afNeO4eWiFXPPEt";

var userLocation = "Miami";
var lat= 25.774111;
var lon= -80.193565;


var queryUrl3 = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "category=Nightlife";
      $.ajax({
          url: queryUrl3,
          method: "GET",
          headers: {
            "user-key": "d2817c523bb9d90495ae19c12392cc03",
            "Accept": "application/json"
          }
        }).then(function (response) {
          console.log(response);
          $('.ent').html(response.restaurants[0].restaurant.name) //name of restaurant
          $('.ent').html(response.restaurants[0].restaurant.cuisines) //cuisines
        });




// var eventsUrl = //events api
//   "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" +
//   userLocation +
//   "&countryCode=US&size=48&sort=date,asc&apikey=XTM9Wf57rB9TMAKZ1afNeO4eWiFXPPEt";
// $.ajax({
//   url: eventsUrl,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
//   $('.ent').html("Event Name :" + response._embedded.events[0].name)
//   $('.ent').html("Timing Details" + response._embedded.events[0].dates.start.localDate)
//   $('.ent').html("<a target=\"_blank\" href="+ response._embedded.events[0].url+ '>'+ "Click Here" + "</a>")





  // for (var i = 0 ;i < response._embedded.events.length; i++){
  //   $('.entertainment').html("Event Name :" + response._embedded[i].events)
//}
//console.log(response._embedded[0].events.)
// });

//adding it to html, and looping through to give a random event when the user  prompt
