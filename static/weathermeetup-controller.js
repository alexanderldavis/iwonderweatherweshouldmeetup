class WeatherController{
  constructor(){
    this.db=new TodoItemDB();
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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getWeather() {
    var city=this.getCity();
    var state=this.getState();
    self=this;
    $.ajax({
      url:`http://localhost:8088/proxy/weather/${state}/${city}`,
      method:"GET"
    }).done(function(data){
      city = city.toUpperCase();
      self.getMeetups();
      self.clearOldWeather();
      data=JSON.parse(data);
      console.log(data["current_observation"]);
      var result=data["current_observation"];
      var div=document.getElementById('weather');
      self.addP('weather','<p style="margin-top: 1%; text-align: center; color: rgb(189, 197, 213);">Here is what the weather is like in '+city+', '+state+'!</p>')
      var ul=document.createElement("ul");
      ul.setAttribute('class','list-inline');
      ul.style.backgroundColor = "white"
      ul.style.textAlign = "center"
      ul.style.marginLeft = "25%"
      ul.style.marginRight = "25%"
      ul.style.width = "50%"
      let li1=document.createElement("li");
      let url=result['icon_url'];
      // li1.style.listStyleImage=`url(${url})`;
      li1.innerHTML="<img style='width: 50px;' src='"+url+"'</img>";
      ul.appendChild(li1);
      for (let i of [{'name':'&deg;C','res_name':'feelslike_c'},{'name':'&deg;F','res_name':'feelslike_f'},{'name':'in precip','res_name':'precip_today_in'},{'name':' mph wind','res_name':'wind_mph'},{'name':' humidity','res_name':'relative_humidity'}]){
        var text=result[i['res_name']];
        var li=document.createElement("li");
        li.innerHTML=text+i['name'];
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
    // console.log(json1);
    var position = {lat: json1.results[0].lat,
                    lng: json1.results[0].lon};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: position
    	});

    var markers = [];
    var markernos = [];
    var infowindows = [];
    var labelsA = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var counter = 0;
    for (var i=0; i<json1.results.length; i++) {
      var position = {lat: json1.results[i].lat,
                      lng: json1.results[i].lon};
      let d = i;

      markers[i] = new google.maps.Marker({
          position: position,
          map: map
    	});
      counter = counter+1;
      var object=json1.results[i];
      var contentString = '<h3>'+json1.results[i].name+'</h3>' +
                          json1.results[i].description+
                          '<button type="button" name="button" id="addTodo">Add to todo list</button>';

      infowindows[i] = new google.maps.InfoWindow({
        content: contentString
      });

      self = this;
      markernos[i] = i;

      markers[i].addListener('click', function() {
            self.close_popups(infowindows);
            infowindows[d].open(map, markers[d])
          	//self.getInfo(json1.results[d]);
            document.getElementById("addTodo").onclick=function(){wc.addTodoList(json1.results[d],document.getElementById('state').value);};
            //document.getElementById("addTodo").onclick=function(){self.getInfo(json1.results[d]);};
          });
    	}

    // console.log(markers);
	}
  close_popups(infowindows){
    for(var i = 0; i<infowindows.length; i++){
      infowindows[i].close();
    }
  }
  addP(id,text){
    var div=document.getElementById(id);
    var oldp=div.childNodes[0];
    if (oldp) oldp.remove();
    div.innerHTML=text;
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
        if (category < 1) {
          $.ajax({
            // url: "http://localhost:8088/proxy/meetupmain?zip=94066&radius=1&category=25&order=members",
            //https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=-122.28178&lat=37.9298239
            //url: "http://localhost:8088/proxy/meetupmain?zip="+location+"&radius=1&order=members",
            //url: "http://localhost:8088/proxy/meetupmain?lon="+lon+"&lat="+lat+"&radius=1&oder=members",
            url: "http://localhost:8088/proxy/meetupmain?photo-host=public&lat="+lat+"&lon="+lon,

            method: "GET"
          }).done(function(data) {
            //add directions for users:
            self.addP('directions',"<p style='text-align: center; color: rgb(189, 197, 213);'><strong>Do you know that you can add the activity to the ToDo list below? </strong> <br>Click 'Add to ToDo' in the marker bubble on the map!</p>")
            //this is the json of all the data from the meetup function callback
            //map stuff should go here
            console.log(data);
            self.addMarker(data);
            // self.listActivity(data); //Deprecated v2
          });
        } else {
          $.ajax({
            // url: "http://localhost:8088/proxy/meetupmain?zip=94066&radius=1&category=25&order=members",
            //https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=-122.28178&lat=37.9298239
            //url: "http://localhost:8088/proxy/meetupmain?zip="+location+"&radius=1&order=members",
            //url: "http://localhost:8088/proxy/meetupmain?lon="+lon+"&lat="+lat+"&radius=1&oder=members",
            url: "http://localhost:8088/proxy/meetupmain?photo-host=public&lat="+lat+"&lon="+lon+"&category_id="+category+"&page=20",

            method: "GET"
          }).done(function(data) {
            //add directions for users:
            self.addP('directions',"<p style='text-align: center; color: rgb(189, 197, 213);'><strong>Do you know that you can add the activity to the ToDo list below? </strong><br>Click 'Add to ToDo' in the marker bubble on the map!</p>")
            //this is the json of all the data from the meetup function callback
            //map stuff should go here
            self.addMarker(data);
            // self.listActivity(data); //Deprecated V2
          });
      }
      });
    }

//     listActivity(data){
//       // remove old list of activity
//       let div=document.getElementById('listActivity');
//       let oldul=div.childNodes[0];
//       if (oldul) oldul.remove();
//       //add new list of activity
//       data=JSON.parse(data);
//       data=data['results'];
//
//       // let div=document.createElement('div')
//
//       let ul=document.createElement('ul');
//       ul.setAttribute("id","allitemsul");
//       let counter = 0;
//       for (let act of data){
//         counter = counter + 1;
//         console.log(act);
//         let li=document.createElement('li');
//         li.setAttribute("id","allitemsli");
//         li.innerHTML=act['name'];
// //////////////////////////////////////////////////////////////////////////// <-
//
//         // li.color="rgb(189, 197, 213)";
//         ul.appendChild(li);
//       }
//       div.appendChild(ul);
//     }

    deleteItem(item){
      this.db.deleteItem(item);
      this.redrawTable();
    }

    addTodoList(data,state){
      var description=data['description'].split('.')[0]
      var item=new TodoItem(data['name'],data['city'],state,data['category']['name'],description,data['link'],this.db.getTodoListDB().length);
      //add item into the database
      this.db.addTodoList(item);
      //redraw the table everytime an item is added
      this.redrawTable();
    }

    redrawTable(){
      //redraw the table when any changes are made
      var table=document.getElementById("todoList");
      let rows = table.getElementsByTagName('tr')

      //delete rows on the table to redraw again
      for (let i = 0; rows.length > 1; i++) {
          rows[1].remove();
      }
      //add item on the database to the list
      for (let act of this.db.getTodoListDB()){
        table.appendChild(act.toTableRow());
      }
    }
    doReload(){
     this.db.reloadMe();
     this.redrawTable();
   }
}
var wc = new WeatherController();
window.onload = function() {
    wc.doReload();
}
