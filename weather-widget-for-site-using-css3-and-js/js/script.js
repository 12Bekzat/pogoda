class Weather {
    constructor(temp, week, day, weatherType, windSpeed, rain) {
        this.temp = temp;
        this.week = week;
        this.day = day;
        this.weatherType = weatherType;
        this.windSpeed = windSpeed;
        this.rain = rain;
    }

    getIndexWeather() {
        if (this.rain >= 10) {
            return 3;
        }
        if (this.windSpeed >= 15) {
            return 1;
        }
        switch (this.weatherType) {
            case "Clouds":
                return 5;
                break;
            case "Snow":
                return 0;
                break;
            case "Rain":
                return 2;
                break;
            case "Clear":
                return 4;
                break;
        }
        return 6;
    }
}

const apiKey = '318d86e610dfb76c01702642e1ff63e1';

var weatherData;

var lupa = document.getElementById('lupa');
var dayOfWeek = document.getElementById('weekDay');
var day = document.getElementById('day');
var temp = document.getElementById('temp');
var currentDay = new Date();

lupa.onclick = function () {
    var city = $('#city').val();
    console.log(city);
    var apiURI2 = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log("success getWeather2");
    console.log(apiURI2);
    fetch(apiURI2).then(data => data.json()).then(render)
        .catch(function (e) {
            changeWeather(weather[6]);
        });
};

function render(data) {
    console.log(data);
    var week = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ]
    var weekDay;
    weekDay = week[currentDay.getDay()];
    weatherData = new Weather((data.main.temp - 273).toFixed(), weekDay, currentDay.getDate(), data.weather[0].main, data.wind.speed, data.weather[0].main == "Rain" ? data.rain : '');
    console.log(weatherData);
    renderData();
}

function renderData() {
    dayOfWeek.textContent = weatherData.week;
    var b = document.createElement('b');
    var p = document.createElement('span');
    b.textContent = ` ${weatherData.day}`;
    p.textContent = `e`;
    b.appendChild(p);
    dayOfWeek.appendChild(b);
    temp.textContent = `${weatherData.temp}`;
    var span = document.createElement('span');
    span.textContent = 'c';
    temp.appendChild(span);
    console.log('sec');
    changeWeather(weather[weatherData.getIndexWeather()]);
}