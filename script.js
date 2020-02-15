$(document).ready(function () {
    //apikey = d2817c523bb9d90495ae19c12392cc03";
    var userLocation = document.querySelector(".cityInput");
    var name;
    var address;
    var cuisines;
    var priceRange;
    var savedCities = {};
    

    //ajax call for latitude and longitude of a city
    $(".submitBtn").click(function(event) {
      event.preventDefault();

      var queryUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + $(".cityInput").val();
      $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {
          "user-key": "d2817c523bb9d90495ae19c12392cc03",
          "Accept": "application/json"
        }
      }).then(function (response) {
        var lat = response.location_suggestions[0].latitude;
        var lon = response.location_suggestions[0].longitude;

        var cityText = $(".cityInput").val();
        $(".cityInput").val("");

        var listBtn = $("<button>"+ cityText +"</button>");
        //listBtn.text() = cityText;
        $(".list").prepend(listBtn);

        findRestaurantDetails(lat, lon, cityText);
       //findNightlife(lat, lon);
      });
    });

    //ajax call for restaurant details
    function findRestaurantDetails(lat, lon, cityText) {
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
        var randNum = Math.floor(Math.random() * response.nearby_restaurants.length);
        name = response.nearby_restaurants[randNum].restaurant.name;
        address = response.nearby_restaurants[randNum].restaurant.location.address;
        cuisines = response.nearby_restaurants[randNum].restaurant.cuisines;
        priceRange = response.nearby_restaurants[randNum].restaurant.price_range;
        $(".print").html(name + "<br>Cuisine: " + cuisines + "<br>Address: " + address + "<br>Price Range: " + priceRange);

        addCityToLocalStorage(cityText, { name, address, cuisines, priceRange });
      });
    };

    //ajax call for nightlife 
    function findNightlife(lat, lon) {
      var queryUrl3 = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "category=Nightlife";
      $.ajax({
        url: queryUrl3,
        method: "GET",
        headers: {
          "user-key": "d2817c523bb9d90495ae19c12392cc03",
          "Accept": "application/json"
        }
      }).then(function (response) {
        
      });
    };
    
    function addCityToLocalStorage(city, restaurantDetails){
      var cities = JSON.parse(localStorage.getItem("cities")) || {};

      console.log({ cities });

      cities[city] = { restaurantDetails }

      localStorage.setItem("cities", JSON.stringify(cities));
    };

    function renderPrevSearch(){  
    }


  });