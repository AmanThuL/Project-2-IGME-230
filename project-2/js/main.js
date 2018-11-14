// my id: d59e0af3c6a6d2980ef0ca4da30d9d55
// api: OpenWeatherMap
let cityList;
let url;
let cityId;
let cityName;
let ifCelcius;
let ifId = 0;
const prefix = "project2-";
const historyKey = prefix + "history";

// First-time load the page data
function loadPage() {
    // url = "https://people.rit.edu/rxz2801/230/project2/";
    // getData(url, loadCityList);
    cityId = 2643743;
    cityName = "London,uk";
    ifCelcius = false;
    url = "https://api.openweathermap.org/data/2.5/weather?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, loadPageCurrentWeather);
    url = "https://api.openweathermap.org/data/2.5/forecast?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, load12HrForecast);

    // Fill the search bar with the last user's input if there is any
    let searchBar = document.querySelector("#locationInput");
    let storageData = loadArray();
    if (storageData != null) {
        searchBar.value = storageData[storageData.length - 1];
    }
}

// JSON file loading function using ajax
function getData(url, jsonLoaded) {
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonLoaded // callback function is called when data arrives
    })
}

// Load the current weather information from API
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
    currentTemp.innerHTML = (ifCelcius ? kelvinToCelcius(temp) : kelvinToFahrenheit(temp)) + "°";
    let unit = document.createElement("span");
    unit.innerHTML = ifCelcius ? "C" : "F";
    if (currentTemp.childElementCount > 0)
        currentTemp.children[0].innerHTML = unit.innerHTML;
    else
        currentTemp.appendChild(unit);

    let timeTemp = document.querySelector("#time-now");
    let span = document.createElement("span");
    span.innerHTML = ifCelcius ? (kelvinToCelcius(temp) + "°C") : (kelvinToFahrenheit(temp) + "°F");
    if (timeTemp.childElementCount > 0)
        timeTemp.children[0].innerHTML = span.innerHTML;
    else
        timeTemp.appendChild(span);
    // Set the current weather image
    let weatherId = obj.weather[0].icon;
    let weatherIcon = document.querySelector("#weatherIcon");
    weatherIcon.src = "https://openweathermap.org/img/w/" + weatherId + ".png";

    // Set the current weather text
    let weatherDescription = obj.weather[0].main;
    let currentWeather = document.querySelector("#currentWeather");
    currentWeather.innerHTML = weatherDescription;
    setWeatherImage(weatherDescription);
}

// Convert kelvin to fahrenheit
function kelvinToFahrenheit(value) {
    value = parseFloat(value);
    return Math.round((value - 273.15) * 1.8 + 32);
}

// Convert kelvin to celcius
function kelvinToCelcius(value) {
    value = parseFloat(value);
    return Math.round((value - 273.15));
}

// Factored code from the following three loadForecast functions
function loadForecast(obj, multiplier) {
    let i;
    for (i = 0; i < 5; i++) {
        let forecastData = obj.list[i * multiplier]; // Get the forecast data for each 6 hours
        let id = "#time-" + (i + 1);
        let timeTemp = document.querySelector(id);
        timeTemp.innerHTML = formatDate(forecastData.dt_txt);
        let span = document.createElement("span");
        span.innerHTML = ifCelcius ? (kelvinToCelcius(forecastData.main.temp) + "°C") :
            (kelvinToFahrenheit(forecastData.main.temp) + "°F");
        if (timeTemp.childElementCount > 0)
            timeTemp.children[0].innerHTML = span.innerHTML;
        else
            timeTemp.appendChild(span);
    }
}

// Get 12-hour forecast
function load12HrForecast(obj) {
    // console.log("obj stringified = " + JSON.stringify(obj));
    loadForecast(obj, 1);
    // debugger;
}

// Get 24-hour forecast
function load24HrForecast(obj) {
    // console.log("obj stringified = " + JSON.stringify(obj));
    loadForecast(obj, 2);
    // debugger;
}

// Get 3-day forecast
function load3DForecast(obj) {
    // console.log("obj stringified = " + JSON.stringify(obj));
    loadForecast(obj, 6);
    // debugger;
}

// Submit button onclick event: When the user enters a new location, reload the data for the entire web page
function reloadData() {
    let element = document.querySelector("#locationInput");

    // Store user's input into the local storage
    let arrayData = loadArray();
    if (arrayData != null) {
        arrayData.push(element.value);
        saveArray(arrayData);    
    }
    else {
        arrayData = [element.value];
        saveArray(arrayData);
    }

    if (isNaN(element.value)) { // If the input value does NOT contain a valid number
        cityName = element.value; // Rochester,us
        ifId = 0;
    } else {
        cityId = element.value;
        ifId = 1;
    }
    reloadTempData(ifId);
}

// Reload all the temp data displayed on the website
function reloadTempData(ifId) {
    url = "https://api.openweathermap.org/data/2.5/weather?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
    getData(url, loadPageCurrentWeather);
    let activeButtonId = document.getElementsByClassName("active")[0].id;
    switch (activeButtonId) {
        case "next12Hrs":
            url = "https://api.openweathermap.org/data/2.5/forecast?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
            getData(url, load12HrForecast);
            break;
        case "next24Hrs":
            url = "https://api.openweathermap.org/data/2.5/forecast?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
            getData(url, load24HrForecast);
            break;
        case "threeDays":
            url = "https://api.openweathermap.org/data/2.5/forecast?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
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

// When click nav bar button, change the data
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
                url = "https://api.openweathermap.org/data/2.5/forecast?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
                getData(url, load12HrForecast);
                break;
            case "next24Hrs":
                url = "https://api.openweathermap.org/data/2.5/forecast?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
                getData(url, load24HrForecast);
                break;
            case "threeDays":
                url = "https://api.openweathermap.org/data/2.5/forecast?" + (ifId ? ("id=" + cityId) : ("q=" + cityName)) + "&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";
                getData(url, load3DForecast);
                break;
        }
    }
}

// Slider onclick function
function tempUnitConverter() {
    ifCelcius = !ifCelcius;
    reloadTempData(ifId);
}

// Change the background image according to the current weather condition
function setWeatherImage(weatherDescription) {
    let url = "url(images/";
    switch (weatherDescription) {
        case "Thunderstorm":
            url += "thunderstorm.jpg";
            break;
        case "Drizzle":
            url += "drizzle.jpg";
            break;
        case "Rain":
            url += "rain.jpg";
            break;
        case "Snow":
            url += "snow.png";
            break;
        case "Atmosphere":
            url += "fog.jpg";
            break;
        case "Clear":
            url += "clear.jpg";
            break;
        case "Clouds":
            url += "clouds.png";
            break;
        default:
            url += "fog.jpg";
            break;
    }
    document.querySelector(".city").style.backgroundImage = url;
}

// Web Storage functions
// Save the array into local storage
function saveArray(arrayData) {
    localStorage.setItem(historyKey, JSON.stringify(arrayData));
}

// Retrieve the array from local storage
function loadArray() {
    let retrievedData = localStorage.getItem(historyKey);
    return JSON.parse(retrievedData);
}