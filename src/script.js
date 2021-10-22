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

//Temp

function showTemperature(response) {
  let currentTemp = document.querySelector(".dayTemp");
  let humidity = document.querySelector(".humidPercent");
  let skyType = document.querySelector(".sky");
  let feelsLIke = document.querySelector(".feelsType");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;

  fahrenheitTemperature = response.data.main.temp;

  showForecast();

  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  skyType.innerHTML = response.data.weather[0].description;
  feelsLIke.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//Search City and input temp

function searchCity(event) {
  event.preventDefault();

  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let units = "imperial";
  let SearchInput = document.querySelector("#searchCity");
  let cityNew = document.querySelector(".city");
  cityNew.innerHTML = `${SearchInput.value}`;
  let apicityURL = `https://api.openweathermap.org/data/2.5/weather?q=${SearchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apicityURL).then(showTemperature);
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

//Forecast
function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row week-days" >`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
        <div class="col days">
          <div class="week-day">${day}</div>
          <img 
          src = "http://openweathermap.org/img/wn/10d@2x.png"
          alt = ""
          width = "42"
          />
          <br />
          <span class="maxtemp">13° /</span>
          <span class="mintemp">8°</span>
        </div>
       `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

showForecast();
