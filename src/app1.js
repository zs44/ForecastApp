function formatDate(timeStamp) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

  let date = new Date(timeStamp);
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minute}`;
}
function displayTemp(response) {
  let cityElm = document.querySelector("#city");
  cityElm.innerHTML = `${response.data.name} Province`;
  let tempElm = document.querySelector("#temp");
  tempElm.innerHTML = Math.round(response.data.main.temp);
  let descriptionElm = document.querySelector("#description");
  descriptionElm.innerHTML = response.data.weather[0].description;
  let humidityElm = document.querySelector("#Humidity");
  humidityElm.innerHTML = response.data.main.humidity;
  let windElm = document.querySelector("#Wind");
  windElm.innerHTML = response.data.wind.speed;
  let dateElm = document.querySelector("#date");
  dateElm.innerHTML = formatDate(response.data.dt * 1000);
  let iconElm = document.querySelector("#icon");
  iconElm.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElm.setAttribute("alt", response.data.weather[0].description);
  celsiusTemprature = Math.round(response.data.main.temp);
}
function search(city) {
  let apiKey = "dc913128ccaa43cdc1ca63d7d482beef";
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);

}
function handleSubmit(event) {
  event.preventDefault();
  cityinputElm = document.querySelector("#city-input");

  search(cityinputElm.value);
}
function displayFahrenheit(event) {
  event.preventDefault();
  celsiusElm.classList.remove("active");
  fahrenheitElm.classList.add("active");
  let tempElm = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemprature * 9) / 5 + 32;
  tempElm.innerHTML = fahrenheitTemp;
}
function displayCelsius(event) {
  event.preventDefault();

  celsiusElm.classList.add("active");
 fahrenheitElm.classList.remove("active");
  let tempElm2 = document.querySelector("#temp");
  tempElm2.innerHTML = Math.round(celsiusTemprature);
}
celsiusTemprature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitElm = document.querySelector("#fahrenheit");
fahrenheitElm.addEventListener("click", displayFahrenheit);

let celsiusElm = document.querySelector("#cel");
celsiusElm.addEventListener("click", displayCelsius);
search("Tehran");
