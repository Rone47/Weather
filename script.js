// state
let currCity = 'London';
let units = 'metric';
const apiKey = 'eb8611792efd21713a7b1cfe120deb75';

// selectors
let city = document.querySelector('.weather__city');
let datetime = document.querySelector('.weather__datetime');
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector('.weather__temperature');
let weather__icon = document.querySelector('.weather__icon');
let weather__minmax = document.querySelector('.weather__minmax');
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

// search
document.querySelector('.weather__search').addEventListener('submit', e => {
    let search = document.querySelector('.weather__searchform');
    e.preventDefault();
    currCity = search.value;
    getWeather();
    search.value = '';
});


function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${apiKey}&units=${units}`)
        .then(res => res.json())
        .then(data => {
            city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`
            weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
            weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
            weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()} &#176 </p> <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
            weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
            weather__humidity.innerHTML = `${data.main.humidity}%`
            weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mhp" : "m/s"}`
            weather__pressure.innerHTML = `${data.main.pressure} hPa`
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

document.addEventListener('DOMContentLoaded', getWeather);

