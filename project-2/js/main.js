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
        console.log("obj = " + obj);
        console.log("obj stringified = " + JSON.stringify(obj));
}