const submitButton = document.querySelector('.my-form>button')
const currentWeatherImage = document.querySelector('#current-weather-icon');
const currentTempSpan = document.querySelector('span#temp');
const currentConditionSpan = document.querySelector('span#cond');
const headerCity = document.querySelector('h2#city');
const myForm = document.querySelector('form#my-form');

let tempC;
let humidity;
let condition;
let isDay;
let key = '930b169e4b67423d99d181729231903';
let city = '';



myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputCity = e.target[0].value;
    myForm.reset();
    fetchByCity(inputCity);
})

function fetchByCity(inputCity) {
    let url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${inputCity}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            tempC = data.current.temp_c;
            humidity = data.current.humidity;
            condition = data.current.condition.text;
            isDay = data.current.is_day;
            let imgurl = data.current.condition.icon.slice(2);
            //TODO: ICONS
            refreshCurrentWeather(tempC, humidity, condition, isDay);
        });
}

function refreshCurrentWeather(tempC, humidity, condition, isDay) {
    currentTempSpan.textContent = tempC;
    currentConditionSpan.textContent = condition;
    //TODO: handle humidity and isday
}

// my-form submit -> fetchbycity -> refreshCurrentWeather
// fetchByCity();
// https://icons8.com/icon/15352/sun