$(document).ready(function() {
  $("#search-button").on("click", function() {
    var searchValue =$("#seach-value").val();

    $("#search-value").val("");  // it clears the search field
    searchWeather(searchValue);
  });
  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").$(".history").append(li);

  }
function searchWeather(searchValue) {
  $.ajax({
    type: "Get",
  url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=metric`,
  dataType: "json",
  sucess: function(data) {
    if(history.indexOf(searchValue) === -1) {
      history.push(searchValue);
      window.localStorage.setItem("history", JSON.stringify(history));
      makeRow(searchValue);
    }
    $("#today").empty();
  }
  })
}
})