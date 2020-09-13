var recentCities = ""; //recent cities variable
var weatherAPIkey = "6de092f191d98a89bbf3ab33da4e73c5"; // my API key
var searchButtonEl = document.querySelector("#buttons"); // search button
var searchedButtonsEl = document.querySelector("#searched-cities"); // history city hyperlink
var cityFormEl = document.querySelector("#city-form"); 
var cityInputEl = document.querySelector("#city");

/* may use for a future project to read json from file
var getWeather = function(myCity) { //not used
    var myWeather="https://api.openweathermap.org/data/2.5/forecast?id="+ myCity +"&APPID="+weatherAPIkey;

    console.log("weather");
    fetch(myWeather).then(function(response){
    //    console.log(response);
        if(response.ok) {
            response.json().then(function(data){

                console.log(data.list[0].main.temp.humidity);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

var searchCities = function(cities, searchTerm) { //not used
    // check if api returned any cities
    if (cities.length === 0) {
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
*/

function loadRecentCities(){ // get recent cities searched from local storage
    recentCities = JSON.parse(localStorage.getItem("recentCities"));
    // if nothing in localStorage, create a new object to track cities arrays
    if (!recentCities) {
        recentCities = {
            cities:[]
        };
    }

    // loop over object properties
    $.each(recentCities, function(list, arr) {
        // then loop over sub-array
        arr.forEach(function(city) { // prints recent cities
            showRecentCity(city.cityName); 
        });  
    });  
};

function showRecentCity(myCity){ //prints a recent city
  // create elements that make up a task item
    var cityLi = $("<li>").addClass("list-group-item");
    var citySpan = $("<span>")
        .addClass("btn btn-link")
        .attr("city",myCity)
        .text(myCity);

  cityLi.append(citySpan);

  // append to li list on the page
  $("#searched-cities").append(cityLi);
}

var saveCities = function() { //saves cities to local storage
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
};

var createCards = function (myCity){ //creates 5 day forecast cards
    var myForecast="https://api.openweathermap.org/data/2.5/forecast?q="+ myCity +"&units=imperial&appid=" + weatherAPIkey;

    $("#myCards").html("");

    //get data from API - see loadCities
    fetch(myForecast).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);

               //display weather in top div
               var myDays = 5*8; //multiplies days by 8 to accommodate for results from API which gives weather for every 3 hours of the day

               for (var i = 0; i< myDays; i=i+8) { //loops over the results of myForecast looking at every 8th result
                    var myDay=data.list[i].dt_txt; //prints date
                    var myIcon="http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";// icon url
                    var myTemp=Math.round(data.list[i].main.temp); //rounds the temperature
                    var myHumidity=data.list[i].main.humidity; // prints humidity
     
                    var cardDiv = $("<div>").addClass("col-md card cellContainer");
                    var cardBody= $("<div>").addClass("card-body");
                    var cardTitle=$("<h5>").addClass("card-title").text(moment(myDay).format("MM/DD/YYYY")); //formats date
                    var iconForecast =$('<img src="'+myIcon+'"/>'); //creates image tag
                    var tempForecast = $("<p>").addClass("card-text").text("Temperature: "+Math.round(myTemp)+" ℉");
                    var humidityForecast = $("<p>").addClass("card-text").text("Humidity: "+myHumidity+"%");
            
                    cardBody.append(cardTitle,iconForecast,tempForecast,humidityForecast);
                    cardDiv.append(cardBody);
                    $("#myCards").append(cardDiv); // prints cards
                }
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

   
var loadCities = function(myCity) { //gets weather for a city
    var myWeather="https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&units=imperial&appid=" + weatherAPIkey; //gets weather for a city 


    var checkCities = recentCities.cities.some(city => city.cityName === myCity); //checks to see if city exist in cities array
    if (!checkCities){ //if city does not exist
        recentCities.cities.push({ //adds city to cities array
            cityName:myCity
        });
    
        // update task in array and re-save to localstorage
        saveCities(); // saves cities array to local storage
        showRecentCity(myCity);   //prints city to recent list
    }

    $("#myCity").html(""); //clears last searched city weather

    fetch(myWeather).then(function(response){ //gets weather for current city
        if(response.ok) { //if data exists
            response.json().then(function(data){ //saves JSON to data
                console.log(data);

               //display weather in top div ***
               var myIcon="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png"; //icon URL
               var myTemp=data.main.temp; //temperature
               var myHumidity=data.main.humidity; //humidity
               var myWind=data.wind.speed; //windspeed
               var myDate = moment().format("MM/DD/YYYY"); //gets current date & formats it

               //UV API url & parameters
               var myUVurl="http://api.openweathermap.org/data/2.5/uvi?appid=" + weatherAPIkey + "&lat=" + data.coord.lat+ "&lon=" + data.coord.lon;

               //creates card content for current day forecast
               var cityBody= $("<div>").addClass("card-body");
               var cityTitle=$("<h5 id='myImg'>").addClass("card-title").text(myCity.toUpperCase()+" - "+ myDate);
               var cityTemp = $("<p>").addClass("card-text").text("Temperature: "+Math.round(myTemp)+" ℉");
               var cityHumidity = $("<p>").addClass("card-text").text("Humidity: "+myHumidity+"%");
               var cityWind= $("<p>").addClass("card-text").text("Windspeed: "+myWind+" mph");
               var cityUV= $("<p>").addClass("card-text").text("UV: ");
               var cityUVspan= $("<span>").attr("id","uv").text(""); //place holder for UV value

               var imgContent= $('<img src="'+myIcon+'"/>'); //image tag

               cityTitle.append(imgContent);
               cityUV.append(cityUVspan);
               cityBody.append(cityTitle,cityTemp,cityHumidity,cityWind,cityUV);               
               $("#myCity").append(cityBody);

               // from : https://stackoverflow.com/questions/38869197/fetch-set-variable-with-fetch-response-and-return-from-function
               //gets UV index values and sets colors
               (async () => {
                const response = await fetch(myUVurl)
                const data = await response.json()
                document.getElementById("uv").innerHTML=data.value;
                if (data.value < 3) {
                    document.getElementById("uv").style["background-color"] = "green";
                } else if (data.value >= 3 && data.value < 8) {
                    document.getElementById("uv").style["background-color"] = "yellow";
                } else if (data.value >= 8) {     
                    document.getElementById("uv").style["background-color"] = "red";
                }
                })()

                createCards(myCity); //creates 5 day forecast
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

var formSubmitHandler = function(event) { //search button eventHandler
    event.preventDefault(); //prevents default settings from event
    
    // get value from input element
    var cityName = cityInputEl.value.trim();
    console.log(cityName); //log city name
    if (cityName) {
        loadCities(cityName); // gets weather for event
        cityInputEl.value = ""; //clears search text 
    } else {
        alert("Please enter a city");
    }
}

var buttonClickHandler = function(event) { //  recently searched event handler
    var cityName = event.target.getAttribute("city");

    if(cityName) {
        loadCities(cityName); // gets weather for event
        cityInputEl.value = ""; //clears search text 
    }
}

loadRecentCities(); // load the recent cities searched

searchedButtonsEl.addEventListener("click", buttonClickHandler); // recently searched
cityFormEl.addEventListener("submit", formSubmitHandler); // search button listener

/* Sample JSON
  [
    {
        "id": 4143861,
        "name": "Newark",
        "state": "DE",
        "country": "US",
        "coord": {
            "lon": -75.749657,
            "lat": 39.68372
        }
    }
  ]
*/