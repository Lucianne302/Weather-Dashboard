var recentCities = new Array;

/*var searchCity = function() {
    fetch("http://history.openweathermap.org/data/2.5/history/city?id={id}&type=hour&start={start}&end={end}&appid={YOUR_API_KEY}").then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
};
searchCity();
*/

var getCities = function() {
    var myJsonCityList="./city.list.json";

    fetch(myJsonCityList).then(function(response){
        console.log(response);
        if(response.ok) {
            response.json().then(function(data){
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};
getCities();

/*
// load json for cities from file
var myJsonCityList="./city.list.json";
$.getJSON(myJsonCityList, function(json) {
    console.log(json);
    var items = [];
  /*
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
  
});
*/
//cityList();


/*var searchCity = function() {
    var city = document.getElementById("city");
    var weatherAPIkey = "6de092f191d98a89bbf3ab33da4e73c5";*/

    //search city list for one entered or autocomplete based off list


    // call to weather api
    //var apiUrl = "http://history.openweathermap.org/data/2.5/history/city?id={id}&type=hour&start={start}&end={end}&appid={YOUR_API_KEY}";

    // make a request to the url
    /* fetch(apiUrl)
        .then(function(response) {
            if (response.ok){
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: " + response.statusText);
        }
    });
}; 



/* drafted future city list
var searchCity = function() { */
  // create elements that make up a task item
  /* var cityLi = $("<li>").addClass("list-group-item");
  var taskSpan = $("<span>")
    .addClass("badge badge-primary badge-pill")
    .text(taskDate);
  var taskP = $("<p>")
    .addClass("m-1")
    .text(taskText); */

  // append span and p element to parent li
  //taskLi.append(taskSpan, taskP);
  // check due date
  //auditTask(taskLi);

  // append to ul list on the page
  //$("#list-" + taskList).append(taskLi);
//};

//var loadTasks = function() {
  //tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  //if (!tasks) {
    //tasks = {
      //toDo: [],
      //inProgress: [],
      //inReview: [],
      //done: []
    //}