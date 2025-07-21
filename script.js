const apiKey = "b3938d765c3eb8c46959ae65ffeceb6c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    alert("City not found");
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const condition = data.weather[0].main;
  const temp = data.main.temp;

  if (condition === "Clouds") {
    if (temp < 10) {
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4151/4151022.png";
    } else if (temp > 30) {
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
    } else {
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    }
  } else if (condition === "Clear") {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  } else if (condition === "Rain") {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163620.png";
  } else if (condition === "Thunderstorm") {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
  } else if (condition === "Snow") {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
  } else if (condition === "Drizzle") {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
  } else if (condition === "Mist") {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005801.png";
  } else {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"; // fallback
  }

  document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
