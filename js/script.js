var recentCities = new Array;
var testCity="Intercourse"; // for testing only
var weatherAPIkey = "6de092f191d98a89bbf3ab33da4e73c5";
var searchButtonEl = document.querySelector("#buttons");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
//var cities="";


var getWeather = function(myCity,myCountry) {
//    var start = now();
//    var end = now();

//    var myWeather="http://history.openweathermap.org/data/2.5/history/city?q="+ myCity +","+ myCountry +"&type=hour&start=" + start + "&end=" + end + "&appid="+weatherAPIkey;
    var myWeather="https://api.openweathermap.org/data/2.5/forecast?id="+ myCity +"&APPID="+weatherAPIkey;

    console.log("weather");
    fetch(myWeather).then(function(response){
    //    console.log(response);
        if(response.ok) {
            response.json().then(function(data){
                //display weather
                console.log(data);
                console.log(data.list);
                console.log(data.list[0].main);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

function loadRecentCities(){ // get recent cities searched from local storage
};

var searchCities = function(cities, searchTerm) {
    // check if api returned any cities
    if (cities.length === 0) {
        //repoContainerEl.textContent = "No repositories found.";
        alert('No cities file found.')
        return;
    }

    //loop over cities
    $.each(cities, function(i, city) {
        if (city.name == searchTerm) {
            console.log("cityName:"+city.name+" cityID:"+city.id+" Country:"+city.country);
            getWeather(city.id,city.country);
            return;
        }
    });
}

var loadCities = function(myCity) {
    var myJsonCityList="https://lucianne302.github.io/Weather-Dashboard/city.list.json";

    fetch(myJsonCityList).then(function(response){
        console.log(response);
        if(response.ok) {
            response.json().then(function(data){
                //create function to search cities
                searchCities(data, myCity);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // get value from input element
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        loadCities(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

loadRecentCities(); // load the recent cities searched
//loadCities(testCity); // replace with event listener & testCity with the searched city & save the searched term to local memory

// recent search languageButtonsEl.addEventListener("click", buttonClickHandler); 
cityFormEl.addEventListener("submit", formSubmitHandler); 

/* Sample JSON
  [
    {
        "id": 5194941,
        "name": "Intercourse",
        "state": "PA",
        "country": "US",
        "coord": {
            "lon": -76.10495,
            "lat": 40.037601
        }
    }
  ]
*/

/*
var jsonCityListFile="city.list.json";
$.get(jsonCityListFile, function(response) {
//    var logfile = response;
    console.log(response);
});
*/

// load json for cities from file
//var myJsonCityList="city.list.json";
//$.get(myJsonCityList, function(response) {
//    var logfile = response;
  //  console.log(response);
//});
/*
$.getJSON(myJsonCityList, function(json) {
    console.log(json); // this will show the info it in firebug console
});
*/
//$.getJSON(myJsonCityList, function(json) {
 //   console.log(json);
  //  var items = [];
  /*
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
  
});

//cityList();

/*var searchCity = function() {
    fetch("http://history.openweathermap.org/data/2.5/history/city?id={id}&type=hour&start={start}&end={end}&appid={YOUR_API_KEY}").then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
};
searchCity();
*/

/*var searchCity = function() {
    var city = document.getElementById("city");
    */

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