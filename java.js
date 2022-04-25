let now = new Date();
let h2 = document.querySelector("h2");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hour}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#input");
  searchedCity.value = searchedCity.value.trim();
  searchedCity.value = searchedCity.value.toLowerCase();

  let apiKey = "f4a33d71e632267b45fbefa82839ee49";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
  axios.get(weatherURL).then(showTemp);
}

function showTemp(t) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(t.data.main.temp);
  celsiusTemp = t.data.main.temp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = t.data.name;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${t.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind Speed: ${t.data.wind.speed}m/s`;
  let description = document.querySelector(".description");
  description.innerHTML = t.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${t.data.weather[0].icon}@2x.png`
  );
}

let form = document.querySelector("form");
let searchedCity = document.querySelector("#input");
form.addEventListener("submit", showCity);

function convertCity(convertedCity) {
  let cCity = convertedCity.data[0].name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cCity;
  let apiKey = "f4a33d71e632267b45fbefa82839ee49";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cCity}&appid=${apiKey}&units=metric`;
  axios.get(weatherURL).then(showTemp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f4a33d71e632267b45fbefa82839ee49";
  let convertCityURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
  axios.get(convertCityURL).then(convertCity);
}

function showTempCurrentLoc() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocButton = document.querySelector("#current-loc");
currentLocButton.addEventListener("click", showTempCurrentLoc);

let celsiusTemp = null;

function showTempC(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}

function showTempF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(fahrenheitTemp);
  let celsius = document.querySelector("#C");
  celsius.addEventListener("click", showTempC);
}

let fahrenheit = document.querySelector("#F");
fahrenheit.addEventListener("click", showTempF);

let apiKey = "f4a33d71e632267b45fbefa82839ee49";
let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;
axios.get(weatherURL).then(showTemp);
