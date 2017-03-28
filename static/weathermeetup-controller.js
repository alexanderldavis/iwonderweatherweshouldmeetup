class WeatherController{
  constructor(location){
    this.location=location;
  }
  getWeather() {
    $.ajax({
      // url:"http://api.fixer.io/latest",
      // url:"http://localhost:5000/proxy/mypuppy?i=onions,garlic&q=omelet&p=3",
      url:`http://localhost:5000/proxy/weather/?city=chicago `,
      method:"GET"
    }).done(function(data){
      console.log(data);
    });
  }

  static getMeetups() {
    $.ajax({
      url: "http://localhost:8088/proxy/meetupmain?zip=94066&radius=1&category=25&order=members",
      method: "GET"
    }).done(function(data) {
      console.log(data);
    });
  }
}
