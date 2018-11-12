// my id: d59e0af3c6a6d2980ef0ca4da30d9d55
// api: OpenWeatherMap

let cityList;
let url;

// Load the current according to the longitude and lattitude
function loadCurrentTime() {

}

function loadPage() {
    url = "https://api.openweathermap.org/data/2.5/weather?id=2643743&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, loadPageCurrentWeather);
    url = "https://api.openweathermap.org/data/2.5/forecast?id=2643743&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, loadForecast);
}

function getData(url, jsonLoaded) {
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonLoaded // callback function is called when data arrives
    })
}

function loadPageCurrentWeather(obj) {
    // console.log("obj = " + obj);
    // console.log("obj stringified = " + JSON.stringify(obj));
    let cityName = obj.name;
    let countryName = obj.sys.country;
    let cityNameHeader = document.querySelector("#cityName");
    let countrynameHeader = document.querySelector("#countryName");
    cityNameHeader.innerHTML = cityName;
    countrynameHeader.innerHTML = countryName;

    // Set the current temp
    let temp = obj.main.temp;
    let currentTemp = document.querySelector("#currentTempLarge");
    currentTemp.innerHTML = kelvinToCelcius(temp) + "°";
    let unit = document.createElement("span");
    unit.innerHTML = "C";
    currentTemp.appendChild(unit);
    let timeTemp = document.querySelector("#time-now");
    let span = document.createElement("span");
    span.innerHTML = kelvinToCelcius(temp) + "°C";
    timeTemp.appendChild(span);

    // Set the current weather image
    let weatherId = obj.weather[0].icon;
    let weatherIcon = document.querySelector("#weatherIcon");
    weatherIcon.src = "https://openweathermap.org/img/w/" + weatherId + ".png";

    // Set the current weather text
    let weatherDescription = obj.weather[0].main;
    let currentWeather = document.querySelector("#currentWeather");
    currentWeather.innerHTML = weatherDescription;

    // debugger;
}

function loadCityList(obj) {

}

// Convert kelvin to fahrenheit
function kelvinToFahrenheit(value) {
    value = parseFloat(value);
    return ((value - 273.15) * 1.8 + 32).toPrecision(2);
}

// Convert kelvin to celcius
function kelvinToCelcius(value) {
    value = parseFloat(value);
    return (value - 273.15).toPrecision(2);
}

// Get 12-hour forecast
function loadForecast(obj) {
    console.log("obj stringified = " + JSON.stringify(obj));
    let i;
    for (i = 0; i < 5; i++) {
        let forecastData = obj.list[i];     // Get the forecast data for each 3 hours
        let id = "#time-" + (i + 1);
        let timeTemp = document.querySelector(id);
        timeTemp.innerHTML = formatDate(forecastData.dt_txt);
        let span = document.createElement("span");
        span.innerHTML = kelvinToCelcius(forecastData.main.temp) + "°C";
        timeTemp.appendChild(span);
    }
    // debugger;
}

// When the user enters a new location, reload the data for the entire web page
function reloadData(element) {
    if (event.key === 'Enter') {
        let id = element.value;
        url = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
        getData(url, loadForecast);
    }
}

// Input a date and returns a time with am/pm
function formatDate(date) {
    let d = new Date(date);
    let hh = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let dd = "AM";
    let h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    let pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    let replacement = h + ":" + m;
    replacement += " " + dd;
    return replacement;
}

// Using Google Time API
// https://easycodestuff.blogspot.com/2015/05/get-time-zone-and-utc-from-latitude-and.html
function getTimeUsingLatLng(lat, lng) {
    var times_Stamp = (Math.round((new Date().getTime()) / 1000)).toString();
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + times_Stamp,
        cache: false,
        type: "POST",
        async: false,
    }).done(function (response) {

        if (response.timeZoneId != null) {
            var Cur_Date = new Date();
            var UTC = Cur_Date.getTime() + (Cur_Date.getTimezoneOffset() * 60000);
            var Loc_Date = new Date(UTC + (1000 * response.rawOffset) + (1000 * response.dstOffset));
            return Loc_Date.toLocaleString();
        }
    });
}

// When click button, change the data
function buttonClick(button) {
    let buttonId = button.id;
    let navBar = document.querySelector("#navBar");

    // Change the button to inactive
    let active = document.getElementsByClassName("active");
    active[0].className = active[0].className.replace(" active", "");

    // Change the previous active one to inactive and the clicked one to active
    button.className += " active";

    switch (buttonId){
        case "next12Hrs": 

        break;
        case "next24Hrs": 

        break;
        case "threeDays": 

        break;
    }
}