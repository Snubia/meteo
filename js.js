$(document).ready(function() {
    $("#search-button").on("click", function() {
        var searchValue = $("#search-value").val()

        $("#search-value").val("");

        sarchWeather(searchValue);
    });

$(".history").on("click", "li", function() {
    sarchWeather($(this).text());
});

function makeRow(text) {
var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
$(".history").append(li);

}
function sarchWeather(searchValue) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=75e4c04d71684c3371de593b3bd53988&units=imperial",
        datatype: "json",
        success: function(data) {
            if (history.indexOf(searchValue) === -1) {
                history.push(searchValue);
                window.localStorage.setItem("history", JSON.stringify(history));
                
                makeRow(searchValue);
            }
            $("#today").empty();
            
            var title = $("<h3>").addClass("card-title").text(data.name + "(" + new Date().toLocaleDateString() + ")");
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "F");
            var cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + " .png");

            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);

            getForecast(searchValue);
            getUVIndex(data.coord.lat, data.coord.lon);

        }
    });
}

       function getForecast(searchValue) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=75e4c04d71684c3371de593b3bd53988&units=imperial",
            datatype: "json",
            success: function(data) {
         $("#forecast").html("<h4 class\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

         for (var i = 0; i < data.list.length; i++) {
             if (data.list[i].dt_text.indexOf("15:00:00") !== -1) {
                 var col = $("<div>").addClass("col-md-2");
                 var card = $("<div>").addClass("car bg-primary text-white");
                 var body = $("<div>").addClass("card-body p-2");

                 var title = $("<div>").addClass("card-title").text(new Date (data.list[i].dt_txt).toLocaleDateString());
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp.max + " F");
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

                col.append(card.append(body.append(title, img, p1, p2)));
                $("#forecast .row").append(col);
             }
             
         }
       }
    
    });
}

function getUVIndex(lat, lon) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?q=appid=75e4c04d71684c3371de593b3bd53988&lat=imperial" +lat +"&lon" +lon,
        datatype: "json",
        success: function(data) {
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(data.value);

        if(data.value < 3) {
            btn.addClass("btn-success");
        }
        else if (data.value < 7) {
            btn.addClass("btn-warning");
        }
        else {
           btn.addClass("btn-danger");
        }
        $("$today .card-body").append(uv.append(btn));
        }
});
}

var history = JSON.parse(window.localStorage.getItem("history")) || [];

if (history.length > 0) {
    sarchWeather(history[history.length -1]);
}
for (var i = 0; i < history.length; i++) {
   makeRow(history[i]);
    
}
});