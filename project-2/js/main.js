// my id: d59e0af3c6a6d2980ef0ca4da30d9d55
// api: OpenWeatherMap

let cityList;
let url;
let cityId;
let cityName;

function loadCityList(obj) {
    cityList = obj;
    console.log("obj stringified = " + JSON.stringify(obj));
}

// Load the current according to the longitude and lattitude
function loadCurrentTime() {

}

function loadPage() {
    // url = "https://people.rit.edu/rxz2801/230/project2/";
    // getData(url, loadCityList);
    cityId = 2643743;
    cityName = "London,uk";
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, loadPageCurrentWeather);
    url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, load12HrForecast);
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
    currentTemp.innerHTML = kelvinToFahrenheit(temp) + "°";
    let unit = document.createElement("span");
    unit.innerHTML = "F";
    if (currentTemp.childElementCount > 0)
        currentTemp.children[0].innerHTML = unit.innerHTML;
    else
        currentTemp.appendChild(unit);

    let timeTemp = document.querySelector("#time-now");
    let span = document.createElement("span");
    span.innerHTML = kelvinToFahrenheit(temp) + "°F";
    if (timeTemp.childElementCount > 0)
        timeTemp.children[0].innerHTML = span.innerHTML;
    else
        timeTemp.appendChild(span);
    //debugger;
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
function load12HrForecast(obj) {
    // console.log("obj stringified = " + JSON.stringify(obj));
    let i;
    for (i = 0; i < 5; i++) {
        let forecastData = obj.list[i];     // Get the forecast data for each 3 hours
        let id = "#time-" + (i + 1);
        let timeTemp = document.querySelector(id);
        timeTemp.innerHTML = formatDate(forecastData.dt_txt);
        let span = document.createElement("span");
        span.innerHTML = kelvinToFahrenheit(forecastData.main.temp) + "°F";
        if (timeTemp.childElementCount > 0)
            timeTemp.children[0].innerHTML = span.innerHTML;
        else
            timeTemp.appendChild(span);
    }
    // debugger;
}

function load24HrForecast(obj) {
    // console.log("obj stringified = " + JSON.stringify(obj));
    let i;
    for (i = 0; i < 5; i++) {
        let forecastData = obj.list[i * 2];     // Get the forecast data for each 6 hours
        let id = "#time-" + (i + 1);
        let timeTemp = document.querySelector(id);
        timeTemp.innerHTML = formatDate(forecastData.dt_txt);
        let span = document.createElement("span");
        span.innerHTML = kelvinToFahrenheit(forecastData.main.temp) + "°F";
        if (timeTemp.childElementCount > 0)
            timeTemp.children[0].innerHTML = span.innerHTML;
        else
            timeTemp.appendChild(span);
    }
    // debugger;
}

function load3DForecast(obj) {
    // console.log("obj stringified = " + JSON.stringify(obj));
    let i;
    for (i = 0; i < 5; i++) {
        let forecastData = obj.list[i * 6];     // Get the forecast data for each 18 hours
        let id = "#time-" + (i + 1);
        let timeTemp = document.querySelector(id);
        // fadeInOut(id, formatDate(forecastData.dt_txt));
        timeTemp.innerHTML = formatDate(forecastData.dt_txt);
        let span = document.createElement("span");
        span.innerHTML = kelvinToFahrenheit(forecastData.main.temp) + "°F";
        if (timeTemp.childElementCount > 0)
            timeTemp.children[0].innerHTML = span.innerHTML;
        else
            timeTemp.appendChild(span);
    }
    // debugger;
}

// Create an animation for the text to fade in or out
// function fadeInOut(originalTextId, newText) {
//     $(originalTextId).animate({
//         'opacity': 0
//     }, 400, function () {
//         $(this).html(newText).animate({ 'opacity': 1 }, 400);
//     });
// }

// When the user enters a new location, reload the data for the entire web page
function reloadData() {
    // cityId = element.value;
    let element = document.querySelector("#locationInput");
    cityName = element.value;   // Rochester,us
    debugger;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, loadPageCurrentWeather);
    let activeButtonId = document.getElementsByClassName("active")[0].id;
    switch (activeButtonId) {
        case "next12Hrs":
            url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
            getData(url, load12HrForecast);
            break;
        case "next24Hrs":
            url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
            getData(url, load24HrForecast);
            break;
        case "threeDays":
            url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
            getData(url, load3DForecast);
            break;
    }
}

// Input a date and returns a time with am/pm
function formatDate(date) {
    let d = new Date(date);
    let month = d.getMonth();
    let dateDay = d.getDate();
    let hh = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[d.getDay()];
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
    //let pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    let replacement = h + ":" + m + " " + dd;
    let output = day + " " + month + "/" + dateDay + " " + replacement;
    return output;
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
    if (active[0].id != buttonId) {
        active[0].className = active[0].className.replace(" active", "");

        // Change the previous active one to inactive and the clicked one to active
        button.className += " active";
        switch (buttonId) {
            case "next12Hrs":
                url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
                getData(url, load12HrForecast);
                break;
            case "next24Hrs":
                url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
                getData(url, load24HrForecast);
                break;
            case "threeDays":
                url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
                getData(url, load3DForecast);
                break;
        }
    }
}
