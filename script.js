// api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&APPID=31f4dd752a3e8b29f840df4abf0996cc

function getWeather(city="San Francisco"){
  var city = city.replace(" ", "+");
  city = city.replace("-", "+");
  //var queryURL =  "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=75e4c04d71684c3371de593b3bd53988&units=imperial",
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&mode=json&units=imperial&APPID=75e4c04d71684c3371de593b3bd53988";
  console.log(queryURL);
  var data = $.ajax({
                  url: queryURL,
                  method: "GET",
                  async: false
              });
  return data.responseJSON;
}

var button_arr = ["#Austin", "#Chicago", "#New-York" ,"#San-Francisco", "#Seattle", "#Denver", "#Atlanta"];


function change_bottom(data){

  var the_lists = ["#fc5", "#fc4", "#fc3", "#fc2", "#fc1"];

  for(var i=0;i<data.list.length;i++){
      if ((data.list[i].dt_txt.indexOf("00:00:00")!=-1)
          & (data.list[i].dt_txt.indexOf(data.list[0].dt_txt.substring(0,10))== -1)){
          $(the_lists.pop()).append(
              `<h4>${data.list[i].dt_txt.substring(0,10)}</h4>
              <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png"/>
              <h6> Temp: ${data.list[i].main.temp_max} °F </h6>
              <h6>Humidity: ${data.list[i].main.humidity}% </h6>`
          );
      }
  }
}


function change_top(data){

  $("#top-card-body").append(
      `<p id="city">${data.city.name + " (" 
                      + data.list[0].dt_txt.substring(0,10) 
                      + ")"}</p>
      <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png"/>                        
      <h5 id="temperature">${"Temperature: " 
                      + data.list[0].main.temp.toString() 
                      + " F"}</h5>
      <h5 id="humidity">${"Humidity: " 
                      + data.list[0].main.humidity.toString() 
                      + "%"}</h5>
      <h5 id="wind">${"Wind Speed: " 
                      + data.list[0].wind.speed.toString() 
                      + " MPH"}</h5>`           
  );
}

function clear_bottom(){
  var the_lists = ["#fc5", "#fc4", "#fc3", "#fc2", "#fc1"];
  console.log("in clear bottom");
  for(var i=0;i<the_lists.length;i++){
      $(the_lists[i]).empty()
  }
}





for (var i=0; i < button_arr.length; i++){
  $(button_arr[i]).click(function() {
      console.log("in " + button_arr[i]);
      var data = getWeather(this.id);
      clear_bottom();
      $("#top-card-body").empty();
      console.log(data);
      change_top(data); 
      change_bottom(data)                         
  });
}


// api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&APPID=31f4dd752a3e8b29f840df4abf0996cc
$("#search-button").click(function() {
  var text_city = $("#search-box").val().trim(); // .trim();
  console.log(text_city);
  var data = getWeather(text_city);
  clear_bottom();
  $("#top-card-body").empty();
  change_top(data);
  change_bottom(data)
});