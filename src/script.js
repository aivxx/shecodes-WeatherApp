//Time and Day
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

let currentTime = document.querySelector(".currentTime");
let currentDay = document.querySelector(".currentDay");
currentTime.innerHTML = now.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
currentDay.innerHTML = `${day}`;

//Forecast
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecastDaily = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row week-days" >`;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        ` 
        <div class="col days">
          <div class="week-day">${formatDay(forecastDay.dt)}</div>
          <img 
          src = "http://openweathermap.org/img/wn//${
            forecastDay.weather[0].icon
          }@2x.png"
          alt = ""
          width = "42"
          />
          <div class = "forecast-temps">
          <span class="maxtemp">${Math.round(forecastDay.temp.max)}° /</span>
          <span class="mintemp">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
       `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(showForecast);
}

//Temp

function showTemperature(response) {
  let currentTemp = document.querySelector(".dayTemp");
  let humidity = document.querySelector(".humidPercent");
  let skyType = document.querySelector(".sky");
  let feelsLIke = document.querySelector(".feelsType");
  let windSpeed = document.querySelector(".windSpeed");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;

  fahrenheitTemperature = response.data.main.temp;

  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  skyType.innerHTML = response.data.weather[0].description;
  feelsLIke.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} m/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//Search City and input temp

function search(city) {
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let units = "imperial";
  let apicityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apicityURL).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();

  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let units = "imperial";
  let SearchInput = document.querySelector("#searchCity");
  let cityNew = document.querySelector(".city");
  cityNew.innerHTML = `${SearchInput.value}`;
  let apicityURL = `https://api.openweathermap.org/data/2.5/weather?q=${SearchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apicityURL).then(showTemperature);
  axios.get(apicityURL).then(showForecast);
}

let submitCity = document.querySelector("#search-city");
submitCity.addEventListener("submit", searchCity);

//Get current location button

function showLocation(response) {
  let showCity = document.querySelector(".city");
  showCity.innerHTML = response.data.name;
}

function currentLocation(position) {
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiWeatherURL).then(showLocation);
  axios.get(apiWeatherURL).then(showTemperature);
  axios.get(apiWeatherURL).then(showForecast);
}

function getCurrentLoction(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationButton = document.querySelector(".location");
currentLocationButton.addEventListener("click", getCurrentLoction);

//F to C
function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".dayTemp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".dayTemp");
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let celsiusTemp = ((fahrenheitTemperature - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitTemperature = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

search("Miami");
