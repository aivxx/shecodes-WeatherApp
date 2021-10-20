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
  "Sunday",
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
  //let weathericon = document.querySelector(".currentEmoji");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  skyType.innerHTML = response.data.weather[0].description;
  feelsLIke.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  //weathericon.innerHTML = response.data.weather.icon;
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
