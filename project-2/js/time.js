let mydate = new Date()

let year = mydate.getYear()
if (year < 1000)
    year += 1900

let day = mydate.getDay()

let month = mydate.getMonth()

let daym = mydate.getDate()
if (daym < 10)
    daym = "0" + daym

let dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")

let montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

// Load the eastern standard time when onLoad is called
function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    // Set background image in terms of time ( 7am to 7pm = morning )
    let url = "url(images/";
    url += (h > 7 && h < 19) ? "morning.jpg" : "night.jpg";
    document.body.style.backgroundImage = url;

    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    let txt = document.querySelector("#txt");
    if (txt != null) {
        txt.innerHTML = h + ":" + m + ":" + s;
        let t = setTimeout(startTime, 500);
    }
}

// Check if the displaying time needs an extra 0 in front
function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}

// Using Google Time API
// https://easycodestuff.blogspot.com/2015/05/get-time-zone-and-utc-from-latitude-and.html
// function getTimeUsingLatLng(lat, lng) {
//     let times_Stamp = (Math.round((new Date().getTime()) / 1000)).toString();
//     $.ajax({
//         url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + times_Stamp,
//         cache: false,
//         type: "POST",
//         async: false,
//     }).done(function (response) {

//         if (response.timeZoneId != null) {
//             let Cur_Date = new Date();
//             let UTC = Cur_Date.getTime() + (Cur_Date.getTimezoneOffset() * 60000);
//             let Loc_Date = new Date(UTC + (1000 * response.rawOffset) + (1000 * response.dstOffset));
//             return Loc_Date.toLocaleString();
//         }
//     });
// }
