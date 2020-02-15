$(document).ready(function () {
    //apikey = d2817c523bb9d90495ae19c12392cc03";
    var userLocation = "Miami";
    var lat;
    var lon;
    var randNum = Math.floor(Math.random() * 10);
    var name;
    var address;
    var cuisines;
    var priceRange;

    //ajax call for latitude and longitude of a city
    $(".print").click(function(event) {
      event.preventDefault();
     // var queryUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + $(userLocation).val();
      var queryUrl = "https://developers.zomato.com/api/v2.1/locations?query=miami";
      $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {
          "user-key": "d2817c523bb9d90495ae19c12392cc03",
          "Accept": "application/json"
        }
      }).then(function (response) {
        console.log("findLatLon");
        console.log(response);
        let lat = response.location_suggestions[0].latitude;
        let lon = response.location_suggestions[0].longitude;
        console.log("lat: " + lat + "; lon: " + lon);
        findRestaurantDetails(lat, lon);
        findNightlife(lat, lon);
      });
    });

    //ajax call for restaurant details
    function findRestaurantDetails(lat, lon) {
      var queryUrl2 = "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + lon;
      $.ajax({
        url: queryUrl2,
        method: "GET",
        headers: {
          "user-key": "d2817c523bb9d90495ae19c12392cc03",
          "Accept": "application/json"
        }
      }).then(function (response) {
        console.log("findRestaurantDetails:");
        console.log(response);

        name = response.nearby_restaurants[randNum].restaurant.name;
        address = response.nearby_restaurants[randNum].restaurant.location.address;
        cuisines = response.nearby_restaurants[randNum].restaurant.cuisines;
        priceRange = response.nearby_restaurants[randNum].restaurant.price_range;
        $(".print").html(name + "<br>Cuisine: " + cuisines + "<br>Address: " + address + "<br>Price Range: " + priceRange);
      });
    };

    //ajax call for nightlife 
    function findNightlife() {
      var queryUrl3 = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "category=Nightlife";
      $.ajax({
        url: queryUrl3,
        method: "GET",
        headers: {
          "user-key": "d2817c523bb9d90495ae19c12392cc03",
          "Accept": "application/json"
        }
      }).then(function (response) {
        console.log("nightlife:");
        console.log(response);
      });
    };

    
    
  });