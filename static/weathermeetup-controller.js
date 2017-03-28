class WeatherController{
  constructor(){
  }
  getCity(){
    var city=document.getElementById('city').value;
    return city;
  }
  getState(){
    var state=document.getElementById('state').value;
    return state;
  }
  getWeather() {
    var city=this.getCity();
    var state=this.getState()
    $.ajax({
      // url:"http://api.fixer.io/latest",
      // url:"http://localhost:5000/proxy/mypuppy?i=onions,garlic&q=omelet&p=3",
      url:`http://localhost:8088/proxy/weather/${state}/${city}`,
      method:"GET"
    }).done(function(data){
      wc.getMeetups();
      data=JSON.parse(data);
      console.log(data["current_observation"]);
      var result=data["current_observation"];
      var ul=document.getElementById('weather_result');
      for (let i of ['dewpoint_c','dewpoint_f','feelslike_c','feelslike_f']){
        var text=result[i];
        var li=document.createElement("li");
        li.innerHTML=text;
        ul.appendChild(li);
      }
      var div=document.getElementsByClassName('weather')[0];
      var iframe=document.createElement("iframe");
      iframe.src=result["forecast_url"];
      iframe.height="20%";
      iframe.width="80%";
      div.appendChild(iframe);
    });
  }

  getMeetups() {
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var date = document.getElementById('date').value;


    city = city.split(' ').join('_')
    $.ajax({
      url: "http://maps.googleapis.com/maps/api/geocode/json?address="+city+"+"+state+"&sensor=true",
      method: "GET"
    }).done(function(data) {
      var lon, lat;
      lat = data.results[0].geometry.location.lat;
      lon = data.results[0].geometry.location.lng;

      $.ajax({
        // url: "http://localhost:8088/proxy/meetupmain?zip=94066&radius=1&category=25&order=members",
        //https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=-122.28178&lat=37.9298239
        //url: "http://localhost:8088/proxy/meetupmain?zip="+location+"&radius=1&order=members",
        url: "http://localhost:8088/proxy/meetupmain?lon="+lon+"&lat="+lat+"&radius=1",
        method: "GET"
      }).done(function(data) {
        console.log(data);
      });
    });
  }
}
var wc = new WeatherController();
