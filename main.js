//Сегодняшняя дата
let thisDay = document.querySelector(".day");
let thisDate = document.querySelector(".date");

let date = new Date();
let day = date.getDate();
let thisMonth = date.getMonth();
let year = date.getFullYear();
let dayOfWeek = date.getUTCDay();

thisDate.textContent = day + "." + (thisMonth + 1) + "." + year;
//Прогноз на след. дни
let nextIcon = document.querySelector(".this-day-icon");
let nextDay = document.querySelector(".this-day-day");
let nextDegrees = document.querySelector(".this-day-degrees");

let secondIcon = document.querySelector(".next-day-icon");
let secondDay = document.querySelector(".next-day-day");
let secondDegrees = document.querySelector(".next-day-degrees");

let thirdIcon = document.querySelector(".third-day-icon");
let thirdDay = document.querySelector(".third-day-day");
let thirdDegrees = document.querySelector(".third-day-degrees");

let fourthIcon = document.querySelector(".fourth-day-icon");
let fourthDay = document.querySelector(".fourth-day-day");
let fourthDegrees = document.querySelector(".fourth-day-degrees");

//Отображение даты словами
switch (dayOfWeek) {
    case 0:
        thisDay.textContent = "Sunday";
        nextDay.textContent = "MON"
        secondDay.textContent = "TUE"
        thirdDay.textContent = "WED"
        fourthDay.textContent = "THUR"
        break;
    case 1:
        thisDay.textContent = "Monday"
        nextDay.textContent = "TUE"
        secondDay.textContent = "WED"
        thirdDay.textContent = "THUR"
        fourthDay.textContent = "FRI"
        break;

    case 2:
        thisDay.textContent = "Tuseday";
        nextDay.textContent = "WED"
        secondDay.textContent = "THUR"
        thirdDay.textContent = "FRI"
        fourthDay.textContent = "SAT"
        break;

    case 3:
        thisDay.textContent = "Wednesday"
        nextDay.textContent = "THUR"
        secondDay.textContent = "FRI"
        thirdDay.textContent = "SAT"
        fourthDay.textContent = "SUN"
        break;

    case 4:
        thisDay.textContent = "Thurseday"
        nextDay.textContent = "FRI"
        secondDay.textContent = "SAT"
        thirdDay.textContent = "SUN"
        fourthDay.textContent = "MON"
        break;

    case 5:
        thisDay.textContent = "Friday"
        nextDay.textContent = "SAT"
        secondDay.textContent = "SUN"
        thirdDay.textContent = "MON"
        fourthDay.textContent = "TUE"
        break;

    case 6:
        thisDay.textContent = "Saturday";
        nextDay.textContent = "SUN"
        secondDay.textContent = "MON"
        thirdDay.textContent = "TUE"
        fourthDay.textContent = "WED"
        break;

};

//отображение сегодняшней погоды
let currentCity = document.querySelector(".location p");
let degrees = document.querySelector(".degrees");
let currentWeather = document.querySelector(".weather");
let weatherIcon = document.querySelector(".weather-icon");

// Отображение детального прогноза на сегодня
let feelsLike = document.querySelector(".onee");
let humidity = document.querySelector(".twoo");
let wind = document.querySelector(".threee");

// Координаты города и  Имя
let lat = 50.4333;
let lon = 30.5167;
let ctyName = "Kyiv";

// Обработчики на кнопку "GO" и "Enter"
let form = document.forms[0];

form.enter.addEventListener("keypress", function(e){
    if (e.key === 'Enter'){
        ctyName = form.enter.value;
        city(ctyName); 
        form.enter.value = "";
    }
});
form.btn.addEventListener("click", function () {
    ctyName = form.enter.value;
    city(ctyName);
});

// Получение погоды от сервера
function city(e) {
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
        });
    let url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=343d33d71141f1623d91c8c8aab91982&units=metric`;
    fetch(url1)
        .then(response =>
            response.json()
        )
        .then(data => {
            nextIcon.innerHTML = '<img src ="http://openweathermap.org/img/wn/' + data.daily[1].weather[0]['icon'] + '@2x.png" alt ="icon"/>'
            nextDegrees.innerHTML = Math.round(data.daily[1].temp.day) + "&#176";

            secondIcon.innerHTML = '<img src ="http://openweathermap.org/img/wn/' + data.daily[2].weather[0]['icon'] + '@2x.png" alt ="icon"/>'
            secondDegrees.innerHTML = Math.round(data.daily[2].temp.day) + "&#176";

            thirdIcon.innerHTML = '<img src ="http://openweathermap.org/img/wn/' + data.daily[3].weather[0]['icon'] + '@2x.png" alt ="icon"/>'
            thirdDegrees.innerHTML = Math.round(data.daily[3].temp.day) + "&#176";

            fourthIcon.innerHTML = '<img src ="http://openweathermap.org/img/wn/' + data.daily[4].weather[0]['icon'] + '@2x.png" alt ="icon"/>'
            fourthDegrees.innerHTML = Math.round(data.daily[4].temp.day) + "&#176";
        }
        )
}
city();
