function inputDate() {
  let now = new Date();
  let hour = now.getHours();
  console.log(hour);

  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
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
  let day = days[now.getDay()];
  let currentDate = `${day}, ${hour}:${minutes}`;
  let currentDateTime = document.querySelector("#current-date-time");
  currentDateTime.innerHTML = `${currentDate}`;
}
inputDate();

//Find temperature
function displayTemp(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let tempDisplay = document.querySelector("#degree");
  tempDisplay.innerHTML = ` ${temp}°C`;
  let displaySearch = document.querySelector("#new-location");
  displaySearch.innerHTML = response.data.name;
}
// Search for city
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let displaySearch = document.querySelector("#new-location");
  displaySearch.innerHTML = `${cityInput.value}`;
  let apiKey = "f4f7afef9c2df741d794fbe9111a24ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", citySearch);

//Find current location
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "f4f7afef9c2df741d794fbe9111a24ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
let currentPosition = document.querySelector("#current-city-button");
currentPosition.addEventListener("click", getCurrentPosition);

function toCelsius(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  degree.innerHTML = "19°C";
}
let celsiusChange = document.querySelector("#celsius-check");
celsiusChange.addEventListener("click", toCelsius);

function toFahr(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  degree.innerHTML = "66°F";
}
let fahrChange = document.querySelector("#fahr-check");
fahrChange.addEventListener("click", toFahr);
