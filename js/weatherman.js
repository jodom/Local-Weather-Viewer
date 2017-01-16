
//tempreature conversions
function getCelcius(ktemp){
  var ctemp = ktemp - 273.15;
  return ctemp
}
function getFarenheit(ktemp){
  var ftemp = ktemp - 459.67;
  return ftemp.toString().substr(0,6);
}
//get the data from OpenWeatherMap API
function getData(latitude, longitude){
  var weather_api = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&APPID=cef2fd0fe26ca6833897375d5bf797cc';

  $.getJSON(weather_api, function(data){
    //tests
    // alert("just a test");
    // $("#screen-div").html(JSON.stringify(data));

    //data vars
    var place = data.name + " - " + data.sys["country"];
    var weather_main = data.weather[0]["main"];
    var weather_desc = data.weather[0]["description"];
    var weather_temp = data.main["temp"]; //temp in kelvins
    var weather_wind = data.wind["speed"]; //in knots

    //displays
    $("#place").html("<i class='fa fa-map-marker' aria-hidden='true'></i> " + place);
    $("#weather").html(weather_desc);
    $("#icon").html("<i class='fa fa-sun-o' aria-hidden='true'></i></br>" + weather_main);
    $("#tempreature").html(getCelcius(weather_temp));

    //toggle tempreature
    $("#tswitch").on('click',function(){
      if ( $("#tswitch").html() === 'Farenheit'){
        $("#tempreature").html(getFarenheit(weather_temp) + " F");
        $("#tswitch").html("Celcious");
      }else{
        $("#tempreature").html(getCelcius(weather_temp) + " C");
        $("#tswitch").html("Farenheit");
      }
    });

    // //toggle tempreature
    // $("#tswitch").on('click',function(){
    //   if ( this.html().toLowerCase() === 'Farenheit'){
    //     $("#tempreature").html(getFarenheit(weather_temp));
    //     this.html("Celcious");
    //   }else{
    //     $("#tempreature").html(getCelcius(weather_temp));
    //     this.html("Farenheit");
    //   }
    // });

  });
}

//get the users location
function getLocation(){
  var latitude, longitude;
  var location_api = "http://ip-api.com/json";
  $.getJSON(location_api, function(json){
    // alert("test log");
    // alert(latitude , longitude);
    latitude = json.lat;
    longitude = json.lon;
    getData( latitude, longitude );
  });
  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(function(position){
  //     // console.log(position.coords.latitude);
  //     // console.log(position.coords.longitude);
  //     getData( position.coords.latitude, position.coords.longitude );
  //   });
  // }else{
  //   $(".display").css("display","none");
  //   $("#core-div").css("background-color","cyan");
  //   $("#core-div").html("<h1> Please allow location to get weather update</h1>")
  // }
}

$(document).ready(function(){
  getLocation();
});
