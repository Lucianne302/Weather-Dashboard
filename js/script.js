var recentCities = "";
var testCity="Newark"; // for testing only
var weatherAPIkey = "6de092f191d98a89bbf3ab33da4e73c5";
var searchButtonEl = document.querySelector("#buttons");
var searchedButtonsEl = document.querySelector("#searched-cities")
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
//var cities="";


var getWeather = function(myCity) {
    var myWeather="https://api.openweathermap.org/data/2.5/forecast?id="+ myCity +"&APPID="+weatherAPIkey;

    console.log("weather");
    fetch(myWeather).then(function(response){
    //    console.log(response);
        if(response.ok) {
            response.json().then(function(data){
                //display weather
               // console.log(data);
               // console.log(data.list);
                console.log(data.list[0].main.temp.humidity);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
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

function loadRecentCities(){ // get recent cities searched from local storage
    recentCities = JSON.parse(localStorage.getItem("recentCities"));
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!recentCities) {
        recentCities = {
            cities:[]
        };
    }

    // loop over object properties
    $.each(recentCities, function(list, arr) {
        // then loop over sub-array
        arr.forEach(function(city) {
            showRecentCity(city.cityName);
        });  
    });  
};

function showRecentCity(myCity){
  // create elements that make up a task item
    var cityLi = $("<li>").addClass("list-group-item");
    var citySpan = $("<span>")
        .addClass("btn btn-link")
        .attr("city",myCity)
        .text(myCity);
    //var cityP = $("<p>")
    //    .addClass("m-1")
    //    .text(taskText); 

  // append span and p element to parent li
  //cityLi.append(citySpan, cityP);
  cityLi.append(citySpan);

  // append to ul list on the page
  $("#searched-cities").append(cityLi);
}

var saveCities = function() {
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
};




var createCards = function (myCity){
    var myForecast="https://api.openweathermap.org/data/2.5/forecast?q="+ myCity +"&appid=" + weatherAPIkey;


    $("#myCards").html("");

    //get data from API - see loadCities
    fetch(myForecast).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);

               //display weather in top div
               var myDays = 5;
               for (var i = 0; i< myDays; i++) {
                   var cardDiv = $("<div>").addClass("col-md card cellContainer");
                   var cardBody= $("<div>").addClass("card-body");
                   var cardTitle=$("<h5>").addClass("card-title").text("MyDate");
                   var cardContent = $("<p>")
                   .addClass("card-text")
                   .text("MyWeather");
           
                   cardBody.append(cardTitle,cardContent);
                   cardDiv.append(cardBody);
                   $("#myCards").append(cardDiv);
               }
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};


var loadCities = function(myCity) {
    //var myJsonCityList="https://lucianne302.github.io/Weather-Dashboard/city.list.json";
    var myWeather="https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&units=imperial&appid=" + weatherAPIkey


    var checkCities = recentCities.cities.some(city => city.cityName === myCity);
    if (!checkCities){
        recentCities.cities.push({
            cityName:myCity
        });
    
        // update task in array and re-save to localstorage
        saveCities(); 
        showRecentCity(myCity);   
    }

    $("#myCity").html("");

    fetch(myWeather).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);

               //display weather in top div ***
               var myIcon="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
               var myTemp=data.main.temp;
               var myHumidity=data.main.humidity;
               var myWind=data.wind.speed;
               var myUV=""; //data.main.UV
               var myDate = moment().format("MM/DD/YYYY");

               var cityBody= $("<div>").addClass("card-body");
               var cityTitle=$("<h5 id='myImg'>").addClass("card-title").text(myCity.toUpperCase()+" - "+ myDate);
               var cityTemp = $("<p>").addClass("card-text").text("Temperature: "+Math.round(myTemp)+" ℉");
               var cityHumidity = $("<p>").addClass("card-text").text("Humidity: "+myHumidity+"%");
               var cityWind= $("<p>").addClass("card-text").text("Windspeed: "+myWind+" mph");
               var cityUV= $("<p>").addClass("card-text").text("UV: "+myUV);

               var imgContent= $('<img src="'+myIcon+'"/>');

               cityTitle.append(imgContent);
               cityBody.append(cityTitle,cityTemp,cityHumidity,cityWind,cityUV);
               $("#myCity").append(cityBody);


               console.log(data.main);
               console.log(data.weather[0].description);
               console.log(data.weather[0].icon);
               console.log(data.weather[0].main);
               console.log(data.wind.speed);

                //create function to search cities
                // searchCities(data, myCity); // Not used 
                createCards(myCity);
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
    console.log(cityName); //log city name
    if (cityName) {
        loadCities(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
}

var buttonClickHandler = function(event) {
    var cityName = event.target.getAttribute("city");

    if(cityName) {
        loadCities(cityName);
        cityInputEl.value = "";
        //getFeaturedRepos(language);

        //clear old content
        //repoContainerEl.textContent = "";
    }
}

loadRecentCities(); // load the recent cities searched
//loadCities(testCity); // replace with event listener & testCity with the searched city & save the searched term to local memory

searchedButtonsEl.addEventListener("click", buttonClickHandler); // recently searched
cityFormEl.addEventListener("submit", formSubmitHandler); 

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