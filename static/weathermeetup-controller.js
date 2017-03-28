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

  getCategory(){
    var category=document.getElementById('category').value;
    return category;
  }

  getWeather() {
    var city=this.getCity();
    var state=this.getState();
    self=this;
    $.ajax({
      url:`http://localhost:8088/proxy/weather/${state}/${city}`,
      method:"GET"
    }).done(function(data){
      self.getMeetups();
      self.clearOldWeather();
      data=JSON.parse(data);
      console.log(data["current_observation"]);
      var result=data["current_observation"];
      var div=document.getElementsByClassName('weather')[0];
      var ul=document.createElement("ul");
      let li1=document.createElement("li");
      let url=result['icon_url'];
      li1.style.listStyleImage=`url(${url})`;
      li1.innerHTML="The weather is "+result['weather'];
      ul.appendChild(li1);
      for (let i of [{'name':'Temperature in C: ','res_name':'dewpoint_c'},{'name':'Temperature in F: ','res_name':'dewpoint_f'},{'name':'Feel like in C: ','res_name':'feelslike_c'},{'name':'Feel like in F: ','res_name':'feelslike_f'}]){
        var text=result[i['res_name']];
        var li=document.createElement("li");
        li.innerHTML=i['name']+text;
        ul.appendChild(li);
      }
      div.appendChild(ul);
      // var iframe=document.createElement("iframe");
      // iframe.src=result["forecast_url"];
      // iframe.height="20%";
      // iframe.width="80%";
      // div.appendChild(iframe);
    });
  }
  clearOldWeather(){
    var ul=document.getElementsByTagName('ul')[0];
    if (ul)
    ul.remove();
  }
  getMeetups() {
    var city = this.getCity();
    var state = this.getState();
    var category=this.getCategory();
    city = city.split(' ').join('_');

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
