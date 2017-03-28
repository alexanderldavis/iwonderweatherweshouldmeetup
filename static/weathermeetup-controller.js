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

    });
  }

  getMeetups() {
    $.ajax({
      url: "http://localhost:8088/proxy/meetupmain?zip=94066&radius=1&category=25&order=members",
      method: "GET"
    }).done(function(data) {
      //console.log(data);
    });
  }
}
var wc = new WeatherController();
