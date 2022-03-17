const humidityEL = document.querySelector("#humidity");
const windEL = document.querySelector("#wind-number");
const degEL = document.querySelector("#degree-number");
const timeEL = document.querySelector("#time");
const dateEL = document.querySelector("#date");
const weatherEL = document.querySelector("#weather");
const cityEl = document.querySelector("#city");
const mainWeatherIcon = document.querySelector("#weather-icon");



function updateTime(){
    let currentDate = new Date()
    timeEL.innerHTML = currentDate.toLocaleTimeString();
    dateEL.innerHTML = currentDate.toLocaleDateString();
  }
setInterval(updateTime, 1000);

updateTime();

let currentPosition = "";


function updateTime(){
    let currentDate = new Date()
    timeEL.innerHTML = currentDate.toLocaleTimeString();
    dateEL.innerHTML = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
  }
setInterval(updateTime, 1000);

updateTime();

// the weather api gives temperature in kelvin, so this function converts it to celsius.
function kelvinToCelsius(kelvin){
  return `${parseInt(kelvin) - 273.15}`.substring(0,4);
}

async function fetchWeather(position){
  console.log(position)
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=85c51365e558cf78b53564970a6199ef`);
  let data = await response.json();
  humidityEL.textContent = data.main.humidity + "%";
  windEL.textContent = data.wind.speed + " m/s";
  cityEl.textContent = data.name;
  degEL.textContent = kelvinToCelsius(data.main.temp) + "°C";
  weatherEL.textContent = data.weather[0].description;
  changeIcon(data.weather[0].main);
  console.log(data  )
}

navigator.geolocation.getCurrentPosition(position =>{
  currentPosition = position;
  fetchWeather(currentPosition);
});

function changeIcon(weather){
  switch(weather){
    case "mist":
      mainWeatherIcon.src = "assets/img/icons/mist-icon.svg";
      break;
    case "Clear":
      mainWeatherIcon.src = "assets/img/icons/sun-icon.svg";
      break;
    case "Clouds":
      mainWeatherIcon.src = "assets/img/icons/clouds-icon.svg";
      break;    
    case "Drizzle":
    case "Rain":
      mainWeatherIcon.src = "assets/img/icons/rain-icon.svg";
      break;
    case "Thunderstorm":
      mainWeatherIcon.src = "assets/img/icons/thunder-icon.svg";
      break;
    case "Snow":
      mainWeatherIcon.src = "assets/img/icons/snow-icon.svg";
      break;
    
    
  }
}