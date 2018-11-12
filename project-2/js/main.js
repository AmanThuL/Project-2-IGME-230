let cityList;

function getData(){

    let url = "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=d59e0af3c6a6d2980ef0ca4da30d9d55";

    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonLoaded // callback function is called when data arrives
    })
}
// my id: d59e0af3c6a6d2980ef0ca4da30d9d55
// api: OpenWeatherMap

function jsonLoaded(obj) {
    // console.log("obj = " + obj);
    console.log("obj stringified = " + JSON.stringify(obj));
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
}

function loadCityList(obj) {

}

function kelvinToFahrenheit(value) {
    value = parseFloat(value);
    return ((value - 273.15) * 1.8 + 32).toPrecision(2);
}

function kelvinToCelcius(value) {
    value = parseFloat(value);
    return (value - 273.15).toPrecision(2);
}