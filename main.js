const currentWeatherImage = document.querySelector('#current-weather-icon');
const currentTempSpan = document.querySelector('span#temp');
const currentConditionSpan = document.querySelector('span#cond');
const headerCity = document.querySelector('h2#city');
const myForm = document.querySelector('form#my-form');
const currentHumiditySpan = document.querySelector('span#humidity')
const firstMax = document.querySelector('span#first-max');
const firstMin = document.querySelector('span#first-min');
const secondMax = document.querySelector('span#second-max');
const secondMin = document.querySelector('span#second-min');
const thirdMax = document.querySelector('span#third-max');
const thirdMin = document.querySelector('span#third-min');
const firstDayDate = document.querySelector('p#first-day-date');
const secondDayDate = document.querySelector('p#second-day-date');
const thirdDayDate = document.querySelector('p#third-day-date');

let tempC;
let humidity;
let condition;
let isDay;
let key = '930b169e4b67423d99d181729231903';

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputCity = e.target[0].value;
    myForm.reset();
    fetchCurrentByCity(inputCity);
    fetchForecast(inputCity)
})

function fetchCurrentByCity(inputCity) {
    headerCity.textContent = inputCity;
    let url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${inputCity}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            tempC = data.current.temp_c;
            humidity = data.current.humidity;
            condition = data.current.condition.text;
            isDay = data.current.is_day;
            let imgurl = data.current.condition.icon.slice(2);
            refreshCurrentWeather(tempC, humidity, condition, imgurl);
        });
}

function refreshCurrentWeather(tempC, humidity, condition, imgurl) {
    currentTempSpan.textContent = tempC;
    currentConditionSpan.textContent = condition;
    currentWeatherImage.src = "https://" + imgurl;
    currentHumiditySpan.textContent = humidity;
}

//on pageload display weather for budapest
addEventListener('load', () => {
    fetchCurrentByCity("Budapest")
    fetchForecast('Budapest')
})



//using JSON data
function fetchForecast(city) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=930b169e4b67423d99d181729231903&q=${city}&days=5`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            refreshForecast(data)
        });
}

function refreshForecast(data) {
    firstMax.textContent = data.forecast.forecastday[0].day.maxtemp_c;
    firstMin.textContent = data.forecast.forecastday[0].day.mintemp_c;
    secondMax.textContent = data.forecast.forecastday[1].day.maxtemp_c;
    secondMin.textContent = data.forecast.forecastday[1].day.mintemp_c;
    thirdMax.textContent = data.forecast.forecastday[2].day.maxtemp_c;
    thirdMin.textContent = data.forecast.forecastday[2].day.mintemp_c;
    firstDayDate.textContent = data.forecast.forecastday[0].date;
    secondDayDate.textContent = data.forecast.forecastday[1].date;
    thirdDayDate.textContent = data.forecast.forecastday[2].date;
}

//TODO: forecast tab
