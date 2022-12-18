let thisDay = document.querySelector(".day");
let thisDate = document.querySelector(".date");

let date = new Date();
let day = date.getDate();
let thisMonth = date.getMonth();
let year = date.getFullYear();
let dayOfWeek = date.getUTCDay();
switch (dayOfWeek) {
    case 0:
        thisDay.textContent = "Sunday";
        break;
    case 1:
        thisDay.textContent = "Monday"
        break;

    case 2:
        thisDay.textContent = "Tuseday"
        break;

    case 3:
        thisDay.textContent = "Wednesday"
        break;

    case 4:
        thisDay.textContent = "Thurseday"
        break;

    case 5:
        thisDay.textContent = "Friday"
        break;

    case 6:
        thisDay.textContent = "Saturday";
        break;

};

thisDate.textContent = day + "." + (thisMonth + 1) + "." + year;

// switch(thisMonth) //background img change

let currentCity = document.querySelector(".location p");
let degrees = document.querySelector(".degrees");
let currentWeather = document.querySelector(".weather");
let weatherIcon = document.querySelector(".weather-icon");

let feelsLike = document.querySelector(".onee");
let humidity = document.querySelector(".twoo");
let wind = document.querySelector(".threee");
let lat;
let lon;

let ctyName = "Kyiv";

let form = document.forms[0];

form.btn.addEventListener("click", function(){
    ctyName = form.enter.value;
    city(ctyName);
})
function city(e){
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + `${ctyName}` + "&appid=75e8a972695b454279faf26b7898bfe6"
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        lat = response.coord.lat;
        lon = response.coord.lon;
        currentCity.innerHTML = response.name;
        degrees.innerHTML = Math.round(response.main.temp - 273) + "&#176";
        currentWeather.innerHTML = response.weather[0].description;
        weatherIcon.innerHTML = '<img src ="http://openweathermap.org/img/wn/' + response.weather[0]['icon'] + '@2x.png" alt ="icon"/>';
        humidity.textContent = response.main.humidity + "%";
        wind.innerHTML = Math.round(response.wind.speed * 28) + " km/h";
        feelsLike.innerHTML = Math.round(response.main.feels_like - 273) + " &#176";
    })
    // // let secondUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat= "+`${lat}` + "&lon="+`${lon}` + "&appid=75e8a972695b454279faf26b7898bfe6&cnt=3"
    // let secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` + "&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=75e8a972695b454279faf26b7898bfe6"
    // fetch(secondUrl)
    // .then(response => response.json())

}
city();
