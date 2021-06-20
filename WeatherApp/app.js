"use strict";

searchButton.addEventListener('click', searchWeather);
function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        return alert('Please enter a City name');
    }
    var http = new XMLHttpRequest();
    var apiKey = 'c8f946d44410c902a11cf99348bb1c15';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';
    http.open(method, url);
    http.onreadystatechange = function () {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData)
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong');
        }
    };
    http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherTemperature.textContent = weatherData.temperature;
    weatherDescription.textContent = weatherData.description;
    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}
