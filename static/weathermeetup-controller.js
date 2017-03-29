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
      var div=document.getElementById('weather');
      self.addP('weather','Here is what the weather like')
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

  initMap() {
  	var uluru = {lat: 40.964946, lng: -103.08142};
    var map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 4,
    	center: uluru
    });

  }

  addMarker(json) {
    var json1 = JSON.parse(json);
    console.log(json1);
    var position = {lat: json1[0].group.lat,
                    lng: json1[0].group.lon};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: position
    	});

    var markers = [];
    var markernos = [];
    var infowindows = [];
    for (var i=0; i<json1.length; i++) {
      var position = {lat: json1[i].group.lat,
                      lng: json1[i].group.lon};
      markers[i] = new google.maps.Marker({
          position: position,
          map: map
    	});
      infowindows[i] = new google.maps.InfoWindow({
        content: json1[i].group.name
      });

    self = this;
    markernos[i] = i;
    let d = i;
    markers[i].addListener('click', function() {
          infowindows[d].open(map, markers[d])
        	self.getInfo(json1[d]);
    		});
    	}
    console.log(markers);
	}

	getInfo(markerno) {
		console.log(markerno);
	}
  addP(id,text){
    var div=document.getElementById(id);
    var oldp=div.childNodes[0];
    if (oldp) oldp.remove();
    var p=document.createElement('p');
    p.innerHTML=text;
    div.appendChild(p);
  }
  getMeetups() {
	var city = this.getCity();
    var state = this.getState();
    var category=this.getCategory();
    city = city.split(' ').join('_');
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
          //url: "http://localhost:8088/proxy/meetupmain?lon="+lon+"&lat="+lat+"&radius=1&oder=members",
          url: "http://localhost:8088/proxy/meetupmain?lon="+lon+"&lat="+lat+"&radius=10&order=members",
          method: "GET"
        }).done(function(data) {
          //add directions for users:
          self.addP('directions',"<strong>Do you know that you can add the activity to the todo list of this page? </strong> Click on the marker on the map and you'll see the magic")
          //this is the json of all the data from the meetup function callback
          //map stuff should go here
          self.addMarker(data);
        });
      });
    }
}
var wc = new WeatherController();
